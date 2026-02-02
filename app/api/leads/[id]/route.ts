import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { LeadStatus } from '@prisma/client';

interface UpdateLeadRequest {
  status?: LeadStatus;
  score?: number;
}

// GET - Get a single lead by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        visitor: {
          include: {
            sessions: {
              orderBy: { startTime: 'desc' },
              take: 10,
              include: {
                pageViews: {
                  orderBy: { timestamp: 'desc' },
                },
              },
            },
          },
        },
      },
    });

    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error('Get lead error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lead' },
      { status: 500 }
    );
  }
}

// PATCH - Update a lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdateLeadRequest = await request.json();

    // Validate that lead exists
    const existingLead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!existingLead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: Record<string, unknown> = {};

    if (body.status) {
      updateData.status = body.status;
    }

    if (body.score !== undefined) {
      updateData.score = body.score;
    }

    // Update the lead
    const lead = await prisma.lead.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error('Update lead error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate that lead exists
    const existingLead = await prisma.lead.findUnique({
      where: { id },
    });

    if (!existingLead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Delete the lead
    await prisma.lead.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    console.error('Delete lead error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
