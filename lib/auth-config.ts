import prisma from './prisma';
import bcrypt from 'bcryptjs';

// User roles configuration
export type UserRole = 'admin' | 'user';

export interface UserConfig {
  email: string;
  role: UserRole;
  name: string;
  password?: string; // Hashed password
}

// Admin user configuration - loaded from environment variables
// SECURITY FIX #1: Credentials moved from hardcoded values to secure env vars
export const ADMIN_USER: UserConfig = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  role: 'admin',
  name: process.env.ADMIN_NAME || 'Admin',
  password: process.env.ADMIN_PASSWORD_HASH || '' // Bcrypt hashed password
};

// PERFORMANCE: Simple in-memory cache with TTL for user lookups
interface CacheEntry {
  user: UserConfig | undefined;
  timestamp: number;
}

const userCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

function getCachedUser(email: string): UserConfig | undefined | null {
  const cached = userCache.get(email.toLowerCase());
  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > CACHE_TTL;
  if (isExpired) {
    userCache.delete(email.toLowerCase());
    return null;
  }

  return cached.user;
}

function setCachedUser(email: string, user: UserConfig | undefined): void {
  userCache.set(email.toLowerCase(), {
    user,
    timestamp: Date.now()
  });
}

// Helper function to get user by email - checks admin config first, then database
// PERFORMANCE: Uses caching to reduce database queries
export async function getUserByEmail(email: string): Promise<UserConfig | undefined> {
  // Check if it's the admin user (no cache needed for env-based admin)
  if (ADMIN_USER.email.toLowerCase() === email.toLowerCase()) {
    return ADMIN_USER;
  }

  // Check cache first
  const cached = getCachedUser(email);
  if (cached !== null) {
    return cached;
  }

  // Check database for regular users
  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (dbUser) {
      const userConfig = {
        email: dbUser.email,
        role: dbUser.role as UserRole,
        name: dbUser.name,
        password: dbUser.password || undefined
      };
      setCachedUser(email, userConfig);
      return userConfig;
    }
  } catch (error) {
    console.error('Error fetching user from database:', error);
  }

  // Cache the undefined result to prevent repeated DB queries for non-existent users
  setCachedUser(email, undefined);
  return undefined;
}

// Helper function to check if user is admin
// PERFORMANCE: Uses cached getUserByEmail to avoid duplicate DB queries
export async function isAdmin(email: string): Promise<boolean> {
  const user = await getUserByEmail(email);
  return user?.role === 'admin';
}

// Get admin email
export function getAdminEmail(): string {
  return ADMIN_USER.email;
}

// Check if user requires password
export async function requiresPassword(email: string): Promise<boolean> {
  const user = await getUserByEmail(email);
  return user?.password !== undefined && user?.password !== '';
}

// SECURITY FIX #3: Verify user password with bcrypt
export async function verifyPassword(email: string, password: string): Promise<boolean> {
  const user = await getUserByEmail(email);
  if (!user) return false;

  // If user doesn't have a password set, password is not required
  if (!user.password || user.password === undefined || user.password === '') return true;

  // Use bcrypt to verify hashed password
  try {
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}

// SECURITY FIX #3: Hash password using bcrypt (for signup/password updates)
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}
