// Test script to debug signup connection issues
console.log('🔍 Debugging signup connection...');

// Test 1: Check if we can reach the backend
async function testBackendConnection() {
  try {
    console.log('📍 Testing backend connection...');
    const response = await fetch('http://localhost:5000/api/health');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend reachable:', data);
      return true;
    } else {
      console.log('❌ Backend responded with error:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    return false;
  }
}

// Test 2: Test signup endpoint
async function testSignupEndpoint() {
  try {
    console.log('📍 Testing signup endpoint...');
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Debug User',
        email: `debug-${Date.now()}@test.com`,
        password: 'password123'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Signup endpoint working:', data);
      return true;
    } else {
      const errorData = await response.json();
      console.log('❌ Signup endpoint error:', errorData);
      return false;
    }
  } catch (error) {
    console.error('❌ Signup endpoint failed:', error.message);
    return false;
  }
}

// Test 3: Check browser info
function checkBrowserInfo() {
  console.log('📍 Browser info:');
  console.log('  User Agent:', navigator.userAgent);
  console.log('  Current URL:', window.location.href);
  console.log('  Origin:', window.location.origin);
}

// Run all tests
async function runDebugTests() {
  checkBrowserInfo();
  
  const backendOk = await testBackendConnection();
  if (!backendOk) {
    console.log('❌ Backend connection failed - stopping tests');
    return;
  }
  
  await testSignupEndpoint();
  
  console.log('\n🎯 Debugging complete!');
  console.log('If you see this, the connection should work.');
  console.log('Try clearing browser cache and refreshing the signup page.');
}

// Auto-run tests
runDebugTests();
