import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

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

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name: name.trim(),
        password: password || null, // Store password as-is (in production, should be hashed)
        role: role || 'user',
        status: 'active'
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
        message: 'Account created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role
        }
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
