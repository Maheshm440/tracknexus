import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { rateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(`bot-visit:${clientIp}`, RateLimitPresets.TRACKING);
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
    }

    const body = await request.json();
    const { botName, botCategory, path, method, userAgent, ip } = body;

    // Validate required fields
    if (!botName || !botCategory || !path) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Map category string to enum value
    const categoryMap: Record<string, 'AI' | 'SEARCH' | 'SOCIAL' | 'OTHER'> = {
      ai: 'AI',
      search: 'SEARCH',
      social: 'SOCIAL',
      other: 'OTHER',
    };

    const enumCategory = categoryMap[botCategory] || 'OTHER';

    await prisma.botVisit.create({
      data: {
        botName,
        botCategory: enumCategory,
        path,
        method: method || 'GET',
        statusCode: 200,
        userAgent: (userAgent || '').slice(0, 1000),
        ip: (ip || 'unknown').slice(0, 45),
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Bot visit tracking error:', error);
    return NextResponse.json({ error: 'Failed to track bot visit' }, { status: 500 });
  }
}
