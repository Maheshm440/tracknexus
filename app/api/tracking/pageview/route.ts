import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface PageViewRequest {
  visitorId: string;
  sessionId: string;
  path: string;
  title?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PageViewRequest = await request.json();
    const { visitorId, sessionId, path, title } = body;

    if (!visitorId || !sessionId || !path) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify visitor exists
    const visitor = await prisma.visitor.findUnique({
      where: { id: visitorId },
      select: { id: true },
    });

    if (!visitor) {
      return NextResponse.json(
        { success: false, error: 'Visitor not found' },
        { status: 404 }
      );
    }

    // Verify session exists
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      select: { id: true },
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    // Create page view
    const pageView = await prisma.pageView.create({
      data: {
        sessionId,
        path,
        title,
      },
    });

    // Update visitor's total page views
    await prisma.visitor.update({
      where: { id: visitorId },
      data: {
        totalPageViews: { increment: 1 },
        lastVisit: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      pageViewId: pageView.id,
    });
  } catch (error) {
    console.error('Page view tracking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track page view' },
      { status: 500 }
    );
  }
}
