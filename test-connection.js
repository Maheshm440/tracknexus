// Test connection from frontend to backend
const testConnection = async () => {
  console.log('🔍 Testing frontend to backend connection...');
  
  try {
    // Test basic connectivity
    const response = await fetch('http://localhost:5000/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is reachable!');
      console.log('Health check response:', data);
      
      // Test signup endpoint
      console.log('\n🧪 Testing signup endpoint...');
      const signupResponse = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: `test-${Date.now()}@example.com`,
          password: 'password123'
        })
      });
      
      if (signupResponse.ok) {
        const signupData = await signupResponse.json();
        console.log('✅ Signup endpoint working!');
        console.log('Signup response:', signupData);
      } else {
        const errorData = await signupResponse.json();
        console.log('❌ Signup endpoint failed:', errorData);
      }
    } else {
      console.log('❌ Backend not reachable');
    }
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n🔧 Connection refused - Backend server may not be running');
      console.log('1. Check if backend server is running on port 5000');
      console.log('2. Run: cd backend && npm run dev');
    }
    
    if (error.message.includes('Failed to fetch')) {
      console.log('\n🔧 Fetch failed - CORS or network issue');
      console.log('1. Check CORS configuration');
      console.log('2. Check if frontend and backend are on same domain');
    }
  }
};

testConnection();
