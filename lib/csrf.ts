// SECURITY FIX #5: CSRF Protection
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CSRF_TOKEN_LENGTH = 32;
const CSRF_SECRET = process.env.CSRF_SECRET || process.env.JWT_SECRET || 'default-csrf-secret-change-in-production';

/**
 * Generate a CSRF token
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
}

/**
 * Create HMAC signature for CSRF token
 */
function createTokenSignature(token: string): string {
  return crypto
    .createHmac('sha256', CSRF_SECRET)
    .update(token)
    .digest('hex');
}

/**
 * Verify CSRF token signature
 */
function verifyTokenSignature(token: string, signature: string): boolean {
  const expectedSignature = createTokenSignature(token);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Set CSRF token cookie
 */
export function setCsrfCookie(response: NextResponse, token: string): void {
  const signature = createTokenSignature(token);

  response.cookies.set('csrf_token', token, {
    httpOnly: false, // Needs to be accessible to JavaScript
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  response.cookies.set('csrf_signature', signature, {
    httpOnly: true, // Signature should be httpOnly
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

/**
 * Verify CSRF token from request
 */
export function verifyCsrfToken(request: NextRequest): boolean {
  // Get token from header or body
  const headerToken = request.headers.get('x-csrf-token');
  const cookieToken = request.cookies.get('csrf_token')?.value;
  const signature = request.cookies.get('csrf_signature')?.value;

  // Token must be in header (from form/fetch) and match cookie
  if (!headerToken || !cookieToken || !signature) {
    return false;
  }

  // Verify tokens match
  if (headerToken !== cookieToken) {
    return false;
  }

  // Verify signature
  return verifyTokenSignature(headerToken, signature);
}

/**
 * Middleware to require CSRF token for state-changing methods
 */
export function requireCsrfToken(request: NextRequest): NextResponse | null {
  const method = request.method.toUpperCase();

  // Only check CSRF for state-changing methods
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
    return null; // Continue
  }

  // Skip CSRF check for auth endpoints (they use other protections)
  const pathname = request.nextUrl.pathname;
  if (pathname.includes('/api/auth/')) {
    return null;
  }

  // Verify CSRF token
  if (!verifyCsrfToken(request)) {
    return NextResponse.json(
      {
        error: 'Invalid or missing CSRF token',
        code: 'CSRF_TOKEN_INVALID'
      },
      { status: 403 }
    );
  }

  return null; // Continue
}

/**
 * Generate CSRF token endpoint response
 */
export function generateCsrfTokenResponse(): NextResponse {
  const token = generateCsrfToken();
  const response = NextResponse.json({ csrfToken: token });

  setCsrfCookie(response, token);

  return response;
}
