// MaxMind GeoIP2/GeoLite2 Web Service Client
// Uses the GeoLite2 free tier: https://geolite.info/geoip/v2.1/city

export interface GeoIPResult {
  country: string | null;
  countryCode: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
}

interface MaxMindCityResponse {
  country?: {
    names?: { en?: string };
    iso_code?: string;
  };
  subdivisions?: Array<{
    names?: { en?: string };
    iso_code?: string;
  }>;
  city?: {
    names?: { en?: string };
  };
  location?: {
    time_zone?: string;
  };
}

// Cache for IP lookups to reduce API calls
const geoCache = new Map<string, { data: GeoIPResult; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

/**
 * Lookup IP address using MaxMind GeoLite2 Web Service
 * Free tier: 1,000 lookups/day
 */
export async function lookupIP(ipAddress: string): Promise<GeoIPResult> {
  // Return empty result for private/local IPs
  if (isPrivateIP(ipAddress)) {
    return getEmptyResult();
  }

  // Check cache first
  const cached = geoCache.get(ipAddress);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const accountId = process.env.MAXMIND_ACCOUNT_ID;
  const licenseKey = process.env.MAXMIND_LICENSE_KEY;

  if (!accountId || !licenseKey) {
    console.warn('MaxMind credentials not configured');
    return getEmptyResult();
  }

  try {
    // Use GeoLite2 free endpoint
    const url = `https://geolite.info/geoip/v2.1/city/${ipAddress}`;
    const auth = Buffer.from(`${accountId}:${licenseKey}`).toString('base64');

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        // IP not found in database
        return getEmptyResult();
      }
      throw new Error(`MaxMind API error: ${response.status}`);
    }

    const data: MaxMindCityResponse = await response.json();

    const result: GeoIPResult = {
      country: data.country?.names?.en || null,
      countryCode: data.country?.iso_code || null,
      region: data.subdivisions?.[0]?.names?.en || null,
      city: data.city?.names?.en || null,
      timezone: data.location?.time_zone || null,
    };

    // Cache the result
    geoCache.set(ipAddress, { data: result, timestamp: Date.now() });

    return result;
  } catch (error) {
    console.error('MaxMind lookup failed:', error);
    return getEmptyResult();
  }
}

/**
 * Check if IP is private/local
 */
function isPrivateIP(ip: string): boolean {
  const privateRanges = [
    /^127\./,           // Loopback
    /^10\./,            // Private Class A
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // Private Class B
    /^192\.168\./,      // Private Class C
    /^::1$/,            // IPv6 loopback
    /^fc00:/,           // IPv6 private
    /^fe80:/,           // IPv6 link-local
    /^localhost$/i,     // localhost
  ];
  return privateRanges.some((range) => range.test(ip));
}

/**
 * Get empty result for unknown/private IPs
 */
function getEmptyResult(): GeoIPResult {
  return {
    country: null,
    countryCode: null,
    region: null,
    city: null,
    timezone: null,
  };
}

/**
 * Extract client IP from request headers
 * Handles various proxy configurations
 */
export function getClientIP(headers: Headers): string {
  // Try various headers in order of preference
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }

  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }

  // Fallback - this usually won't work as expected
  return '127.0.0.1';
}
