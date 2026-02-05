import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createMFASetup } from '@/lib/mfa';
import { rateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit';

// POST: Generate MFA setup data (QR code, secret)
export async function POST(request: NextRequest) {
  try {
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
      `mfa-setup:${clientIp}`,
      RateLimitPresets.AUTH
    );

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Check if user exists in database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if MFA is already enabled
    if (user.mfaEnabled) {
      return NextResponse.json(
        { error: 'MFA is already enabled for this account' },
        { status: 400 }
      );
    }

    // Generate MFA setup data
    const mfaSetup = await createMFASetup(email);

    // Store the encrypted secret temporarily (will be confirmed during verify-setup)
    // We'll store it but keep mfaEnabled as false until verification
    await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: {
        mfaSecret: mfaSetup.encryptedSecret,
        mfaEnabled: false // Keep disabled until verification
      }
    });

    return NextResponse.json({
      success: true,
      qrCodeDataURL: mfaSetup.qrCodeDataURL,
      manualEntryKey: mfaSetup.manualEntryKey,
      message: 'Scan the QR code with your authenticator app, then enter the code to verify'
    });

  } catch (error) {
    console.error('MFA setup error:', error);
    return NextResponse.json(
      { error: 'Failed to setup MFA' },
      { status: 500 }
    );
  }
}

// GET: Check MFA status for current user
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

    return NextResponse.json({
      mfaEnabled: user.mfaEnabled,
      hasBackupCodes: !!user.mfaBackupCodes
    });

  } catch (error) {
    console.error('MFA status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check MFA status' },
      { status: 500 }
    );
  }
}
