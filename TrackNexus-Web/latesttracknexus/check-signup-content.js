// Test script to check what's actually being served at /signup
fetch('http://localhost:3000/signup')
  .then(response => response.text())
  .then(html => {
    console.log('📍 HTML content from /signup:');
    console.log(html.substring(0, 1000) + '...');
    
    // Check if signup form is in the HTML
    if (html.includes('Create Account')) {
      console.log('✅ Signup form found in HTML');
    } else {
      console.log('❌ Signup form NOT found in HTML');
    }
    
    if (html.includes('Sign Up')) {
      console.log('✅ "Sign Up" text found in HTML');
    } else {
      console.log('❌ "Sign Up" text NOT found in HTML');
    }
  })
  .catch(error => {
    console.error('❌ Error checking /signup:', error.message);
  });
