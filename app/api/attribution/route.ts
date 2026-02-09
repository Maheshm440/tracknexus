import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - List attributions with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const source = searchParams.get('source');
    const medium = searchParams.get('medium');
    const campaign = searchParams.get('campaign');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    // Build where clause
    const where: Record<string, unknown> = {};

    if (source) {
      where.source = { contains: source, mode: 'insensitive' };
    }

    if (medium) {
      where.medium = { contains: medium, mode: 'insensitive' };
    }

    if (campaign) {
      where.campaign = { contains: campaign, mode: 'insensitive' };
    }

    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) {
        (where.createdAt as Record<string, unknown>).gte = new Date(dateFrom);
      }
      if (dateTo) {
        (where.createdAt as Record<string, unknown>).lte = new Date(dateTo);
      }
    }

    // Get total count
    const total = await prisma.attribution.count({ where });

    // Get attributions with pagination
    const attributions = await prisma.attribution.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        lead: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
    });

    // Calculate aggregated stats
    const allAttributions = await prisma.attribution.findMany({
      where,
      include: {
        lead: {
          select: {
            status: true,
          },
        },
      },
    });

    const topSources = await prisma.attribution.groupBy({
      by: ['source'],
      where: { source: { not: null } },
      _count: true,
      orderBy: { _count: { source: 'desc' } },
      take: 5,
    });

    const topCampaigns = await prisma.attribution.groupBy({
      by: ['campaign'],
      where: { campaign: { not: null } },
      _count: true,
      orderBy: { _count: { campaign: 'desc' } },
      take: 5,
    });

    const conversions = allAttributions.filter(
      (a) => a.lead?.status === 'CONVERTED'
    ).length;
    const conversionRate =
      allAttributions.length > 0
        ? ((conversions / allAttributions.length) * 100).toFixed(2)
        : '0.00';

    return NextResponse.json({
      success: true,
      data: attributions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalAttributions: total,
        conversions,
        conversionRate: parseFloat(conversionRate),
        topSources: topSources.map((s) => ({
          source: s.source,
          count: s._count,
        })),
        topCampaigns: topCampaigns.map((c) => ({
          campaign: c.campaign,
          count: c._count,
        })),
      },
    });
  } catch (error) {
    console.error('List attributions error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch attributions' },
      { status: 500 }
    );
  }
}

// POST - Create new attribution
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      leadId,
      visitorId,
      source,
      medium,
      campaign,
      term,
      content,
      referrer,
      landingPage,
    } = body;

    // Create the attribution
    const attribution = await prisma.attribution.create({
      data: {
        leadId,
        visitorId,
        source,
        medium,
        campaign,
        term,
        content,
        referrer,
        landingPage,
      },
    });

    return NextResponse.json({
      success: true,
      data: attribution,
    });
  } catch (error) {
    console.error('Create attribution error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create attribution' },
      { status: 500 }
    );
  }
}
