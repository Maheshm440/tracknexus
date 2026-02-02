import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get single follow-up details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const followUp = await prisma.followUp.findUnique({
      where: { id },
      include: {
        lead: {
          select: {
            id: true,
            name: true,
            companyName: true,
            companyEmail: true,
          },
        },
      },
    });

    if (!followUp) {
      return NextResponse.json(
        { success: false, error: 'Follow-up not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: followUp,
    });
  } catch (error) {
    console.error('Get follow-up error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch follow-up' },
      { status: 500 }
    );
  }
}

// PATCH - Update follow-up
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate that record exists
    const existing = await prisma.followUp.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Follow-up not found' },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: Record<string, unknown> = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.dueDate !== undefined) updateData.dueDate = new Date(body.dueDate);
    if (body.priority !== undefined) updateData.priority = body.priority;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.assignedTo !== undefined) updateData.assignedTo = body.assignedTo;
    if (body.status === 'COMPLETED' && !existing.completedAt) {
      updateData.completedAt = new Date();
    }

    // Update the record
    const updated = await prisma.followUp.update({
      where: { id },
      data: updateData,
      include: {
        lead: {
          select: {
            id: true,
            name: true,
            companyName: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update follow-up error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update follow-up' },
      { status: 500 }
    );
  }
}

// DELETE - Delete follow-up
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate that record exists
    const existing = await prisma.followUp.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Follow-up not found' },
        { status: 404 }
      );
    }

    // Delete the record
    await prisma.followUp.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Follow-up deleted successfully',
    });
  } catch (error) {
    console.error('Delete follow-up error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete follow-up' },
      { status: 500 }
    );
  }
}
