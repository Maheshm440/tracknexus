// SECURITY FIX #6: Authentication middleware for API routes
import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from './auth-config';

/**
 * Verify authentication from cookies
 */
export async function verifyAuth(request: NextRequest): Promise<{
  authenticated: boolean;
  email?: string;
  role?: string;
}> {
  const authCookie = request.cookies.get('tracknexus_auth');
  const roleCookie = request.cookies.get('tracknexus_role');

  if (!authCookie || !authCookie.value) {
    return { authenticated: false };
  }

  const email = authCookie.value;
  const role = roleCookie?.value || 'user';

  // Verify user exists
  const user = await getUserByEmail(email);
  if (!user) {
    return { authenticated: false };
  }

  return {
    authenticated: true,
    email,
    role
  };
}

/**
 * Require authentication middleware
 * Returns 401 if not authenticated
 */
export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const auth = await verifyAuth(request);

  if (!auth.authenticated) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  return null; // Continue to handler
}

/**
 * Require admin role middleware
 * Returns 401 if not authenticated, 403 if not admin
 */
export async function requireAdmin(request: NextRequest): Promise<NextResponse | null> {
  const auth = await verifyAuth(request);

  if (!auth.authenticated) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  if (auth.role !== 'admin') {
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    );
  }

  return null; // Continue to handler
}

/**
 * Get authenticated user info from request
 */
export async function getAuthUser(request: NextRequest): Promise<{
  email: string;
  role: string;
} | null> {
  const auth = await verifyAuth(request);

  if (!auth.authenticated || !auth.email || !auth.role) {
    return null;
  }

  return {
    email: auth.email,
    role: auth.role
  };
}
