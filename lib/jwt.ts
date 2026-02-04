// SECURITY FIX #4: JWT Token Management
// This module provides JWT token generation and verification for enhanced security

import jwt from 'jsonwebtoken';

// JWT Configuration from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

export interface JWTPayload {
  email: string;
  role: string;
  name: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token for authenticated user
 * @param payload - User data to encode in token
 * @returns Signed JWT token string
 */
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  if (!JWT_SECRET || JWT_SECRET === 'fallback-secret-change-in-production') {
    console.error('⚠️ WARNING: Using fallback JWT secret. Set JWT_SECRET in .env!');
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE as jwt.SignOptions['expiresIn'],
    issuer: 'tracknexus',
    audience: 'tracknexus-users'
  });
}

/**
 * Verify and decode a JWT token
 * @param token - JWT token string to verify
 * @returns Decoded payload if valid, null if invalid
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'tracknexus',
      audience: 'tracknexus-users'
    }) as JWTPayload;

    return decoded;
  } catch (error) {
    // Token is invalid, expired, or tampered with
    if (error instanceof jwt.JsonWebTokenError) {
      console.error('JWT verification failed:', error.message);
    }
    return null;
  }
}

/**
 * Refresh an existing token (generate new token from old token payload)
 * @param token - Current valid JWT token
 * @returns New JWT token with extended expiration, null if current token invalid
 */
export function refreshToken(token: string): string | null {
  const payload = verifyToken(token);

  if (!payload) {
    return null;
  }

  // Remove JWT-specific fields before re-signing
  const { iat, exp, ...userPayload } = payload;

  return generateToken(userPayload);
}

/**
 * Decode a JWT token without verification (use only for debugging)
 * @param token - JWT token to decode
 * @returns Decoded payload or null
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Check if a token is expired without throwing errors
 * @param token - JWT token to check
 * @returns true if expired, false if valid
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) {
      return true;
    }

    // Check if expiration time has passed
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

/**
 * Get time until token expiration in seconds
 * @param token - JWT token to check
 * @returns Seconds until expiration, 0 if expired or invalid
 */
export function getTokenExpiresIn(token: string): number {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) {
      return 0;
    }

    const expiresIn = Math.floor((decoded.exp * 1000 - Date.now()) / 1000);
    return Math.max(0, expiresIn);
  } catch {
    return 0;
  }
}
