#!/usr/bin/env node
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

async function generatePasswordHash(password) {
  return await bcrypt.hash(password, 10);
}

async function main() {
  console.log('\n=== TrackNexus Security Credentials Generator ===\n');

  // Generate JWT Secret
  const jwtSecret = generateSecret(64);
  console.log('JWT_SECRET (128 chars):');
  console.log(jwtSecret);
  console.log('');

  // Generate CSRF Secret
  const csrfSecret = generateSecret(64);
  console.log('CSRF_SECRET (128 chars):');
  console.log(csrfSecret);
  console.log('');

  // Generate Admin Password
  rl.question('Enter new admin password (min 12 chars): ', async (password) => {
    if (password.length < 12) {
      console.error('\n❌ Password must be at least 12 characters!');
      process.exit(1);
    }

    const hash = await generatePasswordHash(password);
    console.log('\nADMIN_PASSWORD_HASH:');
    console.log(hash);
    console.log('\n=== SAVE THESE VALUES SECURELY ===');
    console.log('Add them to your .env file or deployment platform secrets.');
    console.log('NEVER commit these values to version control!\n');

    rl.close();
  });
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
