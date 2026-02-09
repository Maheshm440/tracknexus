import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper function to generate ticket number
function generateTicketNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `TN-${timestamp}${random}`;
}

// GET - List tickets with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');

    // Build where clause
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (search) {
      where.OR = [
        { ticketNumber: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get total count
    const total = await prisma.ticket.count({ where });

    // Get tickets with pagination
    const tickets = await prisma.ticket.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: { responses: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: tickets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('List tickets error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

// POST - Create a new ticket
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, description, email, priority = 'MEDIUM', category } = body;

    // Validate required fields
    if (!subject || !description || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: subject, description, and email are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Create the ticket
    const ticket = await prisma.ticket.create({
      data: {
        ticketNumber: generateTicketNumber(),
        subject,
        description,
        email,
        priority,
        category,
      },
      include: {
        _count: {
          select: { responses: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error('Create ticket error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}
