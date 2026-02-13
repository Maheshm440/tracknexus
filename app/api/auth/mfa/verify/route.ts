import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyTOTPEncrypted, verifyBackupCode } from '@/lib/mfa';
import { rateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit';
import { generateToken } from '@/lib/jwt';

// POST: Verify MFA code during login
export async function POST(request: NextRequest) {
  try {
    const { code, useBackupCode } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Verification code is required' },
        { status: 400 }
      );
    }

    // Get MFA pending session from cookie
    const mfaPendingCookie = request.cookies.get('mfa_pending');

    if (!mfaPendingCookie?.value) {
      return NextResponse.json(
        { error: 'MFA session expired. Please login again.' },
        { status: 401 }
      );
    }

    const email = mfaPendingCookie.value;

    // Rate limiting - stricter for MFA verification
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(
      `mfa-verify:${clientIp}:${email}`,
      { maxRequests: 5, windowMs: 5 * 60 * 1000 } // 5 attempts per 5 minutes
    );

    if (!rateLimitResult.success) {
      const resetIn = Math.ceil((rateLimitResult.reset - Date.now()) / 60000);
      return NextResponse.json(
        { error: `Too many failed attempts. Please try again in ${resetIn} minutes.` },
        { status: 429 }
      );
    }

    // Get user with MFA data
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user || !user.mfaEnabled || !user.mfaSecret) {
      return NextResponse.json(
        { error: 'MFA verification failed' },
        { status: 401 }
      );
    }

    let isValid = false;

    if (useBackupCode) {
      // Verify backup code
      const backupCodes = user.mfaBackupCodes ? JSON.parse(user.mfaBackupCodes) : [];
      const matchedIndex = await verifyBackupCode(code, backupCodes);

      if (matchedIndex >= 0) {
        isValid = true;
        // Remove used backup code
        backupCodes.splice(matchedIndex, 1);
        await prisma.user.update({
          where: { email: email.toLowerCase() },
          data: { mfaBackupCodes: JSON.stringify(backupCodes) }
        });
      }
    } else {
      // Validate TOTP code format (6 digits)
      if (!/^\d{6}$/.test(code)) {
        return NextResponse.json(
          { error: 'Invalid code format. Please enter a 6-digit code.' },
          { status: 400 }
        );
      }

      // Verify TOTP code
      isValid = verifyTOTPEncrypted(user.mfaSecret, code);
    }

    if (!isValid) {
      return NextResponse.json(
        { error: useBackupCode ? 'Invalid backup code' : 'Invalid verification code' },
        { status: 401 }
      );
    }

    // MFA verified successfully - issue full auth tokens
    // Fetch dashboard data
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
      email: user.email,
      name: user.name,
      role: user.role
    });

    // Create response with full auth
    const response = NextResponse.json({
      success: true,
      message: 'MFA verification successful',
      user: {
        email: user.email,
        name: user.name,
        role: user.role
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
    response.cookies.set('tracknexus_auth', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    response.cookies.set('tracknexus_role', user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    // Clear MFA pending cookie
    response.cookies.delete('mfa_pending');

    return response;

  } catch (error) {
    console.error('MFA verify error:', error);
    return NextResponse.json(
      { error: 'MFA verification failed' },
      { status: 500 }
    );
  }
}
