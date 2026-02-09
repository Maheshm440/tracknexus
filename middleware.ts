import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// SECURITY FIX #6: Enhanced middleware with better cookie validation
// PERFORMANCE: Optimized to reduce blocking operations
// MFA: Email + MFA code login (no password)
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect dashboard routes - ADMIN ONLY
  if (pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('tracknexus_auth');
    const roleCookie = request.cookies.get('tracknexus_role');

    // Fast validation - check cookies immediately without extra processing
    if (!authCookie?.value?.trim()) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = roleCookie?.value?.trim();

    // Combined validation and redirect
    if (!userRole || userRole !== 'admin') {
      const redirectUrl = !userRole ? '/login' : '/access-denied';
      const targetUrl = new URL(redirectUrl, request.url);
      if (!userRole) targetUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(targetUrl);
    }

    // Create response with security headers in one go
    const response = NextResponse.next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.delete('X-Powered-By');

    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Optimize matcher to only run on necessary routes
  matcher: ['/dashboard/:path*'],
};
