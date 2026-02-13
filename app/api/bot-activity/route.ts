import { NextRequest, NextResponse } from 'next/server';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sinceParam = searchParams.get('since');
    const untilParam = searchParams.get('until');

    // Build date range from explicit params or fallback to days
    let since: Date;
    let until: Date | undefined;

    if (sinceParam) {
      since = new Date(sinceParam);
      if (untilParam) until = new Date(untilParam);
    } else {
      const days = Math.min(parseInt(searchParams.get('days') || '30'), 3650);
      since = new Date();
      since.setDate(since.getDate() - days);
    }

    const whereClause = {
      timestamp: {
        gte: since,
        ...(until ? { lte: until } : {}),
      },
    };

    const [totalVisits, byBot, byCategory, byPath, recentActivity] = await Promise.all([
      prisma.botVisit.count({ where: whereClause }),

      prisma.botVisit.groupBy({
        by: ['botName'],
        where: whereClause,
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 20,
      }),

      prisma.botVisit.groupBy({
        by: ['botCategory'],
        where: whereClause,
        _count: { id: true },
      }),

      prisma.botVisit.groupBy({
        by: ['path'],
        where: whereClause,
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 20,
      }),

      prisma.botVisit.findMany({
        where: whereClause,
        orderBy: { timestamp: 'desc' },
        take: 50,
        select: {
          id: true,
          botName: true,
          botCategory: true,
          path: true,
          statusCode: true,
          timestamp: true,
        },
      }),
    ]);

    const response = NextResponse.json({
      success: true,
      summary: {
        totalVisits,
        since: since.toISOString(),
        until: until?.toISOString() || null,
      },
      byBot: byBot.map((b: any) => ({ name: b.botName, count: b._count.id })),
      byCategory: byCategory.map((c: any) => ({ category: c.botCategory, count: c._count.id })),
      topPaths: byPath.map((p: any) => ({ path: p.path, count: p._count.id })),
      recentActivity,
    });

    response.headers.set('Cache-Control', 'private, max-age=120');
    return response;
  } catch (error) {
    console.error('Bot activity API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bot activity data', detail: message },
      { status: 500 }
    );
  }
}
