#!/usr/bin/env node
/**
 * Further optimize images that exceed 150KB
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const LARGE_IMAGES = [
  '07-workforce-monitoring-software.jpg',
  '14-remote-team-management.jpg',
  '15-distributed-team-productivity.jpg',
  '19-employee-accountability-trust.jpg',
];

async function optimizeLargeImages() {
  const blogImagesDir = path.join(__dirname, '../public/images/blog');

  console.log('Optimizing large images...\n');

  for (const filename of LARGE_IMAGES) {
    const filepath = path.join(blogImagesDir, filename);

    if (!fs.existsSync(filepath)) {
      console.log(`Skipped ${filename} (not found)`);
      continue;
    }

    try {
      const beforeSize = (fs.statSync(filepath).size / 1024).toFixed(1);
      process.stdout.write(`${filename}: ${beforeSize}KB -> `);

      await sharp(filepath)
        .jpeg({ quality: 80, progressive: true, mozjpeg: true })
        .resize(1200, 630, { fit: 'cover', position: 'center' })
        .toFile(filepath + '.tmp');

      fs.renameSync(filepath + '.tmp', filepath);

      const afterSize = (fs.statSync(filepath).size / 1024).toFixed(1);
      console.log(`${afterSize}KB`);

    } catch (error) {
      console.log(`FAILED: ${error.message}`);
    }
  }

  console.log('\nOptimization complete!\n');
}

optimizeLargeImages().catch(console.error);
