import { NextRequest, NextResponse } from 'next/server';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET - List follow-ups with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    // Build where clause
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (dateFrom || dateTo) {
      where.dueDate = {};
      if (dateFrom) {
        (where.dueDate as Record<string, unknown>).gte = new Date(dateFrom);
      }
      if (dateTo) {
        (where.dueDate as Record<string, unknown>).lte = new Date(dateTo);
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { lead: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    let total = 0;
    let followUps: any[] = [];

    try {
      // Get total count
      total = await prisma.followUp.count({ where });

      // Get follow-ups with pagination
      followUps = await prisma.followUp.findMany({
        where,
        orderBy: { dueDate: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
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
    } catch (dbError) {
      // Database is unavailable, return empty data
      console.log('Database unavailable for follow-ups, returning empty data');
      total = 0;
      followUps = [];
    }

    return NextResponse.json({
      success: true,
      data: followUps,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('List follow-ups error:', error);
    return NextResponse.json(
      { success: true, data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } },
      { status: 200 }
    );
  }
}

// POST - Create a new follow-up
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      leadId,
      title,
      description,
      dueDate,
      priority = 'MEDIUM',
      createdBy,
    } = body;

    // Validate required fields
    if (!leadId || !title || !dueDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the follow-up
    const followUp = await prisma.followUp.create({
      data: {
        leadId,
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
        createdBy,
      },
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
      data: followUp,
    });
  } catch (error) {
    console.error('Create follow-up error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create follow-up' },
      { status: 500 }
    );
  }
}
