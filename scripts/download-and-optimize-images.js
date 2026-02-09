#!/usr/bin/env node
/**
 * Download blog images from Unsplash and optimize them
 * Run: node scripts/download-and-optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Image mappings from blog posts
const IMAGES = {
  "01-productivity-tracker": "1611224923853-80b023f02d71",
  "02-automatic-time-tracking": "1552664730-d307ca884978",
  "03-productivity-tracking-analytics": "1451187580459-43490279c0fa",
  "04-productivity-tracking-tools": "1542744173-8e7e53415bb0",
  "05-employee-productivity-software": "1522071820081-009f0129c71c",
  "06-employee-monitoring-dashboard": "1517245386807-bb43f82c33c4",
  "07-workforce-monitoring-software": "1556761175-b413da4baf72",
  "08-activity-monitoring-reports": "1454165804606-c3d57bc86b40",
  "09-work-analytics-dashboard": "1460925895917-afdab827c52f",
  "10-screen-monitoring-software": "1504868584819-f8e8b4b6d7e3",
  "11-project-time-tracking": "1551288049-bebda4e38f71",
  "12-employee-tracking-software": "1553877522-43269d4ea984",
  "13-team-collaboration-remote": "1600880292203-757bb62b4baf",
  "14-remote-team-management": "1559136555-9303baea8ebd",
  "15-distributed-team-productivity": "1557804506-669a67965ba0",
  "16-work-from-home-productivity": "1531482615713-2afd69097998",
  "17-office-productivity-team": "1521737711867-e3b97375f902",
  "18-time-management-tools": "1519389950473-47ba0277781c",
  "19-employee-accountability-trust": "1556761175-5973dc0f32e7",
  "20-performance-management-analytics": "1531545514256-b1400bc00f31",
  "21-task-management-software": "1552581234-26160f608093",
  "22-team-productivity-software": "1542744094-3a31f272c490",
  "23-productivity-tools-teams": "1507003211169-0a1dd7228f2d",
  "24-billing-time-tracking": "1573497019940-1c28c88b4f3e",
  "25-client-billing-accuracy": "1497215842964-222b430dc094",
  "26-project-profitability-analysis": "1542744094-24638eff58bb",
  "27-roi-tracking-analytics": "1487017159836-4e23ece2e4cf",
  "28-workforce-efficiency-metrics": "1557425955-df376b5903c8",
  "29-business-intelligence-dashboard": "1552664688-cf412ec27db2",
  "30-web-development-workflow": "1498050108023-c5249f4df085",
  "time-tracking-best-practices": "1611224923853-80b023f02d71",
  "employee-monitoring-guide": "1573496359142-b8d87734a5a2",
  "remote-work-productivity-tips": "1587560699334-cc4ff634909a",
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
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

async function downloadImages() {
  const blogImagesDir = path.join(__dirname, '../public/images/blog');

  if (!fs.existsSync(blogImagesDir)) {
    fs.mkdirSync(blogImagesDir, { recursive: true });
  }

  console.log('Downloading blog images from Unsplash...\n');

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const [name, photoId] of Object.entries(IMAGES)) {
    const url = `https://images.unsplash.com/photo-${photoId}?w=1200&h=630&fit=crop&q=80`;
    const filepath = path.join(blogImagesDir, `${name}.jpg`);

    if (fs.existsSync(filepath)) {
      console.log(`Skipped: ${name}.jpg (already exists)`);
      skipped++;
      continue;
    }

    try {
      process.stdout.write(`Downloading ${name}.jpg... `);
      await downloadImage(url, filepath);
      const size = (fs.statSync(filepath).size / 1024).toFixed(1);
      console.log(`OK (${size} KB)`);
      downloaded++;
    } catch (error) {
      console.log(`FAILED: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log(`Location: ${blogImagesDir}\n`);
}

downloadImages().catch(console.error);
