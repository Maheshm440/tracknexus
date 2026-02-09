import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - List visitors with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const country = searchParams.get('country');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const hasConsent = searchParams.get('hasConsent');

    // Build where clause
    const where: Record<string, unknown> = {};

    if (country) {
      where.country = country;
    }

    if (hasConsent !== null) {
      where.consentGiven = hasConsent === 'true';
    }

    if (dateFrom || dateTo) {
      where.lastVisit = {};
      if (dateFrom) {
        (where.lastVisit as Record<string, unknown>).gte = new Date(dateFrom);
      }
      if (dateTo) {
        (where.lastVisit as Record<string, unknown>).lte = new Date(dateTo);
      }
    }

    // Get total count
    const total = await prisma.visitor.count({ where });

    // Get visitors with pagination
    const visitors = await prisma.visitor.findMany({
      where,
      orderBy: { lastVisit: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: {
            sessions: true,
            leads: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: visitors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('List visitors error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch visitors' },
      { status: 500 }
    );
  }
}
