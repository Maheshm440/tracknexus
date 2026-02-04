#!/usr/bin/env node
/**
 * Comprehensive SEO Testing Suite
 * Run: node scripts/seo-test-suite.js
 *
 * Tests:
 * - Image optimization
 * - Meta tags
 * - Schema markup
 * - Accessibility
 * - Performance
 * - Mobile responsiveness
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function pass(test) {
  passedTests++;
  log(colors.green, `✅ PASS: ${test}`);
}

function fail(test, reason) {
  failedTests++;
  log(colors.red, `❌ FAIL: ${test}`);
  if (reason) log(colors.yellow, `   Reason: ${reason}`);
}

function test(name) {
  totalTests++;
  log(colors.cyan, `\n📋 ${name}`);
}

// ==================== IMAGE TESTS ====================
function testImages() {
  log(colors.blue, '\n🖼️  IMAGE OPTIMIZATION TESTS\n');

  const blogImagesDir = path.join(__dirname, '../public/images/blog');

  if (!fs.existsSync(blogImagesDir)) {
    fail('Blog images folder exists', `Folder not found: ${blogImagesDir}`);
    return;
  }

  pass('Blog images folder exists');

  const files = fs.readdirSync(blogImagesDir).filter(f => f.endsWith('.jpg'));

  test('Image files count');
  if (files.length >= 30) {
    pass(`Found ${files.length} images (≥30)`);
  } else {
    fail(`Only ${files.length} images found`, 'Expected ≥30 images');
  }

  test('Image file sizes optimized');
  let oversized = 0;
  files.forEach(file => {
    const filePath = path.join(blogImagesDir, file);
    const size = fs.statSync(filePath).size / 1024; // KB

    if (size > 150) {
      oversized++;
    }
  });

  if (oversized === 0) {
    pass('All images <150KB');
  } else {
    fail(`${oversized} images exceed 150KB`, 'Run optimization script');
  }

  test('WebP versions exist');
  const webpFiles = fs.readdirSync(blogImagesDir).filter(f => f.endsWith('.webp'));
  if (webpFiles.length > 0) {
    pass(`Found ${webpFiles.length} WebP files`);
  } else {
    fail('No WebP files found', 'Run optimization to create WebP versions');
  }

  test('No Unsplash URLs in images');
  const blogDataPath = path.join(__dirname, '../lib/blog-data.ts');
  const blogDataContent = fs.readFileSync(blogDataPath, 'utf-8');
  const unsplashUrls = (blogDataContent.match(/unsplash\.com/g) || []).length;

  if (unsplashUrls === 0) {
    pass('No Unsplash URLs found');
  } else {
    fail(`Found ${unsplashUrls} Unsplash URLs`, 'Replace with local paths');
  }
}

// ==================== META TAGS TESTS ====================
function testMetaTags() {
  log(colors.blue, '\n📝 META TAGS TESTS\n');

  const blogDataPath = path.join(__dirname, '../lib/blog-data.ts');
  const content = fs.readFileSync(blogDataPath, 'utf-8');

  test('Title tags length');
  const titles = content.match(/"seoTitle":\s*"([^"]+)"/g) || [];
  let invalidTitles = 0;

  titles.forEach(title => {
    const length = title.match(/"seoTitle":\s*"([^"]+)"/)[1].length;
    if (length < 30 || length > 60) {
      invalidTitles++;
    }
  });

  if (invalidTitles === 0) {
    pass(`All titles 30-60 chars (${titles.length} titles)`);
  } else {
    fail(`${invalidTitles} titles out of range`, 'Recommended: 30-60 characters');
  }

  test('Meta descriptions');
  const metaDescs = content.match(/"metaDescription":\s*"([^"]+)"/g) || [];
  let invalidDescs = 0;

  metaDescs.forEach(desc => {
    const length = desc.match(/"metaDescription":\s*"([^"]+)"/)[1].length;
    if (length < 120 || length > 160) {
      invalidDescs++;
    }
  });

  if (invalidDescs === 0) {
    pass(`All descriptions 120-160 chars (${metaDescs.length} descriptions)`);
  } else {
    fail(`${invalidDescs} descriptions out of range`, 'Recommended: 120-160 characters');
  }

  test('Alt text quality');
  const altTexts = content.match(/"heroImageAlt":\s*"([^"]+)"/g) || [];
  let shortAlt = 0;

  altTexts.forEach(alt => {
    const text = alt.match(/"heroImageAlt":\s*"([^"]+)"/)[1];
    if (text.length < 30) {
      shortAlt++;
    }
  });

  if (shortAlt === 0) {
    pass(`All alt texts ≥30 chars (${altTexts.length} alt texts)`);
  } else {
    fail(`${shortAlt} alt texts too short`, 'Recommended: ≥30 characters with keywords');
  }
}

// ==================== SCHEMA TESTS ====================
function testSchema() {
  log(colors.blue, '\n🔗 SCHEMA MARKUP TESTS\n');

  const pageFilePath = path.join(__dirname, '../app/blog/[slug]/page.tsx');

  if (!fs.existsSync(pageFilePath)) {
    fail('Blog page file exists', `File not found: ${pageFilePath}`);
    return;
  }

  const pageContent = fs.readFileSync(pageFilePath, 'utf-8');

  test('Article/BlogPosting schema');
  if (pageContent.includes('BlogPosting')) {
    pass('BlogPosting schema found');
  } else if (pageContent.includes('Article')) {
    fail('Using generic Article schema', 'Upgrade to BlogPosting schema for better results');
  } else {
    fail('No article schema found', 'Add BlogPosting schema markup');
  }

  test('FAQ schema');
  if (pageContent.includes('FAQPage') || pageContent.includes('generateFAQSchema')) {
    pass('FAQ schema found');
  } else {
    fail('FAQ schema missing', 'Add FAQ schema markup');
  }

  test('Breadcrumb schema');
  if (pageContent.includes('BreadcrumbList') || pageContent.includes('generateBreadcrumbSchema')) {
    pass('Breadcrumb schema found');
  } else {
    fail('Breadcrumb schema missing', 'Add BreadcrumbList schema markup');
  }

  test('Organization schema');
  if (pageContent.includes('@type": "Organization') || pageContent.includes('organizationSchema')) {
    pass('Organization schema found');
  } else {
    fail('Organization schema missing', 'Add Organization schema markup');
  }
}

// ==================== ACCESSIBILITY TESTS ====================
function testAccessibility() {
  log(colors.blue, '\n♿ ACCESSIBILITY TESTS\n');

  const blogLayoutPath = path.join(__dirname, '../components/blog-layout.tsx');
  const content = fs.readFileSync(blogLayoutPath, 'utf-8');

  test('Next.js Image component usage');
  if (content.includes('import Image from "next/image"')) {
    pass('Using Next.js Image component');
  } else {
    fail('Not using Next.js Image component', 'Replace HTML img tags');
  }

  test('Image alt attributes');
  if (content.includes('alt={') || content.includes('alt=')) {
    pass('Image alt attributes present');
  } else {
    fail('Missing image alt attributes', 'Add alt text to all images');
  }

  test('Semantic HTML');
  if (content.includes('<article') || content.includes('<section')) {
    pass('Semantic HTML tags used');
  } else {
    fail('Not using semantic HTML', 'Use article, section, nav tags');
  }

  test('Heading hierarchy');
  if ((content.includes('<h1') || content.includes('.h1')) && content.includes('<h2')) {
    pass('Proper heading hierarchy');
  } else {
    fail('Improper heading hierarchy', 'Ensure H1 → H2 → H3 structure');
  }
}

// ==================== COMPONENT TESTS ====================
function testComponents() {
  log(colors.blue, '\n⚙️  COMPONENT TESTS\n');

  const blogLayoutPath = path.join(__dirname, '../components/blog-layout.tsx');
  const content = fs.readFileSync(blogLayoutPath, 'utf-8');

  test('BlogLayout component exists');
  if (content.includes('export')) {
    pass('BlogLayout component exported');
  } else {
    fail('BlogLayout not exported', 'Check export statement');
  }

  test('Image optimization props');
  if (content.includes('priority') || content.includes('quality')) {
    pass('Image optimization props found');
  } else {
    fail('Missing optimization props', 'Add priority and quality props');
  }

  test('Responsive sizing');
  if (content.includes('sizes=')) {
    pass('Responsive image sizes defined');
  } else {
    fail('No responsive sizing', 'Add sizes prop for responsive images');
  }
}

// ==================== FILE STRUCTURE TESTS ====================
function testFileStructure() {
  log(colors.blue, '\n📁 FILE STRUCTURE TESTS\n');

  test('Required files exist');
  const requiredFiles = [
    'lib/blog-data.ts',
    'app/blog/page.tsx',
    'app/blog/[slug]/page.tsx',
    'components/blog-layout.tsx',
    'content/blog/posts'
  ];

  let missing = 0;
  requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
      pass(`${file} exists`);
    } else {
      fail(`${file} missing`, `Expected at: ${fullPath}`);
      missing++;
    }
  });

  if (missing === 0) {
    pass('All required files present');
  }

  test('Public images folder structure');
  const publicImagesDir = path.join(__dirname, '../public/images');
  if (fs.existsSync(publicImagesDir)) {
    const subdirs = fs.readdirSync(publicImagesDir);
    pass(`Images folder exists with ${subdirs.length} subdirectories`);
  } else {
    fail('Public images folder missing', 'Create public/images folder');
  }
}

// ==================== SUMMARY ====================
function printSummary() {
  log(colors.blue, '\n' + '='.repeat(50));
  log(colors.blue, 'SEO TEST SUITE SUMMARY');
  log(colors.blue, '='.repeat(50));

  log(colors.cyan, `\nTotal Tests:   ${totalTests}`);
  log(colors.green, `Passed:        ${passedTests}`);
  log(colors.red, `Failed:        ${failedTests}`);

  const percentage = ((passedTests / totalTests) * 100).toFixed(1);
  log(colors.cyan, `Pass Rate:     ${percentage}%`);

  log(colors.blue, '\n' + '='.repeat(50));

  if (failedTests === 0) {
    log(colors.green, '🎉 ALL TESTS PASSED! Your SEO setup is excellent.');
  } else if (failedTests <= 3) {
    log(colors.yellow, '⚠️  A few issues to fix. See above for details.');
  } else {
    log(colors.red, '❌ Multiple issues found. Address them for best results.');
  }

  log(colors.blue, '='.repeat(50) + '\n');

  return failedTests === 0 ? 0 : 1;
}

// ==================== RUN ALL TESTS ====================
function runAllTests() {
  log(colors.cyan, '\n🚀 Starting SEO Test Suite...\n');

  testImages();
  testMetaTags();
  testSchema();
  testAccessibility();
  testComponents();
  testFileStructure();

  const exitCode = printSummary();
  process.exit(exitCode);
}

// Run the test suite
runAllTests();
