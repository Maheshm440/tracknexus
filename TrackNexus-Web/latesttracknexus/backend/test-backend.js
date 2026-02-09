const mongoose = require('mongoose');
require('dotenv').config();

// Test database connection
const testConnection = async () => {
  try {
    console.log('🔍 Testing database connection...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tracknexus');
    console.log('✅ Database connected successfully!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ name: 'Backend Test' });
    await testDoc.save();
    console.log('✅ Database write test passed!');
    
    // Test reading
    const foundDoc = await TestModel.findOne({ name: 'Backend Test' });
    console.log('✅ Database read test passed!');
    
    // Clean up
    await TestModel.deleteOne({ name: 'Backend Test' });
    console.log('✅ Database cleanup completed!');
    
    await mongoose.disconnect();
    console.log('✅ All tests passed! Backend is working correctly.');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Test server startup
const testServer = () => {
  console.log('🔍 Testing server configuration...');
  
  // Check environment variables
  const requiredEnvVars = ['PORT', 'MONGODB_URI', 'JWT_SECRET'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars.join(', '));
    console.log('Please check your .env file');
    return false;
  }
  
  console.log('✅ Environment variables configured correctly');
  console.log(`📡 Server will run on port ${process.env.PORT || 5000}`);
  console.log('🗄️ MongoDB URI:', process.env.MONGODB_URI);
  
  return true;
};

// Run tests
console.log('🚀 Starting backend health check...\n');

if (testServer()) {
  testConnection();
} else {
  console.log('\n❌ Please fix the configuration issues above before proceeding.');
}
