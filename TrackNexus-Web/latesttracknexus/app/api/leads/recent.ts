import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RecentLeadResponse {
  id: string;
  name: string;
  companyName: string;
  status: string;
  score: number;
  createdAt: string;
}

// GET - Get recent leads with pagination support
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get recent leads
    const leads = await prisma.lead.findMany({
      select: {
        id: true,
        name: true,
        companyName: true,
        status: true,
        score: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    });

    // Get total count for pagination
    const total = await prisma.lead.count();

    // Format response
    const formattedLeads: RecentLeadResponse[] = leads.map((lead) => ({
      ...lead,
      createdAt: lead.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: formattedLeads,
      pagination: {
        limit,
        offset,
        total,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Fetch recent leads error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recent leads' },
      { status: 500 }
    );
  }
}
