const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect } = require('../middleware/auth');

const prisma = new PrismaClient();

// Get dashboard analytics
router.get('/overview', protect, async (req, res) => {
  try {
    const totalLeads = await prisma.lead.count();
    const newLeads = await prisma.lead.count({ where: { status: 'NEW' } });
    const convertedLeads = await prisma.lead.count({ where: { status: 'CONVERTED' } });
    const totalUsers = await prisma.user.count();

    const leadsByStatus = await prisma.lead.groupBy({
      by: ['status'],
      _count: true
    });

    const leadsByPriority = await prisma.lead.groupBy({
      by: ['priority'],
      _count: true
    });

    const leadsBySource = await prisma.lead.groupBy({
      by: ['source'],
      _count: true
    });

    res.json({
      overview: {
        totalLeads,
        newLeads,
        convertedLeads,
        totalUsers,
        conversionRate: totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0
      },
      charts: {
        leadsByStatus,
        leadsByPriority,
        leadsBySource
      }
    });
  } catch (error) {
    console.error('Analytics overview error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get activity feed
router.get('/activity', protect, async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    const activities = await prisma.activity.findMany({
      include: {
        userRef: {
          select: { name: true, avatar: true }
        }
      },
      orderBy: { timestamp: 'desc' },
      take: parseInt(limit)
    });

    res.json({ activities });
  } catch (error) {
    console.error('Activity feed error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get performance metrics
router.get('/performance', protect, async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    let dateFilter = {};
    if (period === '7d') {
      dateFilter = { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
    } else if (period === '30d') {
      dateFilter = { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
    } else if (period === '90d') {
      dateFilter = { createdAt: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } };
    }

    const leadsCreated = await prisma.lead.count({ where: dateFilter });
    const leadsConverted = await prisma.lead.count({ where: { ...dateFilter, status: 'CONVERTED' } });
    
    const avgLeadValue = await prisma.lead.aggregate({
      where: dateFilter,
      _avg: { value: true }
    });

    res.json({
      period,
      metrics: {
        leadsCreated,
        leadsConverted,
        avgLeadValue: avgLeadValue._avg.value || 0,
        conversionRate: leadsCreated > 0 ? ((leadsConverted / leadsCreated) * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    console.error('Performance metrics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
