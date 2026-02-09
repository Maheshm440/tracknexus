import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/auth-config';
import { rateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

    // SECURITY FIX #7: Rate limiting - 3 signups per hour per IP
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(
      `signup:${clientIp}`,
      RateLimitPresets.SIGNUP
    );

    if (!rateLimitResult.success) {
      const resetIn = Math.ceil((rateLimitResult.reset - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: `Too many signup attempts. Please try again in ${resetIn} minutes.`,
          retryAfter: resetIn
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString()
          }
        }
      );
    }

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    // SECURITY FIX #8: Use generic error message to prevent user enumeration
    if (existingUser) {
      return NextResponse.json(
        { error: 'Unable to create account. Please try a different email.' },
        { status: 400 }
      );
    }

    // SECURITY FIX #3: Hash password before storing
    const hashedPassword = password ? await hashPassword(password) : null;

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name: name.trim(),
        password: hashedPassword,
        role: role || 'user',
        status: 'active',
        emailVerified: true
      }
    });

    // Create a lead entry for tracking
    await prisma.lead.create({
      data: {
        name: name.trim(),
        companyName: 'Self-Service Signup',
        companyEmail: email.toLowerCase(),
        companySize: 'Unknown',
        mobileNumber: '',
        message: 'User registered via signup form',
        formType: 'signup',
        status: 'NEW',
        score: 50
      }
    }).catch(() => {
      // Ignore lead creation errors, not critical
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully! You can now log in.',
        email: newUser.email
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}
