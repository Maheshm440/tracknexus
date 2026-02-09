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

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Signup API working!');
      console.log('Response:', data);
    } else {
      console.log('❌ Signup API failed:', data);
    }
  } catch (error) {
    console.error('❌ API test error:', error.message);
  }
};

testSignupAPI();
