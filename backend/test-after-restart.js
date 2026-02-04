// Quick test to verify signup is working
const testSignup = async () => {
  try {
    console.log('🧪 Testing signup after restart...');
    
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
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Signup working after restart!');
      console.log('Response:', data);
    } else {
      const errorData = await response.json();
      console.log('❌ Signup failed:', errorData);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testSignup();
