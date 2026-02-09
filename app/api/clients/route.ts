import { NextRequest, NextResponse } from 'next/server';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET - List clients with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Build where clause
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }

    let total = 0;
    let clients: any[] = [];
    let active = 0;
    let totalValue = 0;

    try {
      // Get total count
      total = await prisma.client.count({ where });

      // Get clients with pagination
      clients = await prisma.client.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      });

      // Calculate stats
      active = await prisma.client.count({ where: { status: 'ACTIVE' } });
      const totalValueResult = await prisma.client.aggregate({
        where: { status: 'ACTIVE' },
        _sum: { value: true },
      });
      totalValue = totalValueResult._sum.value || 0;
    } catch (dbError) {
      // Database is unavailable, return empty data
      console.log('Database unavailable for clients, returning empty data');
      total = 0;
      clients = [];
      active = 0;
      totalValue = 0;
    }

    return NextResponse.json({
      success: true,
      data: clients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalClients: total,
        activeClients: active,
        totalValue: totalValue || 0,
      },
    });
  } catch (error) {
    console.error('List clients error:', error);
    return NextResponse.json(
      { success: true, data: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 }, stats: { totalClients: 0, activeClients: 0, totalValue: 0 } },
      { status: 200 }
    );
  }
}

// POST - Create new client
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      industry,
      status = 'ACTIVE',
      value,
      notes,
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the client
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        company,
        industry,
        status,
        value,
        notes,
      },
    });

    return NextResponse.json({
      success: true,
      data: client,
    });
  } catch (error) {
    console.error('Create client error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create client' },
      { status: 500 }
    );
  }
}
