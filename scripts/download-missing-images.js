#!/usr/bin/env node
/**
 * Download the missing blog images
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const MISSING_IMAGES = {
  "31-automatic-tracking-system": "1611532736597-de2d4265fba3",
  "32-team-productivity-office": "1551434678-e076c223a692",
  "33-remote-work-management": "1517430816045-df4b7de11d1d",
  "34-business-team-meeting": "1521737604893-d14cc237f11d",
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadMissingImages() {
  const blogImagesDir = path.join(__dirname, '../public/images/blog');

  console.log('Downloading missing blog images...\n');

  let downloaded = 0;

  for (const [name, photoId] of Object.entries(MISSING_IMAGES)) {
    const url = `https://images.unsplash.com/photo-${photoId}?w=1200&h=630&fit=crop&q=80`;
    const filepath = path.join(blogImagesDir, `${name}.jpg`);

    try {
      process.stdout.write(`Downloading ${name}.jpg... `);
      await downloadImage(url, filepath);
      const size = (fs.statSync(filepath).size / 1024).toFixed(1);
      console.log(`OK (${size} KB)`);
      downloaded++;
    } catch (error) {
      console.log(`FAILED: ${error.message}`);
    }
  }

  console.log(`\nDownloaded: ${downloaded} missing images\n`);
}

downloadMissingImages().catch(console.error);
