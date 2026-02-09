// Test the signup API directly
const testSignupAPI = async () => {
  try {
    console.log('🧪 Testing signup API...');
    
    const response = await fetch('http://localhost:5000/api/auth/register', {
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
    
    console.log('📍 Response status:', response.status);
    
    const data = await response.json();
    console.log('📍 Response data:', data);
    
    if (response.ok) {
      console.log('✅ Signup API working!');
    } else {
      console.log('❌ Signup API failed:', data);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testSignupAPI();
