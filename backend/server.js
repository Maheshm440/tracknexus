const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// SECURITY FIX #4: Load env vars first, before setting defaults
require('dotenv').config();

// Set environment variables if not set
process.env.PORT = process.env.PORT || '5000';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// SECURITY FIX #4: JWT_SECRET now loaded from .env, fail if not set in production
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.error('❌ FATAL: JWT_SECRET not set in production environment!');
  process.exit(1);
}
process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';
process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const leadRoutes = require('./routes/leads');
const analyticsRoutes = require('./routes/analytics');
const activityRoutes = require('./routes/activity');
const visitorRoutes = require('./routes/visitors');

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(limiter);
// SECURITY FIX #15: Environment-specific CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? (process.env.FRONTEND_URL || '').split(',').filter(Boolean)
  : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Prisma Client
const prisma = new PrismaClient();

// Test database connection
prisma.$connect()
  .then(() => console.log('✅ Connected to MongoDB via Prisma'))
  .catch(err => console.error('❌ Prisma connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/visitors', visitorRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'Connected via Prisma'
  });
});

// Dashboard data endpoint
app.get('/api/dashboard', async (req, res) => {
  try {
    const totalLeads = await prisma.lead.count();
    const newLeads = await prisma.lead.count({ where: { status: 'NEW' } });
    const convertedLeads = await prisma.lead.count({ where: { status: 'CONVERTED' } });
    const totalUsers = await prisma.user.count();

    // Get visitor analytics
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

    const leadsByStatus = await prisma.lead.groupBy({
      by: ['status'],
      _count: true
    });

    const recentLeads = await prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        assignedUser: {
          select: { name: true, email: true }
        }
      }
    });

    const recentActivities = await prisma.activity.findMany({
      take: 10,
      orderBy: { timestamp: 'desc' },
      include: {
        userRef: {
          select: { name: true, avatar: true }
        }
      }
    });

    const recentVisitors = await prisma.visitor.findMany({
      orderBy: { lastVisit: 'desc' },
      take: 5,
      select: {
        id: true,
        ipAddress: true,
        userAgent: true,
        referrer: true,
        visitCount: true,
        lastVisit: true
      }
    });

    res.json({
      overview: {
        totalLeads,
        newLeads,
        convertedLeads,
        totalUsers,
        conversionRate: totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0,
        totalVisitors,
        todayVisitors,
        totalPageViews,
        todayPageViews,
        avgPagesPerVisit: totalVisitors > 0 ? (totalPageViews / totalVisitors).toFixed(2) : 0
      },
      charts: {
        leadsByStatus
      },
      recentLeads,
      recentActivities,
      recentVisitors
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// SECURITY FIX #16: Error handling - no stack traces or sensitive info
app.use((err, req, res, next) => {
  // SECURITY FIX #20: Log error without sensitive details
  console.error('Server error:', err.message);

  res.status(err.status || 500).json({
    error: 'Internal server error',
    // Only include error details in development
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
});
