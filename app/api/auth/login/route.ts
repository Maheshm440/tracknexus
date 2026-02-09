import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserByEmail, requiresPassword, verifyPassword } from '@/lib/auth-config';
import { rateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit';
import { generateToken } from '@/lib/jwt';

// Helper to check if user has MFA enabled
async function checkUserMFA(email: string): Promise<{ enabled: boolean }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { mfaEnabled: true }
    });
    return { enabled: user?.mfaEnabled || false };
  } catch {
    return { enabled: false };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // SECURITY FIX #7: Rate limiting - 5 attempts per 15 minutes per IP
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(
      `login:${clientIp}`,
      RateLimitPresets.AUTH
    );

    if (!rateLimitResult.success) {
      const resetIn = Math.ceil((rateLimitResult.reset - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: `Too many login attempts. Please try again in ${resetIn} minutes.`,
          retryAfter: resetIn
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
            'Retry-After': (resetIn * 60).toString()
          }
        }
      );
    }

    // SECURITY FIX #8: Use generic error message to prevent user enumeration
    const user = await getUserByEmail(email);

    // Check if password is required and verify
    const passwordRequired = user ? await requiresPassword(email) : false;

    if (passwordRequired && !password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify credentials
    const isValidPassword = user ? await verifyPassword(email, password || '') : false;

    if (!user || (passwordRequired && !isValidPassword)) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if MFA is enabled for this user
    const mfaStatus = await checkUserMFA(email);

    if (mfaStatus.enabled) {
      // MFA is enabled - return MFA required response with pending session
      const response = NextResponse.json({
        success: false,
        requiresMFA: true,
        message: 'MFA verification required',
        user: {
          email: user.email,
          name: user.name
        }
      });

      // Set MFA pending cookie (short-lived, 5 minutes)
      response.cookies.set('mfa_pending', user.email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 5 * 60, // 5 minutes to complete MFA
        path: '/',
      });

      return response;
    }

    // Fetch dashboard data from database
    const [leads, visitors, botActivities] = await Promise.all([
      prisma.lead.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' }
      }).catch(() => []),
      prisma.visitor.findMany({
        take: 20,
        orderBy: { lastVisit: 'desc' }
      }).catch(() => []),
      prisma.botActivity.findMany({
        take: 20,
        orderBy: { detectedAt: 'desc' }
      }).catch(() => []),
    ]);

    // SECURITY FIX #4: Generate JWT token for API authentication
    const jwtToken = generateToken({
      email: user.email,
      name: user.name,
      role: user.role
    });

    // Create response with auth cookie, JWT token, and dashboard data
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          email: user.email,
          name: user.name,
          role: user.role
        },
        token: jwtToken, // JWT token for API requests
        dashboardData: {
          users: [],
          leads,
          visitors,
          activities: botActivities
        }
      },
      { status: 200 }
    );

    // SECURITY FIX #18: Set HTTP-only cookie with strict sameSite
    response.cookies.set('tracknexus_auth', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Changed from 'lax' to 'strict' for better CSRF protection
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Set role cookie
    response.cookies.set('tracknexus_role', user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // Changed from 'lax' to 'strict'
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
