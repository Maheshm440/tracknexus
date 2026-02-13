import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminEmail } from '@/lib/auth-config';
import { verifyTOTPEncrypted } from '@/lib/mfa';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { generateToken } from '@/lib/jwt';

// POST: Login with email + MFA code only (no password)
// Only admin email is allowed to login
export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    // Validate code format
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: 'Invalid code format. Please enter a 6-digit code.' },
        { status: 400 }
      );
    }

    // Rate limiting - strict for MFA login
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(
      `login-mfa:${clientIp}:${email}`,
      { maxRequests: 5, windowMs: 5 * 60 * 1000 } // 5 attempts per 5 minutes
    );

    if (!rateLimitResult.success) {
      const resetIn = Math.ceil((rateLimitResult.reset - Date.now()) / 60000);
      return NextResponse.json(
        { error: `Too many failed attempts. Please try again in ${resetIn} minutes.` },
        { status: 429 }
      );
    }

    // Only admin email is allowed to login
    const adminEmail = getAdminEmail();
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Get user's MFA data from database
    const dbUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        mfaEnabled: true,
        mfaSecret: true,
        role: true,
        name: true,
        email: true
      }
    });

    // Check if user has MFA secret set (enabled or pending first verification)
    if (!dbUser || !dbUser.mfaSecret) {
      return NextResponse.json(
        { error: 'MFA is not configured for this account' },
        { status: 401 }
      );
    }

    // Verify TOTP code
    const isValid = verifyTOTPEncrypted(dbUser.mfaSecret, code);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 401 }
      );
    }

    // If this is first-time verification, enable MFA
    if (!dbUser.mfaEnabled) {
      await prisma.user.update({
        where: { email: email.toLowerCase() },
        data: { mfaEnabled: true }
      });
    }

    // MFA verified - fetch dashboard data and issue tokens
    const [leads, visitors, botActivities] = await Promise.all([
      prisma.lead.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' }
      }).catch(() => []),
      prisma.visitor.findMany({
        take: 20,
        orderBy: { lastVisit: 'desc' }
      }).catch(() => []),
      prisma.botVisit.findMany({
        take: 20,
        orderBy: { timestamp: 'desc' }
      }).catch(() => []),
    ]);

    // Generate JWT token
    const jwtToken = generateToken({
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role
    });

    // Create response with auth cookies
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role
      },
      token: jwtToken,
      dashboardData: {
        users: [],
        leads,
        visitors,
        activities: botActivities
      }
    });

    // Set auth cookies
    response.cookies.set('tracknexus_auth', dbUser.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    response.cookies.set('tracknexus_role', dbUser.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('MFA login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
