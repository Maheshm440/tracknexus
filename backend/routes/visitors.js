const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Track visitor
router.post('/track', async (req, res) => {
  try {
    const { page, userAgent, ip, referrer } = req.body;
    
    // Get or create visitor session
    let visitor = await prisma.visitor.findFirst({
      where: { ipAddress: ip }
    });

    if (!visitor) {
      visitor = await prisma.visitor.create({
        data: {
          ipAddress: ip,
          userAgent: userAgent || '',
          referrer: referrer || '',
          visitCount: 1,
          firstVisit: new Date(),
          lastVisit: new Date()
        }
      });
    } else {
      visitor = await prisma.visitor.update({
        where: { id: visitor.id },
        data: {
          visitCount: visitor.visitCount + 1,
          lastVisit: new Date()
        }
      });
    }

    // Track page visit
    await prisma.pageVisit.create({
      data: {
        visitorId: visitor.id,
        page: page,
        timestamp: new Date(),
        userAgent: userAgent || '',
        ipAddress: ip
      }
    });

    // Update dashboard stats
    await updateDashboardStats();

    res.json({ 
      success: true, 
      visitorId: visitor.id,
      totalVisits: visitor.visitCount 
    });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    res.status(500).json({ error: 'Failed to track visitor' });
  }
});

// Get visitor analytics
router.get('/analytics', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const totalVisitors = await prisma.visitor.count();
    const todayVisitors = await prisma.visitor.count({
      where: {
        lastVisit: {
          gte: today
        }
      }
    });

    const totalPageViews = await prisma.pageVisit.count();
    const todayPageViews = await prisma.pageVisit.count({
      where: {
        timestamp: {
          gte: today
        }
      }
    });

    const topPages = await prisma.pageVisit.groupBy({
      by: ['page'],
      _count: true,
      orderBy: {
        _count: {
          _desc: true
        }
      },
      take: 10
    });

    const recentVisitors = await prisma.visitor.findMany({
      orderBy: { lastVisit: 'desc' },
      take: 10,
      select: {
        id: true,
        ipAddress: true,
        userAgent: true,
        referrer: true,
        visitCount: true,
        firstVisit: true,
        lastVisit: true
      }
    });

    res.json({
      overview: {
        totalVisitors,
        todayVisitors,
        totalPageViews,
        todayPageViews,
        avgPagesPerVisit: totalVisitors > 0 ? (totalPageViews / totalVisitors).toFixed(2) : 0
      },
      topPages,
      recentVisitors
    });
  } catch (error) {
    console.error('Visitor analytics error:', error);
    res.status(500).json({ error: 'Failed to get visitor analytics' });
  }
});

// Update dashboard stats (helper function)
async function updateDashboardStats() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const todayVisitors = await prisma.visitor.count({
      where: {
        lastVisit: {
          gte: today
        }
      }
    });

    const totalPageViews = await prisma.pageVisit.count({
      where: {
        timestamp: {
          gte: today
        }
      }
    });

    // Update or create dashboard stats
    await prisma.dashboardStats.upsert({
      where: { id: 'daily-stats' },
      update: {
        date: today,
        visitors: todayVisitors,
        pageViews: totalPageViews,
        updatedAt: new Date()
      },
      create: {
        id: 'daily-stats',
        date: today,
        visitors: todayVisitors,
        pageViews: totalPageViews,
        updatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error updating dashboard stats:', error);
  }
}

module.exports = router;
