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

  const response = NextResponse.json({
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

  // Cache overview data for 2 minutes
  response.headers.set('Cache-Control', 'private, max-age=120');

  return response;
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

  const response = NextResponse.json({
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

  // Cache geo data for 5 minutes
  response.headers.set('Cache-Control', 'private, max-age=300');

  return response;
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

  const response = NextResponse.json({
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

  // Cache page analytics for 5 minutes
  response.headers.set('Cache-Control', 'private, max-age=300');

  return response;
}

async function getTrendAnalytics(dateFilter: { gte: Date; lte: Date }) {
  // Optimized: Use parallel aggregated queries instead of per-day queries
  // This reduces 120+ queries to just 4 queries total
  const [visitorsByDay, sessionsByDay, pageViewsByDay, leadsByDay] = await Promise.all([
    // Get all visitors grouped by date in a single query
    prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
      SELECT DATE(lastVisit) as date, COUNT(*) as count
      FROM Visitor
      WHERE lastVisit >= ${dateFilter.gte} AND lastVisit <= ${dateFilter.lte}
      GROUP BY DATE(lastVisit)
      ORDER BY date
    `,
    // Get all sessions grouped by date
    prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
      SELECT DATE(startTime) as date, COUNT(*) as count
      FROM Session
      WHERE startTime >= ${dateFilter.gte} AND startTime <= ${dateFilter.lte}
      GROUP BY DATE(startTime)
      ORDER BY date
    `,
    // Get all page views grouped by date
    prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
      SELECT DATE(timestamp) as date, COUNT(*) as count
      FROM PageView
      WHERE timestamp >= ${dateFilter.gte} AND timestamp <= ${dateFilter.lte}
      GROUP BY DATE(timestamp)
      ORDER BY date
    `,
    // Get all leads grouped by date
    prisma.$queryRaw<Array<{ date: string; count: bigint }>>`
      SELECT DATE(createdAt) as date, COUNT(*) as count
      FROM Lead
      WHERE createdAt >= ${dateFilter.gte} AND createdAt <= ${dateFilter.lte}
      GROUP BY DATE(createdAt)
      ORDER BY date
    `,
  ]);

  // Create lookup maps for O(1) access
  const visitorsMap = new Map(visitorsByDay.map(v => [v.date, Number(v.count)]));
  const sessionsMap = new Map(sessionsByDay.map(s => [s.date, Number(s.count)]));
  const pageViewsMap = new Map(pageViewsByDay.map(p => [p.date, Number(p.count)]));
  const leadsMap = new Map(leadsByDay.map(l => [l.date, Number(l.count)]));

  // Generate all dates in range and merge with data
  const days: string[] = [];
  const current = new Date(dateFilter.gte);
  while (current <= dateFilter.lte) {
    days.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }

  const dailyStats = days.map(date => ({
    date,
    visitors: visitorsMap.get(date) || 0,
    sessions: sessionsMap.get(date) || 0,
    pageViews: pageViewsMap.get(date) || 0,
    leads: leadsMap.get(date) || 0,
  }));

  // Add cache headers for better performance
  const response = NextResponse.json({
    success: true,
    data: {
      daily: dailyStats,
    },
  });

  // Cache for 5 minutes since analytics data doesn't need real-time updates
  response.headers.set('Cache-Control', 'private, max-age=300');

  return response;
}
