const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect } = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all leads
router.get('/', protect, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, search } = req.query;
    const skip = (page - 1) * limit;

    let where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } }
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      include: {
        assignedUser: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: parseInt(skip),
      take: parseInt(limit)
    });

    const total = await prisma.lead.count({ where });

    res.json({
      leads,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create lead
router.post('/', protect, async (req, res) => {
  try {
    const lead = await prisma.lead.create({
      data: req.body,
      include: {
        assignedUser: {
          select: { name: true, email: true }
        }
      }
    });
    
    res.status(201).json({
      message: 'Lead created successfully',
      lead
    });
  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update lead
router.put('/:id', protect, async (req, res) => {
  try {
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: req.body,
      include: {
        assignedUser: {
          select: { name: true, email: true }
        }
      }
    });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json({
      message: 'Lead updated successfully',
      lead
    });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete lead
router.delete('/:id', protect, async (req, res) => {
  try {
    const lead = await prisma.lead.delete({
      where: { id: req.params.id }
    });

    res.json({
      message: 'Lead deleted successfully',
      lead
    });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recent leads
router.get('/recent', protect, async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        assignedUser: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    res.json({ leads });
  } catch (error) {
    console.error('Get recent leads error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
