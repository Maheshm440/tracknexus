import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const type = searchParams.get('type') || 'overview'; // overview, geo, pages, trends

    // Default to last 30 days
    const startDate = dateFrom ? new Date(dateFrom) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = dateTo ? new Date(dateTo) : new Date();

    const dateFilter = {
      gte: startDate,
      lte: endDate,
    };

    switch (type) {
      case 'overview':
        return await getOverviewAnalytics(dateFilter);
      case 'geo':
        return await getGeoAnalytics(dateFilter);
      case 'pages':
        return await getPageAnalytics(dateFilter);
      case 'trends':
        return await getTrendAnalytics(dateFilter);
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid analytics type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

async function getOverviewAnalytics(dateFilter: { gte: Date; lte: Date }) {
  // Get visitor stats
  const [
    totalVisitors,
    newVisitors,
    totalSessions,
    totalPageViews,
    totalLeads,
    newLeads,
  ] = await Promise.all([
    prisma.visitor.count({
      where: { lastVisit: dateFilter },
    }),
    prisma.visitor.count({
      where: { createdAt: dateFilter },
    }),
    prisma.session.count({
      where: { startTime: dateFilter },
    }),
    prisma.pageView.count({
      where: { timestamp: dateFilter },
    }),
    prisma.lead.count({
      where: { createdAt: dateFilter },
    }),
    prisma.lead.count({
      where: {
        createdAt: dateFilter,
        status: 'NEW',
      },
    }),
  ]);

  // Calculate average session duration
  const sessions = await prisma.session.aggregate({
    where: {
      startTime: dateFilter,
      duration: { not: null },
    },
    _avg: { duration: true },
  });

  // Count bounce sessions (sessions with only 1 page view)
  const bounceSessions = await prisma.session.count({
    where: {
      startTime: dateFilter,
      pageViews: {
        none: {},
      },
    },
  });

  const bounceRate = totalSessions > 0 ? (bounceSessions / totalSessions) * 100 : 0;

  // Lead status breakdown
  const leadsByStatus = await prisma.lead.groupBy({
    by: ['status'],
    where: { createdAt: dateFilter },
    _count: true,
  });

  return NextResponse.json({
    success: true,
    data: {
      visitors: {
        total: totalVisitors,
        new: newVisitors,
      },
      sessions: {
        total: totalSessions,
        avgDuration: Math.round(sessions._avg.duration || 0),
        bounceRate: Math.round(bounceRate * 100) / 100,
      },
      pageViews: totalPageViews,
      leads: {
        total: totalLeads,
        new: newLeads,
        byStatus: leadsByStatus.reduce((acc, item) => {
          acc[item.status] = item._count;
          return acc;
        }, {} as Record<string, number>),
      },
    },
  });
}

async function getGeoAnalytics(dateFilter: { gte: Date; lte: Date }) {
  // Get visitors by country
  const visitorsByCountry = await prisma.visitor.groupBy({
    by: ['country', 'countryCode'],
    where: {
      lastVisit: dateFilter,
      country: { not: null },
    },
    _count: true,
    orderBy: {
      _count: {
        country: 'desc',
      },
    },
    take: 20,
  });

  // Get visitors by city
  const visitorsByCity = await prisma.visitor.groupBy({
    by: ['city', 'country'],
    where: {
      lastVisit: dateFilter,
      city: { not: null },
    },
    _count: true,
    orderBy: {
      _count: {
        city: 'desc',
      },
    },
    take: 20,
  });

  return NextResponse.json({
    success: true,
    data: {
      byCountry: visitorsByCountry.map((item) => ({
        country: item.country,
        countryCode: item.countryCode,
        count: item._count,
      })),
      byCity: visitorsByCity.map((item) => ({
        city: item.city,
        country: item.country,
        count: item._count,
      })),
    },
  });
}

async function getPageAnalytics(dateFilter: { gte: Date; lte: Date }) {
  // Get top pages by views
  const topPages = await prisma.pageView.groupBy({
    by: ['path'],
    where: { timestamp: dateFilter },
    _count: true,
    _avg: {
      timeOnPage: true,
      scrollDepth: true,
    },
    orderBy: {
      _count: {
        path: 'desc',
      },
    },
    take: 20,
  });

  return NextResponse.json({
    success: true,
    data: {
      topPages: topPages.map((item) => ({
        path: item.path,
        views: item._count,
        avgTimeOnPage: Math.round(item._avg.timeOnPage || 0),
        avgScrollDepth: Math.round(item._avg.scrollDepth || 0),
      })),
    },
  });
}

async function getTrendAnalytics(dateFilter: { gte: Date; lte: Date }) {
  // Group by date
  const days: Date[] = [];
  const current = new Date(dateFilter.gte);
  while (current <= dateFilter.lte) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  // Get daily stats
  const dailyStats = await Promise.all(
    days.map(async (day) => {
      const dayStart = new Date(day);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const [visitors, sessions, pageViews, leads] = await Promise.all([
        prisma.visitor.count({
          where: { lastVisit: { gte: dayStart, lte: dayEnd } },
        }),
        prisma.session.count({
          where: { startTime: { gte: dayStart, lte: dayEnd } },
        }),
        prisma.pageView.count({
          where: { timestamp: { gte: dayStart, lte: dayEnd } },
        }),
        prisma.lead.count({
          where: { createdAt: { gte: dayStart, lte: dayEnd } },
        }),
      ]);

      return {
        date: day.toISOString().split('T')[0],
        visitors,
        sessions,
        pageViews,
        leads,
      };
    })
  );

  return NextResponse.json({
    success: true,
    data: {
      daily: dailyStats,
    },
  });
}
