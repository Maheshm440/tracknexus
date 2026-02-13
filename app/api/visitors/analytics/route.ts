import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sinceParam = searchParams.get('since');
    const untilParam = searchParams.get('until');
    const daysParam = searchParams.get('days');

    // Build date range
    let since: Date;
    let until: Date = new Date();

    if (sinceParam) {
      since = new Date(sinceParam);
      if (untilParam) until = new Date(untilParam);
    } else {
      const days = Math.min(parseInt(daysParam || '30'), 3650);
      since = new Date();
      since.setDate(since.getDate() - days);
    }

    const dateFilter = {
      gte: since,
      lte: until,
    };

    // Run all queries in parallel
    const [
      totalVisitors,
      totalSessions,
      totalPageViews,
      sessionsWithDuration,
      singlePageSessions,
      recentActiveSessions,
      topPages,
      visitorsByCountry,
      visitors,
      sessions,
      allSessionsForSources,
    ] = await Promise.all([
      // Unique visitors in date range
      prisma.visitor.count({
        where: { lastVisit: dateFilter },
      }),

      // Total sessions in date range
      prisma.session.count({
        where: { startTime: dateFilter },
      }),

      // Total page views in date range
      prisma.pageView.count({
        where: { timestamp: dateFilter },
      }),

      // Sessions with duration for average calculation
      prisma.session.aggregate({
        where: {
          startTime: dateFilter,
          duration: { not: null },
        },
        _avg: { duration: true },
        _sum: { duration: true },
      }),

      // Single-page sessions (bounce rate)
      prisma.session.count({
        where: {
          startTime: dateFilter,
          pageViews: { none: {} },
        },
      }),

      // Active sessions (started in last 5 minutes, no end time)
      prisma.session.findMany({
        where: {
          startTime: { gte: new Date(Date.now() - 5 * 60 * 1000) },
          endTime: null,
        },
        include: {
          visitor: {
            select: { country: true, countryCode: true, city: true },
          },
          pageViews: {
            orderBy: { timestamp: 'desc' },
            take: 1,
            select: { path: true },
          },
        },
        orderBy: { startTime: 'desc' },
        take: 20,
      }),

      // Top pages by views
      prisma.pageView.groupBy({
        by: ['path'],
        where: { timestamp: dateFilter },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      }),

      // Visitors by country
      prisma.visitor.groupBy({
        by: ['country', 'countryCode'],
        where: {
          lastVisit: dateFilter,
          country: { not: null },
        },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      }),

      // Recent visitors for the visitors tab
      prisma.visitor.findMany({
        where: { lastVisit: dateFilter },
        orderBy: { lastVisit: 'desc' },
        take: 50,
        include: {
          _count: { select: { sessions: true, leads: true } },
        },
      }),

      // Recent sessions for the sessions tab
      prisma.session.findMany({
        where: { startTime: dateFilter },
        orderBy: { startTime: 'desc' },
        take: 50,
        include: {
          visitor: {
            select: { country: true, countryCode: true, city: true, fingerprint: true },
          },
          _count: { select: { pageViews: true } },
        },
      }),

      // All sessions for traffic source analysis
      prisma.session.findMany({
        where: { startTime: dateFilter },
        select: {
          id: true,
          referrer: true,
          utmSource: true,
          utmMedium: true,
          utmCampaign: true,
          visitor: {
            select: {
              _count: { select: { leads: true } },
            },
          },
        },
      }),
    ]);

    // Calculate bounce rate
    const bounceRate = totalSessions > 0
      ? Math.round((singlePageSessions / totalSessions) * 100)
      : 0;

    // Calculate average session duration
    const avgDuration = sessionsWithDuration._avg.duration || 0;

    // Format active sessions for real-time
    const activeSessions = recentActiveSessions.map((s) => ({
      id: s.id,
      country: s.visitor?.country || 'Unknown',
      countryCode: s.visitor?.countryCode || null,
      currentPage: s.pageViews[0]?.path || '/',
      startTime: s.startTime.toISOString(),
    }));

    // Count active visitors (unique visitor IDs in active sessions)
    const activeVisitorIds = new Set(recentActiveSessions.map((s) => s.visitorId));

    // Get top active pages from active sessions
    const activePageCounts: Record<string, number> = {};
    recentActiveSessions.forEach((s) => {
      const page = s.pageViews[0]?.path || '/';
      activePageCounts[page] = (activePageCounts[page] || 0) + 1;
    });
    const topActivePages = Object.entries(activePageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([path, count]) => ({ path, count }));

    // Traffic source analysis
    const trafficSources: Record<string, { visitors: number; sessions: number; leads: number; conversion: number }> = {
      direct: { visitors: 0, sessions: 0, leads: 0, conversion: 0 },
      organic: { visitors: 0, sessions: 0, leads: 0, conversion: 0 },
      social: { visitors: 0, sessions: 0, leads: 0, conversion: 0 },
      paid: { visitors: 0, sessions: 0, leads: 0, conversion: 0 },
      referral: { visitors: 0, sessions: 0, leads: 0, conversion: 0 },
      email: { visitors: 0, sessions: 0, leads: 0, conversion: 0 },
    };

    const socialDomains = ['facebook.com', 'twitter.com', 'linkedin.com', 'instagram.com', 'pinterest.com', 'reddit.com', 'tiktok.com', 'youtube.com'];
    const searchEngines = ['google', 'bing', 'yahoo', 'duckduckgo', 'baidu', 'yandex'];

    const visitorSources = new Map<string, Set<string>>();

    allSessionsForSources.forEach((session) => {
      let source = 'direct';
      const visitorId = session.visitor ? 'visitor' : session.id;
      const leads = session.visitor?._count.leads || 0;

      // Determine source
      if (session.utmSource || session.utmMedium) {
        if (session.utmMedium === 'email') {
          source = 'email';
        } else if (session.utmMedium === 'cpc' || session.utmMedium === 'ppc' || session.utmMedium === 'paid') {
          source = 'paid';
        } else if (session.utmMedium === 'social' || socialDomains.some(d => session.utmSource?.includes(d))) {
          source = 'social';
        } else if (session.utmMedium === 'organic' || searchEngines.some(e => session.utmSource?.includes(e))) {
          source = 'organic';
        } else {
          source = 'referral';
        }
      } else if (session.referrer) {
        try {
          const refUrl = new URL(session.referrer);
          const hostname = refUrl.hostname.toLowerCase();

          if (socialDomains.some(d => hostname.includes(d))) {
            source = 'social';
          } else if (searchEngines.some(e => hostname.includes(e))) {
            source = 'organic';
          } else {
            source = 'referral';
          }
        } catch {
          source = 'direct';
        }
      }

      // Track sessions
      trafficSources[source].sessions++;
      trafficSources[source].leads += leads;

      // Track unique visitors per source
      if (!visitorSources.has(source)) {
        visitorSources.set(source, new Set());
      }
      visitorSources.get(source)!.add(visitorId);
    });

    // Calculate visitors and conversions
    Object.keys(trafficSources).forEach((source) => {
      const stats = trafficSources[source];
      stats.visitors = visitorSources.get(source)?.size || 0;
      stats.conversion = stats.sessions > 0 ? parseFloat(((stats.leads / stats.sessions) * 100).toFixed(2)) : 0;
    });

    // Social media breakdown (for sources that are social)
    const socialBreakdown: Record<string, number> = {
      linkedin: 0,
      twitter: 0,
      facebook: 0,
      instagram: 0,
      other: 0,
    };

    allSessionsForSources.forEach((session) => {
      const ref = session.referrer?.toLowerCase() || session.utmSource?.toLowerCase() || '';
      if (ref.includes('linkedin')) socialBreakdown.linkedin++;
      else if (ref.includes('twitter') || ref.includes('x.com')) socialBreakdown.twitter++;
      else if (ref.includes('facebook')) socialBreakdown.facebook++;
      else if (ref.includes('instagram')) socialBreakdown.instagram++;
      else if (socialDomains.some(d => ref.includes(d))) socialBreakdown.other++;
    });

    const response = NextResponse.json({
      success: true,
      overview: {
        totalVisitors,
        totalSessions,
        totalPageViews,
        avgDuration: Math.round(avgDuration),
        bounceRate,
      },
      realtime: {
        activeVisitors: activeVisitorIds.size,
        activeSessions,
        topActivePages,
      },
      trafficSources,
      socialBreakdown,
      topPages: topPages.map((p) => ({
        path: p.path,
        views: p._count.id,
      })),
      geography: visitorsByCountry.map((g) => ({
        country: g.country || 'Unknown',
        countryCode: g.countryCode || null,
        count: g._count.id,
      })),
      visitors: visitors.map((v) => ({
        id: v.id,
        fingerprint: v.fingerprint,
        country: v.country,
        countryCode: v.countryCode,
        city: v.city,
        totalPageViews: v.totalPageViews,
        totalTimeOnSite: v.totalTimeOnSite,
        sessionCount: v.sessionCount,
        firstVisit: v.firstVisit.toISOString(),
        lastVisit: v.lastVisit.toISOString(),
        leads: v._count.leads,
        sessions: v._count.sessions,
      })),
      sessions: sessions.map((s) => ({
        id: s.id,
        visitorFingerprint: s.visitor?.fingerprint,
        country: s.visitor?.country,
        countryCode: s.visitor?.countryCode,
        city: s.visitor?.city,
        startTime: s.startTime.toISOString(),
        endTime: s.endTime?.toISOString() || null,
        duration: s.duration,
        deviceType: s.deviceType,
        browser: s.browser,
        os: s.os,
        referrer: s.referrer,
        pageViews: s._count.pageViews,
      })),
    });

    response.headers.set('Cache-Control', 'private, max-age=30');
    return response;
  } catch (error) {
    console.error('Visitor analytics API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: 'Failed to fetch visitor analytics', detail: message },
      { status: 500 }
    );
  }
}
