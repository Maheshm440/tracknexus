// SECURITY FIX #7: Rate limiting for authentication endpoints
// Simple in-memory rate limiter (for production, use Redis-based solution)

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

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

export function rateLimit(identifier: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || entry.resetTime < now) {
    // Create new entry or reset expired one
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

  // Entry exists and is still valid
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: entry.resetTime
    };
  }

  // Increment counter
  entry.count++;

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - entry.count,
    reset: entry.resetTime
  };
}

// Get client IP address from request
export function getClientIp(request: Request): string {
  // Try to get real IP from headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback to 'unknown' if we can't determine IP
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
