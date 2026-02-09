import { NextRequest, NextResponse } from 'next/server';

/**
 * Get allowed origins from environment variable
 */
function getAllowedOrigins(): string[] {
  const corsOrigins = process.env.CORS_ALLOWED_ORIGINS;

  if (!corsOrigins) {
    // Development fallback
    if (process.env.NODE_ENV === 'development') {
      return ['http://localhost:3000', 'http://127.0.0.1:3000'];
    }

    // Production requires explicit configuration
    console.error('CORS_ALLOWED_ORIGINS not set in production!');
    return [];
  }

  return corsOrigins.split(',').map(origin => origin.trim()).filter(Boolean);
}

/**
 * Generate CORS headers for a request
 */
export function corsHeaders(request: NextRequest): Headers {
  const origin = request.headers.get('origin');
  const allowedOrigins = getAllowedOrigins();

  const headers = new Headers();

  // Check if origin is allowed
  if (origin && allowedOrigins.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Credentials', 'true');
  }

  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With');
  headers.set('Access-Control-Max-Age', '86400'); // 24 hours

  return headers;
}

/**
 * Handle CORS preflight requests (OPTIONS)
 */
export function handleCorsPrelight(request: NextRequest): NextResponse | null {
  if (request.method === 'OPTIONS') {
    const headers = corsHeaders(request);
    return new NextResponse(null, { status: 204, headers });
  }
  return null;
}

/**
 * Add CORS headers to a response
 */
export function addCorsHeaders(response: NextResponse, request: NextRequest): NextResponse {
  const corsHeadersMap = corsHeaders(request);

  corsHeadersMap.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}
