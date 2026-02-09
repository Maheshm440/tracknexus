import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Get CRM dashboard analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    // Default to last 30 days
    const startDate = dateFrom ? new Date(dateFrom) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = dateTo ? new Date(dateTo) : new Date();

    const dateFilter = {
      gte: startDate,
      lte: endDate,
    };

    const [
      totalLeads,
      hotLeads,
      wonLeads,
      totalVisitors,
      totalPageViews,
      openActions,
      leadsByStatus,
    ] = await Promise.all([
      // Total leads in date range
      prisma.lead.count({
        where: { createdAt: dateFilter },
      }),

      // Hot leads (score >= 70)
      prisma.lead.count({
        where: {
          createdAt: dateFilter,
          score: { gte: 70 },
        },
      }),

      // Won leads (CONVERTED status)
      prisma.lead.count({
        where: {
          createdAt: dateFilter,
          status: 'CONVERTED',
        },
      }),

      // Total visitors
      prisma.visitor.count({
        where: { lastVisit: dateFilter },
      }),

      // Total page views
      prisma.pageView.count({
        where: { timestamp: dateFilter },
      }),

      // Open actions (leads not yet CONVERTED or LOST)
      prisma.lead.count({
        where: {
          createdAt: dateFilter,
          status: { in: ['NEW', 'CONTACTED', 'QUALIFIED'] },
        },
      }),

      // Leads by status for pipeline breakdown
      prisma.lead.groupBy({
        by: ['status'],
        where: { createdAt: dateFilter },
        _count: true,
      }),
    ]);

    // Calculate conversion rate
    const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;

    // Build pipeline stages breakdown
    const pipelineStages = leadsByStatus.reduce(
      (acc, item) => {
        acc[item.status] = item._count;
        return acc;
      },
      {} as Record<string, number>
    );

    return NextResponse.json({
      success: true,
      data: {
        metrics: {
          totalLeads,
          hotLeads,
          wonLeads,
          conversionRate: Math.round(conversionRate * 100) / 100,
          totalVisitors,
          totalPageViews,
          openActions,
        },
        pipelineStages,
        dateRange: {
          from: startDate.toISOString(),
          to: endDate.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('CRM dashboard analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch CRM dashboard analytics' },
      { status: 500 }
    );
  }
}
