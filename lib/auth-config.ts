import prisma from './prisma';

// User roles configuration
export type UserRole = 'admin' | 'user';

export interface UserConfig {
  email: string;
  role: UserRole;
  name: string;
  password?: string; // Optional password (if not set, email-only login)
}

// Admin user - has special dashboard access
export const ADMIN_USER: UserConfig = {
  email: 'mahesh.mangala@workisy.com',
  role: 'admin',
  name: 'Mahesh Mangala',
  password: '123456'
};

// Helper function to get user by email - checks admin config first, then database
export async function getUserByEmail(email: string): Promise<UserConfig | undefined> {
  // Check if it's the admin user
  if (ADMIN_USER.email.toLowerCase() === email.toLowerCase()) {
    return ADMIN_USER;
  }

  // Check database for regular users
  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (dbUser) {
      return {
        email: dbUser.email,
        role: dbUser.role as UserRole,
        name: dbUser.name,
        password: dbUser.password || undefined
      };
    }
  } catch (error) {
    console.error('Error fetching user from database:', error);
  }

  return undefined;
}

// Helper function to check if user is admin
export async function isAdmin(email: string): Promise<boolean> {
  // Only the hardcoded admin has admin role
  return ADMIN_USER.email.toLowerCase() === email.toLowerCase();
}

// Get admin email
export function getAdminEmail(): string {
  return ADMIN_USER.email;
}

// Check if user requires password
export async function requiresPassword(email: string): Promise<boolean> {
  const user = await getUserByEmail(email);
  return user?.password !== undefined;
}

// Verify user password
export async function verifyPassword(email: string, password: string): Promise<boolean> {
  const user = await getUserByEmail(email);
  if (!user) return false;

  // If user doesn't have a password set, password is not required
  if (user.password === undefined) return true;

  // Verify password matches
  return user.password === password;
}
