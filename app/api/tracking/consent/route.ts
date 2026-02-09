import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { lookupIP, getClientIP } from '@/lib/maxmind';

interface ConsentRequest {
  visitorId?: string;
  fingerprint?: string;
  consentGiven: boolean;
  userAgent?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ConsentRequest = await request.json();
    const { visitorId, fingerprint, consentGiven, userAgent } = body;

    // Get client IP for GeoIP lookup
    const clientIP = getClientIP(request.headers);

    // Lookup GeoIP data if consent is given
    let geoData = null;
    if (consentGiven) {
      geoData = await lookupIP(clientIP);
    }

    // Parse user agent for device info
    const deviceInfo = parseUserAgent(userAgent || request.headers.get('user-agent') || '');

    let visitor;

    if (visitorId) {
      // Update existing visitor
      visitor = await prisma.visitor.update({
        where: { id: visitorId },
        data: {
          consentGiven,
          consentTimestamp: consentGiven ? new Date() : null,
          lastVisit: new Date(),
          ...(geoData && {
            country: geoData.country,
            countryCode: geoData.countryCode,
            region: geoData.region,
            city: geoData.city,
            timezone: geoData.timezone,
          }),
        },
      });
    } else if (fingerprint) {
      // Try to find by fingerprint or create new
      visitor = await prisma.visitor.upsert({
        where: { fingerprint },
        update: {
          consentGiven,
          consentTimestamp: consentGiven ? new Date() : null,
          lastVisit: new Date(),
          sessionCount: { increment: 1 },
          ...(geoData && {
            country: geoData.country,
            countryCode: geoData.countryCode,
            region: geoData.region,
            city: geoData.city,
            timezone: geoData.timezone,
          }),
        },
        create: {
          fingerprint,
          consentGiven,
          consentTimestamp: consentGiven ? new Date() : null,
          ...(geoData && {
            country: geoData.country,
            countryCode: geoData.countryCode,
            region: geoData.region,
            city: geoData.city,
            timezone: geoData.timezone,
          }),
        },
      });
    } else {
      // Create new visitor without fingerprint
      visitor = await prisma.visitor.create({
        data: {
          consentGiven,
          consentTimestamp: consentGiven ? new Date() : null,
          ...(geoData && {
            country: geoData.country,
            countryCode: geoData.countryCode,
            region: geoData.region,
            city: geoData.city,
            timezone: geoData.timezone,
          }),
        },
      });
    }

    // Create a new session if consent is given
    let session = null;
    if (consentGiven) {
      const referrer = request.headers.get('referer') || null;
      const url = new URL(request.url);

      session = await prisma.session.create({
        data: {
          visitorId: visitor.id,
          referrer,
          utmSource: url.searchParams.get('utm_source'),
          utmMedium: url.searchParams.get('utm_medium'),
          utmCampaign: url.searchParams.get('utm_campaign'),
          utmTerm: url.searchParams.get('utm_term'),
          utmContent: url.searchParams.get('utm_content'),
          deviceType: deviceInfo.deviceType,
          browser: deviceInfo.browser,
          browserVersion: deviceInfo.browserVersion,
          os: deviceInfo.os,
        },
      });
    }

    return NextResponse.json({
      success: true,
      visitorId: visitor.id,
      sessionId: session?.id || null,
    });
  } catch (error) {
    console.error('Consent tracking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save consent' },
      { status: 500 }
    );
  }
}

function parseUserAgent(userAgent: string): {
  deviceType: string;
  browser: string;
  browserVersion: string;
  os: string;
} {
  let deviceType = 'desktop';
  let browser = 'Unknown';
  let browserVersion = '';
  let os = 'Unknown';

  // Detect device type
  if (/mobile/i.test(userAgent)) {
    deviceType = 'mobile';
  } else if (/tablet|ipad/i.test(userAgent)) {
    deviceType = 'tablet';
  }

  // Detect browser
  if (/chrome/i.test(userAgent) && !/edge|edg/i.test(userAgent)) {
    browser = 'Chrome';
    const match = userAgent.match(/chrome\/(\d+)/i);
    browserVersion = match ? match[1] : '';
  } else if (/firefox/i.test(userAgent)) {
    browser = 'Firefox';
    const match = userAgent.match(/firefox\/(\d+)/i);
    browserVersion = match ? match[1] : '';
  } else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) {
    browser = 'Safari';
    const match = userAgent.match(/version\/(\d+)/i);
    browserVersion = match ? match[1] : '';
  } else if (/edge|edg/i.test(userAgent)) {
    browser = 'Edge';
    const match = userAgent.match(/edg\/(\d+)/i);
    browserVersion = match ? match[1] : '';
  }

  // Detect OS
  if (/windows/i.test(userAgent)) {
    os = 'Windows';
  } else if (/macintosh|mac os/i.test(userAgent)) {
    os = 'macOS';
  } else if (/linux/i.test(userAgent)) {
    os = 'Linux';
  } else if (/android/i.test(userAgent)) {
    os = 'Android';
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    os = 'iOS';
  }

  return { deviceType, browser, browserVersion, os };
}
