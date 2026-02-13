// Rate limiting for authentication and API endpoints
// Uses Upstash Redis in production, falls back to in-memory for development

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

// --- Upstash Redis rate limiter (production) ---

let redisRatelimiters: Map<string, Ratelimit> | null = null;

function getRedisAvailable(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

function getRedisRatelimiter(config: RateLimitConfig): Ratelimit {
  if (!redisRatelimiters) {
    redisRatelimiters = new Map();
  }

  const key = `${config.maxRequests}:${config.windowMs}`;
  let limiter = redisRatelimiters.get(key);

  if (!limiter) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(config.maxRequests, `${config.windowMs} ms`),
      analytics: true,
      prefix: 'tracknexus_rl',
    });

    redisRatelimiters.set(key, limiter);
  }

  return limiter;
}

// --- In-memory rate limiter (development fallback) ---

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (entry.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

function inMemoryRateLimit(identifier: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs
    });

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      reset: now + config.windowMs
    };
  }

  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: entry.resetTime
    };
  }

  entry.count++;

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    reset: entry.resetTime
  };
}

// --- Main rate limit function ---

export async function rateLimitAsync(identifier: string, config: RateLimitConfig): Promise<RateLimitResult> {
  if (getRedisAvailable()) {
    try {
      const limiter = getRedisRatelimiter(config);
      const result = await limiter.limit(identifier);
      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      };
    } catch (error) {
      console.error('Redis rate limit error, falling back to in-memory:', error);
      return inMemoryRateLimit(identifier, config);
    }
  }

  return inMemoryRateLimit(identifier, config);
}

// Synchronous wrapper for backward compatibility
export function rateLimit(identifier: string, config: RateLimitConfig): RateLimitResult {
  return inMemoryRateLimit(identifier, config);
}

// Get client IP address from request
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

// Preset rate limit configurations
export const RateLimitPresets = {
  // Auth endpoints: 5 attempts per 15 minutes
  AUTH: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000
  },
  // Signup: 3 attempts per hour
  SIGNUP: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000
  },
  // OTP sending: 3 requests per 15 minutes
  OTP_SEND: {
    maxRequests: 3,
    windowMs: 15 * 60 * 1000
  },
  // OTP verification: 5 attempts per 15 minutes
  OTP_VERIFY: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000
  },
  // API endpoints: 100 requests per 15 minutes
  API: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000
  },
  // Tracking endpoints: 1000 requests per 15 minutes
  TRACKING: {
    maxRequests: 1000,
    windowMs: 15 * 60 * 1000
  }
};
