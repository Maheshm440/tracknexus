import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserByEmail, requiresPassword, verifyPassword } from '@/lib/auth-config';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists in our config
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email. Account not found.' },
        { status: 404 }
      );
    }

    // Check if password is required for this user
    if (await requiresPassword(email)) {
      if (!password) {
        return NextResponse.json(
          { error: 'Password is required for this account.' },
          { status: 400 }
        );
      }

      // Verify password
      if (!(await verifyPassword(email, password))) {
        return NextResponse.json(
          { error: 'Invalid password. Please try again.' },
          { status: 401 }
        );
      }
    }

    // Fetch dashboard data from database
    const [leads, visitors, botActivities] = await Promise.all([
      prisma.lead.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' }
      }).catch(() => []),
      prisma.visitor.findMany({
        take: 20,
        orderBy: { lastVisit: 'desc' }
      }).catch(() => []),
      prisma.botActivity.findMany({
        take: 20,
        orderBy: { detectedAt: 'desc' }
      }).catch(() => []),
    ]);

    // Create response with auth cookie and dashboard data
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          email: user.email,
          name: user.name,
          role: user.role
        },
        dashboardData: {
          users: [],
          leads,
          visitors,
          activities: botActivities
        }
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for authentication
    response.cookies.set('tracknexus_auth', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Set role cookie
    response.cookies.set('tracknexus_role', user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
