import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateBackupCodes, hashBackupCodes, verifyTOTPEncrypted } from '@/lib/mfa';
import { rateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit';

// POST: Generate new backup codes (requires current TOTP verification)
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Current TOTP code is required to generate new backup codes' },
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
      `mfa-backup:${clientIp}`,
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

    // Generate new backup codes
    const backupCodes = generateBackupCodes(10);
    const hashedBackupCodes = await hashBackupCodes(backupCodes);

    // Store new backup codes
    await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: { mfaBackupCodes: JSON.stringify(hashedBackupCodes) }
    });

    return NextResponse.json({
      success: true,
      backupCodes: backupCodes,
      message: 'New backup codes generated. Previous codes are now invalid.',
      warning: 'Save these backup codes in a secure location. They will not be shown again.'
    });

  } catch (error) {
    console.error('Backup codes generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate backup codes' },
      { status: 500 }
    );
  }
}

// GET: Get remaining backup codes count
export async function GET(request: NextRequest) {
  try {
    const authCookie = request.cookies.get('tracknexus_auth');

    if (!authCookie?.value) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const email = authCookie.value;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        mfaEnabled: true,
        mfaBackupCodes: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const backupCodes = user.mfaBackupCodes ? JSON.parse(user.mfaBackupCodes) : [];

    return NextResponse.json({
      mfaEnabled: user.mfaEnabled,
      remainingBackupCodes: backupCodes.length
    });

  } catch (error) {
    console.error('Backup codes check error:', error);
    return NextResponse.json(
      { error: 'Failed to check backup codes' },
      { status: 500 }
    );
  }
}
