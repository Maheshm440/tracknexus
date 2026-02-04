const mongoose = require('mongoose');

// Check MongoDB connection with detailed error handling
const checkMongoDB = async () => {
  console.log('🔍 Checking MongoDB connection...');
  
  try {
    // Try different connection strings
    const connectionStrings = [
      'mongodb://localhost:27017/tracknexus',
      'mongodb://127.0.0.1:27017/tracknexus',
      'mongodb://0.0.0.0:27017/tracknexus'
    ];
    
    let connected = false;
    let lastError = null;
    
    for (const connectionString of connectionStrings) {
      try {
        console.log(`🔗 Trying: ${connectionString}`);
        await mongoose.connect(connectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });
        
        console.log('✅ MongoDB connected successfully!');
        console.log(`📊 Database: tracknexus`);
        connected = true;
        break;
      } catch (error) {
        console.log(`❌ Failed: ${error.message}`);
        lastError = error;
        continue;
      }
    }
    
    if (!connected) {
      console.log('\n❌ MongoDB Connection Failed!');
      console.log('\n🔧 Troubleshooting Steps:');
      console.log('1. Make sure MongoDB is installed and running');
      console.log('2. Check if MongoDB service is started');
      console.log('3. Verify MongoDB is on port 27017');
      console.log('4. Try connecting with: mongosh mongodb://localhost:27017');
      console.log('\n💡 Installation Guides:');
      console.log('   Windows: https://www.mongodb.com/docs/manual/installation/');
      console.log('   macOS: brew install mongodb-community');
      console.log('   Linux: sudo apt-get install mongodb');
      console.log('   Docker: docker run -d -p 27017:27017 --name mongodb mongo');
      
      if (lastError) {
        console.log('\n🐛 Last Error Details:', lastError.message);
        if (lastError.code === 'ECONNREFUSED') {
          console.log('   → MongoDB is not running or not accessible');
        }
        if (lastError.code === 'ETIMEDOUT') {
          console.log('   → Connection timeout - check MongoDB service');
        }
      }
      
      process.exit(1);
    }
    
    // Test database operations
    console.log('\n🧪 Testing database operations...');
    const testSchema = new mongoose.Schema({
      test: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('ConnectionTest', testSchema);
    
    const testDoc = new TestModel({ test: 'Connection Test' });
    await testDoc.save();
    console.log('✅ Write test passed!');
    
    const foundDoc = await TestModel.findOne({ test: 'Connection Test' });
    console.log('✅ Read test passed!');
    
    await TestModel.deleteOne({ test: 'Connection Test' });
    console.log('✅ Delete test passed!');
    
    console.log('\n🎉 MongoDB is working perfectly!');
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  }
};

checkMongoDB();
