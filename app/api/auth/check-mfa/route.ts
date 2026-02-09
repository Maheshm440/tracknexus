import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminEmail } from '@/lib/auth-config';
import { rateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit';
import { createMFASetup } from '@/lib/mfa';

// POST: Check if user exists and has MFA enabled
// Only admin email can access dashboard via MFA
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(
      `check-mfa:${clientIp}`,
      RateLimitPresets.AUTH
    );

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Only admin email is allowed to login
    const adminEmail = getAdminEmail();
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json(
        { error: 'Access denied. Only authorized administrators can login.' },
        { status: 403 }
      );
    }

    // Check MFA status in database
    const dbUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { mfaEnabled: true, mfaSecret: true }
    });

    const hasMFA = dbUser?.mfaEnabled && dbUser?.mfaSecret;

    // If MFA is not enabled, generate setup data (QR code)
    if (!hasMFA) {
      // Generate MFA setup data
      const mfaSetup = await createMFASetup(email);

      // Store the encrypted secret temporarily (will be confirmed during first login)
      await prisma.user.update({
        where: { email: email.toLowerCase() },
        data: {
          mfaSecret: mfaSetup.encryptedSecret,
          mfaEnabled: false // Keep disabled until verification
        }
      });

      return NextResponse.json({
        success: true,
        hasMFA: false,
        needsSetup: true,
        qrCodeDataURL: mfaSetup.qrCodeDataURL,
        manualEntryKey: mfaSetup.manualEntryKey,
        email: email.toLowerCase()
      });
    }

    return NextResponse.json({
      success: true,
      hasMFA: true,
      needsSetup: false,
      email: email.toLowerCase()
    });

  } catch (error) {
    console.error('Check MFA error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `An error occurred: ${errorMessage}` },
      { status: 500 }
    );
  }
}
