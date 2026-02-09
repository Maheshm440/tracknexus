import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

interface GenerateOTPResult {
  success: boolean;
  otp?: string;
  expiresAt?: Date;
  error?: string;
}

interface VerifyOTPResult {
  success: boolean;
  error?: string;
}

/**
 * Generate a random 6-digit OTP code
 */
export function generateOTPCode(): string {
  const length = parseInt(process.env.OTP_LENGTH || '6');
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
}

/**
 * Hash OTP code before storing in database
 */
export async function hashOTP(otp: string): Promise<string> {
  return await bcrypt.hash(otp, 10);
}

/**
 * Verify OTP against stored hash
 */
export async function verifyOTPHash(otp: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(otp, hash);
}

/**
 * Generate and store OTP for email verification
 */
export async function generateAndStoreOTP(
  email: string,
  purpose: 'signup' | 'reset' = 'signup'
): Promise<GenerateOTPResult> {
  try {
    // Check for existing unexpired OTP
    const existingOTP = await prisma.emailVerification.findFirst({
      where: {
        email: email.toLowerCase(),
        purpose,
        expiresAt: { gt: new Date() },
        verifiedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Rate limiting: Don't allow new OTP if one was sent < 1 minute ago
    if (existingOTP) {
      const timeSinceCreated = Date.now() - existingOTP.createdAt.getTime();
      if (timeSinceCreated < 60000) { // 1 minute
        return {
          success: false,
          error: 'Please wait before requesting a new code',
        };
      }
    }

    // Invalidate all previous OTPs for this email/purpose
    await prisma.emailVerification.updateMany({
      where: {
        email: email.toLowerCase(),
        purpose,
        verifiedAt: null,
      },
      data: {
        expiresAt: new Date(), // Expire immediately
      },
    });

    // Generate new OTP
    const otpCode = generateOTPCode();
    const hashedOTP = await hashOTP(otpCode);
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || '15');
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    // Store in database
    await prisma.emailVerification.create({
      data: {
        email: email.toLowerCase(),
        otp: hashedOTP,
        purpose,
        expiresAt,
      },
    });

    return {
      success: true,
      otp: otpCode,
      expiresAt,
    };
  } catch (error) {
    console.error('OTP generation error:', error);
    return {
      success: false,
      error: 'Failed to generate verification code',
    };
  }
}

/**
 * Verify OTP code
 */
export async function verifyOTPCode(
  email: string,
  otpCode: string,
  purpose: 'signup' | 'reset' = 'signup'
): Promise<VerifyOTPResult> {
  try {
    // Find the most recent unexpired OTP
    const verification = await prisma.emailVerification.findFirst({
      where: {
        email: email.toLowerCase(),
        purpose,
        expiresAt: { gt: new Date() },
        verifiedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!verification) {
      return {
        success: false,
        error: 'Invalid or expired verification code',
      };
    }

    // Check max attempts
    const maxAttempts = parseInt(process.env.OTP_MAX_ATTEMPTS || '3');
    if (verification.attempts >= maxAttempts) {
      return {
        success: false,
        error: 'Maximum verification attempts exceeded. Please request a new code.',
      };
    }

    // Verify OTP
    const isValid = await verifyOTPHash(otpCode, verification.otp);

    if (!isValid) {
      // Increment attempt counter
      await prisma.emailVerification.update({
        where: { id: verification.id },
        data: { attempts: verification.attempts + 1 },
      });

      const remainingAttempts = maxAttempts - verification.attempts - 1;
      return {
        success: false,
        error: `Invalid code. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`,
      };
    }

    // Mark as verified
    await prisma.emailVerification.update({
      where: { id: verification.id },
      data: { verifiedAt: new Date() },
    });

    return { success: true };
  } catch (error) {
    console.error('OTP verification error:', error);
    return {
      success: false,
      error: 'Failed to verify code',
    };
  }
}

/**
 * Cleanup expired OTPs (run periodically)
 */
export async function cleanupExpiredOTPs(): Promise<void> {
  try {
    await prisma.emailVerification.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
        createdAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Older than 24h
      },
    });
  } catch (error) {
    console.error('OTP cleanup error:', error);
  }
}
