import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create test visitors
  const visitors = await Promise.all([
    prisma.visitor.create({
      data: {
        fingerprint: 'fp_visitor_001',
        country: 'United States',
        countryCode: 'US',
        city: 'New York',
        region: 'New York',
        timezone: 'America/New_York',
        consentGiven: true,
        consentTimestamp: new Date(),
        lastVisit: new Date(),
        sessionCount: 5,
        totalPageViews: 25,
        totalTimeOnSite: 1800,
      },
    }),
    prisma.visitor.create({
      data: {
        fingerprint: 'fp_visitor_002',
        country: 'United Kingdom',
        countryCode: 'GB',
        city: 'London',
        region: 'England',
        timezone: 'Europe/London',
        consentGiven: true,
        consentTimestamp: new Date(),
        lastVisit: new Date(),
        sessionCount: 3,
        totalPageViews: 12,
        totalTimeOnSite: 900,
      },
    }),
    prisma.visitor.create({
      data: {
        fingerprint: 'fp_visitor_003',
        country: 'India',
        countryCode: 'IN',
        city: 'Bangalore',
        region: 'Karnataka',
        timezone: 'Asia/Kolkata',
        consentGiven: true,
        consentTimestamp: new Date(),
        lastVisit: new Date(),
        sessionCount: 2,
        totalPageViews: 8,
        totalTimeOnSite: 600,
      },
    }),
    prisma.visitor.create({
      data: {
        fingerprint: 'fp_visitor_004',
        country: 'Germany',
        countryCode: 'DE',
        city: 'Berlin',
        region: 'Berlin',
        timezone: 'Europe/Berlin',
        consentGiven: false,
        lastVisit: new Date(),
        sessionCount: 1,
        totalPageViews: 3,
        totalTimeOnSite: 180,
      },
    }),
    prisma.visitor.create({
      data: {
        fingerprint: 'fp_visitor_005',
        country: 'Canada',
        countryCode: 'CA',
        city: 'Toronto',
        region: 'Ontario',
        timezone: 'America/Toronto',
        consentGiven: true,
        consentTimestamp: new Date(),
        lastVisit: new Date(),
        sessionCount: 4,
        totalPageViews: 18,
        totalTimeOnSite: 1200,
      },
    }),
  ]);

  console.log(`Created ${visitors.length} visitors`);

  // Create sessions for each visitor
  const sessions = await Promise.all(
    visitors.flatMap((visitor) => {
      const sessionCount = Math.floor(Math.random() * 3) + 1;
      return Array.from({ length: sessionCount }).map(() => {
        const startTime = new Date();
        startTime.setHours(startTime.getHours() - Math.floor(Math.random() * 72));
        return prisma.session.create({
          data: {
            visitorId: visitor.id,
            startTime,
            duration: Math.floor(Math.random() * 600) + 30,
            referrer: ['https://google.com', 'https://linkedin.com', 'direct', null][Math.floor(Math.random() * 4)],
            utmSource: ['google', 'linkedin', 'twitter', null][Math.floor(Math.random() * 4)],
            utmMedium: ['cpc', 'organic', 'social', null][Math.floor(Math.random() * 4)],
            utmCampaign: ['spring_sale', 'product_launch', null][Math.floor(Math.random() * 3)],
            deviceType: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
            browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)],
            os: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'][Math.floor(Math.random() * 5)],
          },
        });
      });
    })
  );

  console.log(`Created ${sessions.length} sessions`);

  // Create page views
  const pages = ['/', '/pricing', '/product', '/about', '/contact', '/time-tracking', '/monitoring'];
  const pageViews = await Promise.all(
    sessions.flatMap((session) => {
      const viewCount = Math.floor(Math.random() * 5) + 1;
      return Array.from({ length: viewCount }).map((_, i) => {
        const timestamp = new Date(session.startTime);
        timestamp.setSeconds(timestamp.getSeconds() + i * 30);
        return prisma.pageView.create({
          data: {
            sessionId: session.id,
            path: pages[Math.floor(Math.random() * pages.length)],
            title: 'TrackNexus - Time Tracking Software',
            timestamp,
            timeOnPage: Math.floor(Math.random() * 120) + 10,
            scrollDepth: Math.floor(Math.random() * 100),
          },
        });
      });
    })
  );

  console.log(`Created ${pageViews.length} page views`);

  // Create test leads
  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        visitorId: visitors[0].id,
        name: 'John Smith',
        companyEmail: 'john.smith@techcorp.com',
        companyName: 'Tech Corp',
        companySize: '51-200',
        mobileNumber: '+1-555-0101',
        message: 'Interested in your enterprise plan for our development team',
        formType: 'demo',
        status: 'NEW',
        source: 'google_ads',
      },
    }),
    prisma.lead.create({
      data: {
        visitorId: visitors[1].id,
        name: 'Emma Wilson',
        companyEmail: 'emma.w@startup.io',
        companyName: 'Startup.io',
        companySize: '11-50',
        mobileNumber: '+44-20-1234-5678',
        message: 'Looking for time tracking solution for remote team of 30',
        formType: 'free-trial',
        status: 'CONTACTED',
        source: 'linkedin',
      },
    }),
    prisma.lead.create({
      data: {
        visitorId: visitors[2].id,
        name: 'Raj Patel',
        companyEmail: 'raj@techsolutions.in',
        companyName: 'Tech Solutions India',
        companySize: '51-200',
        mobileNumber: '+91-9876543210',
        message: 'Need pricing for 50+ employees, interested in productivity monitoring',
        formType: 'pricing',
        selectedPlan: 'Professional',
        status: 'QUALIFIED',
        source: 'organic',
      },
    }),
    prisma.lead.create({
      data: {
        visitorId: visitors[3].id,
        name: 'Hans Mueller',
        companyEmail: 'h.mueller@firma.de',
        companyName: 'Firma GmbH',
        companySize: '201-500',
        mobileNumber: '+49-30-1234567',
        message: 'Evaluating time tracking solutions for German market',
        formType: 'demo',
        preferredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        preferredTime: '10:00 AM CET',
        status: 'NEW',
        source: 'direct',
      },
    }),
    prisma.lead.create({
      data: {
        visitorId: visitors[4].id,
        name: 'Sarah Johnson',
        companyEmail: 'sarah.j@bigcompany.ca',
        companyName: 'Big Company Inc',
        companySize: '500+',
        mobileNumber: '+1-416-555-0123',
        message: 'Looking to replace our current employee monitoring solution',
        formType: 'demo',
        status: 'CONVERTED',
        source: 'referral',
      },
    }),
  ]);

  console.log(`Created ${leads.length} leads`);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
