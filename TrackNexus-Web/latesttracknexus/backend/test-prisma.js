const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function testPrisma() {
  console.log('🔍 Testing Prisma connection with PostgreSQL...');

  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Prisma connected to PostgreSQL successfully!');

    // Test creating a user
    console.log('\n🧪 Testing user creation...');
    const testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        password: 'hashedpassword',
        role: 'USER',
      },
    });
    console.log('✅ User created:', testUser.name, testUser.email);

    // Test reading user
    const foundUser = await prisma.user.findUnique({
      where: { id: testUser.id },
      select: { id: true, name: true, email: true, role: true }
    });
    console.log('✅ User retrieved:', foundUser.name);

    // Test creating a lead
    console.log('\n🧪 Testing lead creation...');
    const testLead = await prisma.lead.create({
      data: {
        name: 'Test Lead',
        email: `lead-${Date.now()}@example.com`,
        company: 'Test Company',
        status: 'NEW',
        priority: 'HIGH',
        value: 10000,
        source: 'WEBSITE',
        tags: ['test', 'sample'],
      },
    });
    console.log('✅ Lead created:', testLead.name, testLead.status);

    // Test activity logging
    console.log('\n🧪 Testing activity logging...');
    const testActivity = await prisma.activity.create({
      data: {
        user: testUser.id,
        type: 'LOGIN',
        description: 'Test login activity',
        metadata: { test: true },
      },
    });
    console.log('✅ Activity created:', testActivity.type);

    // Test queries with relations
    console.log('\n🧪 Testing queries with relations...');
    const usersWithLeads = await prisma.user.findMany({
      include: {
        leads: true,
        activities: true,
      },
      take: 5,
    });
    console.log(`✅ Found ${usersWithLeads.length} users with their leads and activities`);

    // Test aggregation
    console.log('\n🧪 Testing aggregation...');
    const leadStats = await prisma.lead.groupBy({
      by: ['status'],
      _count: true,
    });
    console.log('✅ Lead statistics:', leadStats);

    // Clean up test data
    await prisma.activity.delete({ where: { id: testActivity.id } });
    await prisma.lead.delete({ where: { id: testLead.id } });
    await prisma.user.delete({ where: { id: testUser.id } });
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All Prisma tests passed! Backend is ready to use.');
    
    // Show database info
    const userCount = await prisma.user.count();
    const leadCount = await prisma.lead.count();
    const activityCount = await prisma.activity.count();
    
    console.log('\n📊 Database Statistics:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Leads: ${leadCount}`);
    console.log(`   Activities: ${activityCount}`);

  } catch (error) {
    console.error('❌ Prisma test failed:', error.message);
    
    if (error.code === 'P1002') {
      console.log('\n🔧 Database connection issue detected:');
      console.log('1. Make sure PostgreSQL is running');
      console.log('2. Check your DATABASE_URL in .env file');
      console.log('3. Run: npm run db:push to create the database schema');
      console.log('4. Install PostgreSQL: https://www.postgresql.org/download/');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
