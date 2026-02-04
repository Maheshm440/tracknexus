#!/usr/bin/env node
/**
 * Generate WebP versions of blog images using Next.js sharp
 * Run: node scripts/generate-webp.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateWebP() {
  const blogImagesDir = path.join(__dirname, '../public/images/blog');

  if (!fs.existsSync(blogImagesDir)) {
    console.log('Error: Blog images directory not found');
    return;
  }

  const files = fs.readdirSync(blogImagesDir).filter(f => f.endsWith('.jpg'));

  console.log(`Converting ${files.length} images to WebP format...\n`);

  let converted = 0;
  let optimized = 0;
  let failed = 0;

  for (const file of files) {
    const jpgPath = path.join(blogImagesDir, file);
    const webpPath = path.join(blogImagesDir, file.replace('.jpg', '.webp'));
    const fileName = file.replace('.jpg', '');

    try {
      const jpgSize = fs.statSync(jpgPath).size / 1024;
      process.stdout.write(`${fileName}: `);

      // If JPG is over 150KB, optimize it first
      if (jpgSize > 150) {
        await sharp(jpgPath)
          .jpeg({ quality: 85, progressive: true })
          .resize(1200, 630, { fit: 'cover' })
          .toFile(jpgPath + '.tmp');

        fs.renameSync(jpgPath + '.tmp', jpgPath);
        const newJpgSize = fs.statSync(jpgPath).size / 1024;
        process.stdout.write(`JPG ${jpgSize.toFixed(1)}KB -> ${newJpgSize.toFixed(1)}KB, `);
        optimized++;
      }

      // Generate WebP version
      await sharp(jpgPath)
        .webp({ quality: 85 })
        .toFile(webpPath);

      const webpSize = fs.statSync(webpPath).size / 1024;
      console.log(`WebP ${webpSize.toFixed(1)}KB`);
      converted++;

    } catch (error) {
      console.log(`FAILED: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Converted to WebP: ${converted}`);
  console.log(`Optimized JPG: ${optimized}`);
  console.log(`Failed: ${failed}\n`);
}

generateWebP().catch(console.error);
