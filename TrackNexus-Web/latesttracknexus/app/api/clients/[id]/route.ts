import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get single client
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: client,
    });
  } catch (error) {
    console.error('Get client error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

// PATCH - Update client
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate that record exists
    const existing = await prisma.client.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: Record<string, unknown> = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.company !== undefined) updateData.company = body.company;
    if (body.industry !== undefined) updateData.industry = body.industry;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.value !== undefined) updateData.value = body.value;
    if (body.notes !== undefined) updateData.notes = body.notes;

    // Update the record
    const updated = await prisma.client.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update client error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update client' },
      { status: 500 }
    );
  }
}

// DELETE - Delete client
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate that record exists
    const existing = await prisma.client.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    // Delete the record
    await prisma.client.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error) {
    console.error('Delete client error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}
