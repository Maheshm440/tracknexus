import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Add response to ticket
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { message, isInternal = false, createdBy } = body;

    // Validate required fields
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Validate that ticket exists
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      return NextResponse.json(
        { success: false, error: 'Ticket not found' },
        { status: 404 }
      );
    }

    // Create the response
    const response = await prisma.ticketResponse.create({
      data: {
        ticketId: id,
        message,
        isInternal,
        createdBy,
      },
    });

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Add response error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add response' },
      { status: 500 }
    );
  }
}
