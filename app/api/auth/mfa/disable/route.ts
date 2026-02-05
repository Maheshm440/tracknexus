import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyTOTPEncrypted } from '@/lib/mfa';
import { rateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit';

// POST: Disable MFA (requires current TOTP verification)
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Current TOTP code is required to disable MFA' },
        { status: 400 }
      );
    }

    // Get authenticated user from cookie
    const authCookie = request.cookies.get('tracknexus_auth');

    if (!authCookie?.value) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const email = authCookie.value;

    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(
      `mfa-disable:${clientIp}`,
      RateLimitPresets.AUTH
    );

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Get user with MFA data
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.mfaEnabled || !user.mfaSecret) {
      return NextResponse.json(
        { error: 'MFA is not enabled for this account' },
        { status: 400 }
      );
    }

    // Verify current TOTP code
    const isValid = verifyTOTPEncrypted(user.mfaSecret, code);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 401 }
      );
    }

    // Disable MFA and clear secrets
    await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: {
        mfaEnabled: false,
        mfaSecret: null,
        mfaBackupCodes: null
      }
    });

    return NextResponse.json({
      success: true,
      message: 'MFA has been disabled successfully'
    });

  } catch (error) {
    console.error('MFA disable error:', error);
    return NextResponse.json(
      { error: 'Failed to disable MFA' },
      { status: 500 }
    );
  }
}
