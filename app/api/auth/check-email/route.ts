import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, requiresPassword } from '@/lib/auth-config';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists (admin or registered database user)
    const user = await getUserByEmail(email);

    if (!user) {
      // User not found
      return NextResponse.json(
        { exists: false, requiresPassword: false },
        { status: 200 }
      );
    }

    // Return whether user exists and requires password
    return NextResponse.json(
      {
        exists: true,
        requiresPassword: await requiresPassword(email),
        name: user.name
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
