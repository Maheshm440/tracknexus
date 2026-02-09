const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Set environment variables
process.env.JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production-min-32-characters';
process.env.JWT_EXPIRE = '7d';

const prisma = new PrismaClient();

async function testSignup() {
  console.log('🔍 Testing signup functionality...');
  
  try {
    // Check environment variables
    console.log('📋 Environment Variables:');
    console.log('  JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
    console.log('  JWT_EXPIRE:', process.env.JWT_EXPIRE || '7d');
    console.log('  PORT:', process.env.PORT || '5000');
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected');
    
    // Test user creation
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'password123';
    
    console.log('\n🧪 Creating test user...');
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail }
    });
    
    if (existingUser) {
      console.log('⚠️  Test user already exists, deleting...');
      await prisma.user.delete({ where: { email: testEmail } });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(testPassword, salt);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: testEmail,
        password: hashedPassword,
        role: 'USER'
      }
    });
    
    console.log('✅ User created:', user.email);
    
    // Test JWT generation
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
    
    console.log('✅ JWT token generated');
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ JWT token verified:', decoded.id === user.id);
    
    // Clean up
    await prisma.user.delete({ where: { id: user.id } });
    console.log('✅ Test user cleaned up');
    
    console.log('\n🎉 All signup tests passed!');
    
  } catch (error) {
    console.error('❌ Signup test failed:', error.message);
    
    if (error.message.includes('JWT_SECRET')) {
      console.log('\n🔧 JWT_SECRET issue detected:');
      console.log('1. Make sure .env file exists in backend folder');
      console.log('2. Add: JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-characters');
      console.log('3. Restart the server');
    }
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n🔧 Database connection issue:');
      console.log('1. Make sure SQLite database is accessible');
      console.log('2. Check if dev.db file exists');
      console.log('3. Run: npm run db:push');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testSignup();
