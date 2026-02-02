import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect dashboard routes - ADMIN ONLY
  if (pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('tracknexus_auth');
    const roleCookie = request.cookies.get('tracknexus_role');

    // Check if user is authenticated
    if (!authCookie) {
      // Redirect to login page
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user has admin role
    const userRole = roleCookie?.value;

    if (userRole !== 'admin') {
      // Only admins can access dashboard - redirect to access denied page
      const deniedUrl = new URL('/access-denied', request.url);
      return NextResponse.redirect(deniedUrl);
    }

    // Admin access granted - continue to dashboard
  }

  // Allow access to login page - users can login with different accounts
  // No automatic redirect from login page

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/access-denied'],
};
