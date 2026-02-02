import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface SessionEndRequest {
  sessionId: string;
  duration?: number; // in seconds
  lastPageViewId?: string;
  scrollDepth?: number;
  timeOnPage?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: SessionEndRequest = await request.json();
    const { sessionId, duration, lastPageViewId, scrollDepth, timeOnPage } = body;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID required' },
        { status: 400 }
      );
    }

    // Get session with visitor info
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { visitor: true },
    });

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      );
    }

    // Update session with end time and duration
    await prisma.session.update({
      where: { id: sessionId },
      data: {
        endTime: new Date(),
        duration: duration || null,
      },
    });

    // Update last page view if provided
    if (lastPageViewId && (scrollDepth !== undefined || timeOnPage !== undefined)) {
      await prisma.pageView.update({
        where: { id: lastPageViewId },
        data: {
          scrollDepth: scrollDepth || null,
          timeOnPage: timeOnPage || null,
        },
      });
    }

    // Update visitor's total time on site
    if (duration && session.visitor) {
      await prisma.visitor.update({
        where: { id: session.visitorId },
        data: {
          totalTimeOnSite: { increment: duration },
        },
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Session end tracking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to end session' },
      { status: 500 }
    );
  }
}
