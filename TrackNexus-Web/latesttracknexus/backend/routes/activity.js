const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect } = require('../middleware/auth');

const prisma = new PrismaClient();

// Log activity
router.post('/', protect, async (req, res) => {
  try {
    const { type, description, metadata = {} } = req.body;
    
    const activity = await prisma.activity.create({
      data: {
        user: req.user.id,
        type,
        description,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.status(201).json({
      message: 'Activity logged successfully',
      activity
    });
  } catch (error) {
    console.error('Log activity error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user activities
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50 } = req.query;

    const activities = await prisma.activity.findMany({
      where: { user: userId },
      orderBy: { timestamp: 'desc' },
      take: parseInt(limit)
    });

    res.json({ activities });
  } catch (error) {
    console.error('Get user activities error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recent activities
router.get('/recent', protect, async (req, res) => {
  try {
    const { limit = 10 } = req.query;

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
    console.error('Get recent activities error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
