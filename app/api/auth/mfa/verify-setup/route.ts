import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyTOTPEncrypted, generateBackupCodes, hashBackupCodes } from '@/lib/mfa';
import { rateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit';

// POST: Verify MFA code and enable MFA for user
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Verification code is required' },
        { status: 400 }
      );
    }

    // Validate code format (6 digits)
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: 'Invalid code format. Please enter a 6-digit code.' },
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
      `mfa-verify-setup:${clientIp}`,
      RateLimitPresets.AUTH
    );

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Get user with MFA secret
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.mfaSecret) {
      return NextResponse.json(
        { error: 'MFA setup not initiated. Please start setup first.' },
        { status: 400 }
      );
    }

    if (user.mfaEnabled) {
      return NextResponse.json(
        { error: 'MFA is already enabled' },
        { status: 400 }
      );
    }

    // Verify the TOTP code
    const isValid = verifyTOTPEncrypted(user.mfaSecret, code);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid verification code. Please try again.' },
        { status: 401 }
      );
    }

    // Generate backup codes
    const backupCodes = generateBackupCodes(10);
    const hashedBackupCodes = await hashBackupCodes(backupCodes);

    // Enable MFA and store backup codes
    await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: {
        mfaEnabled: true,
        mfaBackupCodes: JSON.stringify(hashedBackupCodes)
      }
    });

    return NextResponse.json({
      success: true,
      message: 'MFA has been enabled successfully',
      backupCodes: backupCodes, // Return plain-text backup codes (only shown once)
      warning: 'Save these backup codes in a secure location. They will not be shown again.'
    });

  } catch (error) {
    console.error('MFA verify setup error:', error);
    return NextResponse.json(
      { error: 'Failed to verify MFA setup' },
      { status: 500 }
    );
  }
}
