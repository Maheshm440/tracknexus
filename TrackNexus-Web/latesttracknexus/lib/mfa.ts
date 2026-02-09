// MFA (Multi-Factor Authentication) utilities for TOTP-based authentication
import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const APP_NAME = 'TrackNexus';

// Encryption key for storing TOTP secrets (use JWT_SECRET as base)
const getEncryptionKey = (): Buffer => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
  return crypto.scryptSync(secret, 'mfa-salt', 32);
};

/**
 * Generate a new TOTP secret for a user
 */
export function generateTOTPSecret(email: string): OTPAuth.TOTP {
  const totp = new OTPAuth.TOTP({
    issuer: APP_NAME,
    label: email,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: new OTPAuth.Secret({ size: 20 }),
  });

  return totp;
}

/**
 * Encrypt TOTP secret for database storage
 */
export function encryptSecret(secret: string): string {
  const iv = crypto.randomBytes(16);
  const key = getEncryptionKey();
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  let encrypted = cipher.update(secret, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypt TOTP secret from database
 */
export function decryptSecret(encryptedSecret: string): string {
  const [ivHex, encrypted] = encryptedSecret.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = getEncryptionKey();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Generate QR code data URL for authenticator app
 */
export async function generateQRCodeDataURL(totp: OTPAuth.TOTP): Promise<string> {
  const uri = totp.toString();
  const qrCodeDataURL = await QRCode.toDataURL(uri, {
    width: 256,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });
  return qrCodeDataURL;
}

/**
 * Verify a TOTP token
 */
export function verifyTOTP(secret: string, token: string): boolean {
  try {
    const totp = new OTPAuth.TOTP({
      issuer: APP_NAME,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(secret),
    });

    // Allow 1 time step window (30 seconds before/after) for clock drift
    const delta = totp.validate({ token, window: 1 });
    return delta !== null;
  } catch (error) {
    console.error('TOTP verification error:', error);
    return false;
  }
}

/**
 * Verify TOTP with encrypted secret from database
 */
export function verifyTOTPEncrypted(encryptedSecret: string, token: string): boolean {
  try {
    const secret = decryptSecret(encryptedSecret);
    return verifyTOTP(secret, token);
  } catch (error) {
    console.error('Encrypted TOTP verification error:', error);
    return false;
  }
}

/**
 * Generate backup codes for MFA recovery
 */
export function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = [];

  for (let i = 0; i < count; i++) {
    // Generate 8-character alphanumeric code in format: XXXX-XXXX
    const part1 = crypto.randomBytes(2).toString('hex').toUpperCase();
    const part2 = crypto.randomBytes(2).toString('hex').toUpperCase();
    codes.push(`${part1}-${part2}`);
  }

  return codes;
}

/**
 * Hash backup codes for secure storage
 */
export async function hashBackupCodes(codes: string[]): Promise<string[]> {
  const hashedCodes = await Promise.all(
    codes.map(code => bcrypt.hash(code.replace('-', ''), 10))
  );
  return hashedCodes;
}

/**
 * Verify a backup code against stored hashes
 * Returns the index of the matched code, or -1 if not found
 */
export async function verifyBackupCode(
  code: string,
  hashedCodes: string[]
): Promise<number> {
  const normalizedCode = code.replace('-', '').toUpperCase();

  for (let i = 0; i < hashedCodes.length; i++) {
    const isMatch = await bcrypt.compare(normalizedCode, hashedCodes[i]);
    if (isMatch) {
      return i;
    }
  }

  return -1;
}

/**
 * Create MFA setup data for a user
 */
export async function createMFASetup(email: string): Promise<{
  secret: string;
  encryptedSecret: string;
  qrCodeDataURL: string;
  manualEntryKey: string;
}> {
  const totp = generateTOTPSecret(email);
  const secret = totp.secret.base32;
  const encryptedSecret = encryptSecret(secret);
  const qrCodeDataURL = await generateQRCodeDataURL(totp);

  return {
    secret,
    encryptedSecret,
    qrCodeDataURL,
    manualEntryKey: secret, // Same as secret, for manual entry in authenticator app
  };
}

/**
 * MFA setup result interface
 */
export interface MFASetupResult {
  qrCodeDataURL: string;
  manualEntryKey: string;
  tempSecret: string; // To be stored temporarily until verification
}

/**
 * MFA verification result
 */
export interface MFAVerifyResult {
  success: boolean;
  error?: string;
}
