import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { detectBot } from './lib/bot-detector';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // --- Bot Detection (fire-and-forget, non-blocking) ---
  // Skip internal paths that shouldn't be tracked
  const skipBotTracking =
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/admin/') ||
    pathname.includes('.');

  if (!skipBotTracking) {
    const result = detectBot(userAgent);
    if (result.isBot && result.botName && result.botCategory) {
      const origin = request.nextUrl.origin;
      const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        'unknown';

      // Fire-and-forget: don't await, don't block the response
      fetch(`${origin}/api/tracking/bot-visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          botName: result.botName,
          botCategory: result.botCategory,
          path: pathname,
          method: request.method,
          userAgent: userAgent.slice(0, 1000),
          ip: ip.slice(0, 45),
        }),
      }).catch(() => {
        // Silently ignore tracking failures
      });
    }
  }

  // --- Dashboard Auth Protection (existing logic) ---
  if (pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('tracknexus_auth');
    const roleCookie = request.cookies.get('tracknexus_role');

    if (!authCookie?.value?.trim()) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = roleCookie?.value?.trim();

    if (!userRole || userRole !== 'admin') {
      const redirectUrl = !userRole ? '/login' : '/access-denied';
      const targetUrl = new URL(redirectUrl, request.url);
      if (!userRole) targetUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(targetUrl);
    }

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
  // Match all routes except static files, images, and Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};
