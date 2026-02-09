# Phase 1 Execution Package - Blog Image Optimization
**Status**: Ready to Execute
**Scope**: Download, optimize, and update all 23+ blog images
**Estimated Time**: 2-3 hours
**Expected Score Gain**: +2 SEO points (6.5 → 8.5)

---

## 📋 COMPLETE IMAGE MAPPING

### All 30 Unsplash URLs Found in blog-data.ts:

| # | Blog Post | Unsplash URL | Local Path | Topic |
|---|-----------|--------------|-----------|-------|
| 1 | productivity-tracker | photo-1611224923853-80b023f02d71 | /images/blog/01-productivity-tracker-dashboard.jpg | Productivity |
| 2 | automatic-time-tracking | photo-1552664730-d307ca884978 | /images/blog/02-automatic-time-tracking-interface.jpg | Time Tracking |
| 3 | productivity-tracking-software | photo-1451187580459-43490279c0fa | /images/blog/03-productivity-tracking-analytics.jpg | Software |
| 4 | productivity-tracking-tools | photo-1542744173-8e7e53415bb0 | /images/blog/04-productivity-tracking-tools.jpg | Tools |
| 5 | employee-productivity-tracker-software | photo-1522071820081-009f0129c71c | /images/blog/05-employee-productivity-software.jpg | Employee |
| 6 | employee-monitoring | photo-1517245386807-bb43f82c33c4 | /images/blog/06-employee-monitoring-dashboard.jpg | Monitoring |
| 7 | workforce-monitoring | photo-1556761175-b413da4baf72 | /images/blog/07-workforce-monitoring-software.jpg | Workforce |
| 8 | activity-monitoring | photo-1454165804606-c3d57bc86b40 | /images/blog/08-activity-monitoring-reports.jpg | Activity |
| 9 | work-analytics | photo-1460925895917-afdab827c52f | /images/blog/09-work-analytics-dashboard.jpg | Analytics |
| 10 | screen-monitoring-software | photo-1504868584819-f8e8b4b6d7e3 | /images/blog/10-screen-monitoring-software.jpg | Screen Monitor |
| 11 | project-time-tracking | photo-1551288049-bebda4e38f71 | /images/blog/11-project-time-tracking.jpg | Project |
| 12 | employee-tracking-software | photo-1553877522-43269d4ea984 | /images/blog/12-employee-tracking-software.jpg | Employee Track |
| 13 | team-collaboration | photo-1600880292203-757bb62b4baf | /images/blog/13-team-collaboration-remote.jpg | Collaboration |
| 14 | remote-team-management | photo-1559136555-9303baea8ebd | /images/blog/14-remote-team-management.jpg | Remote Teams |
| 15 | distributed-team-productivity | photo-1557804506-669a67965ba0 | /images/blog/15-distributed-team-productivity.jpg | Distributed |
| 16 | work-from-home-productivity | photo-1531482615713-2afd69097998 | /images/blog/16-work-from-home-productivity.jpg | WFH |
| 17 | office-productivity | photo-1521737711867-e3b97375f902 | /images/blog/17-office-productivity-team.jpg | Office |
| 18 | time-management-tools | photo-1519389950473-47ba0277781c | /images/blog/18-time-management-tools.jpg | Management |
| 19 | employee-accountability | photo-1556761175-5973dc0f32e7 | /images/blog/19-employee-accountability-trust.jpg | Accountability |
| 20 | performance-management | photo-1531545514256-b1400bc00f31 | /images/blog/20-performance-management-analytics.jpg | Performance |
| 21 | task-management | photo-1552581234-26160f608093 | /images/blog/21-task-management-software.jpg | Tasks |
| 22 | team-productivity-software | photo-1542744094-3a31f272c490 | /images/blog/22-team-productivity-software.jpg | Team |
| 23 | productivity-tools-for-teams | photo-1507003211169-0a1dd7228f2d | /images/blog/23-productivity-tools-teams.jpg | Tools Teams |
| 24 | billing-software | photo-1573497019940-1c28c88b4f3e | /images/blog/24-billing-time-tracking.jpg | Billing |
| 25 | client-billing-accuracy | photo-1497215842964-222b430dc094 | /images/blog/25-client-billing-accuracy.jpg | Client |
| 26 | project-profitability | photo-1542744094-24638eff58bb | /images/blog/26-project-profitability-analysis.jpg | Profitability |
| 27 | roi-tracking | photo-1487017159836-4e23ece2e4cf | /images/blog/27-roi-tracking-analytics.jpg | ROI |
| 28 | workforce-efficiency | photo-1557425955-df376b5903c8 | /images/blog/28-workforce-efficiency-metrics.jpg | Efficiency |
| 29 | business-intelligence | photo-1552664688-cf412ec27db2 | /images/blog/29-business-intelligence-dashboard.jpg | BI |
| 30 | web-development-workflow | photo-1498050108023-c5249f4df085 | /images/blog/30-web-development-workflow.jpg | Dev |

### Plus 3 MDX Files:
| File | Current URL | New Path |
|------|-------------|----------|
| time-tracking-best-practices.mdx | photo-1611224923853-80b023f02d71 | /images/blog/time-tracking-best-practices.jpg |
| employee-monitoring-guide.mdx | photo-1573496359142-b8d87734a5a2 | /images/blog/employee-monitoring-guide.jpg |
| remote-work-productivity-tips.mdx | photo-1587560699334-cc4ff634909a | /images/blog/remote-work-productivity-tips.jpg |

---

## 🔧 STEP 1: DOWNLOAD IMAGES

### Using Python Script (Recommended)

**Create**: `scripts/download-blog-images.py`

```python
#!/usr/bin/env python3
"""
Download all blog images from Unsplash and optimize them.
Usage: python scripts/download-blog-images.py
"""

import os
import urllib.request
import urllib.error
from pathlib import Path

# Image mappings: local_name -> unsplash_photo_id
IMAGES = {
    "01-productivity-tracker-dashboard": "photo-1611224923853-80b023f02d71",
    "02-automatic-time-tracking-interface": "photo-1552664730-d307ca884978",
    "03-productivity-tracking-analytics": "photo-1451187580459-43490279c0fa",
    "04-productivity-tracking-tools": "photo-1542744173-8e7e53415bb0",
    "05-employee-productivity-software": "photo-1522071820081-009f0129c71c",
    "06-employee-monitoring-dashboard": "photo-1517245386807-bb43f82c33c4",
    "07-workforce-monitoring-software": "photo-1556761175-b413da4baf72",
    "08-activity-monitoring-reports": "photo-1454165804606-c3d57bc86b40",
    "09-work-analytics-dashboard": "photo-1460925895917-afdab827c52f",
    "10-screen-monitoring-software": "photo-1504868584819-f8e8b4b6d7e3",
    "11-project-time-tracking": "photo-1551288049-bebda4e38f71",
    "12-employee-tracking-software": "photo-1553877522-43269d4ea984",
    "13-team-collaboration-remote": "photo-1600880292203-757bb62b4baf",
    "14-remote-team-management": "photo-1559136555-9303baea8ebd",
    "15-distributed-team-productivity": "photo-1557804506-669a67965ba0",
    "16-work-from-home-productivity": "photo-1531482615713-2afd69097998",
    "17-office-productivity-team": "photo-1521737711867-e3b97375f902",
    "18-time-management-tools": "photo-1519389950473-47ba0277781c",
    "19-employee-accountability-trust": "photo-1556761175-5973dc0f32e7",
    "20-performance-management-analytics": "photo-1531545514256-b1400bc00f31",
    "21-task-management-software": "photo-1552581234-26160f608093",
    "22-team-productivity-software": "photo-1542744094-3a31f272c490",
    "23-productivity-tools-teams": "photo-1507003211169-0a1dd7228f2d",
    "24-billing-time-tracking": "photo-1573497019940-1c28c88b4f3e",
    "25-client-billing-accuracy": "photo-1497215842964-222b430dc094",
    "26-project-profitability-analysis": "photo-1542744094-24638eff58bb",
    "27-roi-tracking-analytics": "photo-1487017159836-4e23ece2e4cf",
    "28-workforce-efficiency-metrics": "photo-1557425955-df376b5903c8",
    "29-business-intelligence-dashboard": "photo-1552664688-cf412ec27db2",
    "30-web-development-workflow": "photo-1498050108023-c5249f4df085",
    # MDX files
    "time-tracking-best-practices": "photo-1611224923853-80b023f02d71",
    "employee-monitoring-guide": "photo-1573496359142-b8d87734a5a2",
    "remote-work-productivity-tips": "photo-1587560699334-cc4ff634909a",
}

# Create public/images/blog folder
blog_images_dir = Path("public/images/blog")
blog_images_dir.mkdir(parents=True, exist_ok=True)

print("📥 Downloading blog images from Unsplash...\n")

for name, photo_id in IMAGES.items():
    # Build download URL (high quality, 1200x630px)
    url = f"https://images.unsplash.com/{photo_id}?w=1200&h=630&fit=crop"
    file_path = blog_images_dir / f"{name}.jpg"

    # Skip if already exists
    if file_path.exists():
        print(f"⏭️  Skipped: {name}.jpg (already exists)")
        continue

    try:
        print(f"⬇️  Downloading: {name}.jpg...", end=" ")

        # Add User-Agent to avoid 403 errors
        request = urllib.request.Request(
            url,
            headers={'User-Agent': 'Mozilla/5.0 (Blog Image Optimizer)'}
        )

        with urllib.request.urlopen(request, timeout=10) as response:
            with open(file_path, 'wb') as out_file:
                out_file.write(response.read())

        file_size = file_path.stat().st_size / 1024  # KB
        print(f"✅ ({file_size:.1f} KB)")

    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error: {e.code}")
    except urllib.error.URLError as e:
        print(f"❌ URL Error: {e.reason}")
    except Exception as e:
        print(f"❌ Error: {e}")

print(f"\n✅ Download complete! Images saved to: {blog_images_dir.absolute()}")
```

**Run it**:
```bash
# Make executable
chmod +x scripts/download-blog-images.py

# Run the script
python scripts/download-blog-images.py
```

---

## ⚙️ STEP 2: OPTIMIZE IMAGES

### Using ImageMagick (Install First)

**Windows** (PowerShell):
```powershell
# Install ImageMagick from https://imagemagick.org/script/download.php
# Or use Chocolatey:
choco install imagemagick
```

**macOS**:
```bash
brew install imagemagick
```

**Linux (Ubuntu)**:
```bash
sudo apt-get install imagemagick
```

### Create Optimization Script

**File**: `scripts/optimize-blog-images.sh`

```bash
#!/bin/bash

# Optimize all blog images for web
# Requirements: ImageMagick, cwebp
# Usage: ./scripts/optimize-blog-images.sh

BLOG_IMG_DIR="public/images/blog"

if [ ! -d "$BLOG_IMG_DIR" ]; then
    echo "❌ Error: $BLOG_IMG_DIR not found"
    exit 1
fi

echo "🔧 Optimizing blog images..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

total=0
optimized=0

for img in "$BLOG_IMG_DIR"/*.jpg; do
    [ -f "$img" ] || break

    filename=$(basename "$img")
    original_size=$(du -h "$img" | cut -f1)

    echo -n "📦 Optimizing: $filename"

    # Optimize JPG with ImageMagick
    convert "$img" \
        -quality 75 \
        -strip \
        -interlace Plane \
        -resize 1200x630 \
        "$img"

    # Create WebP version
    cwebp "$img" -q 75 -o "${img%.jpg}.webp"

    optimized_size=$(du -h "$img" | cut -f1)
    webp_size=$(du -h "${img%.jpg}.webp" | cut -f1)

    echo " ✅ JPG: $original_size → $optimized_size | WebP: $webp_size"

    ((optimized++))
    ((total++))
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Optimization complete! Processed $optimized images."
echo ""
echo "📊 Next steps:"
echo "   1. Verify image quality in browser"
echo "   2. Update blog-data.ts with new paths"
echo "   3. Update MDX files with new paths"
echo "   4. Run: npm run build"
echo "   5. Test with: npm run dev"
```

**Run it**:
```bash
chmod +x scripts/optimize-blog-images.sh
./scripts/optimize-blog-images.sh
```

---

## 🔄 STEP 3: UPDATE blog-data.ts

### Automated Update Script

**File**: `scripts/update-blog-data.js`

```javascript
#!/usr/bin/env node
/**
 * Update blog-data.ts with new local image paths
 * Usage: node scripts/update-blog-data.js
 */

const fs = require('fs');
const path = require('path');

// Mapping of Unsplash photo IDs to local paths
const imageMap = {
  'photo-1611224923853-80b023f02d71': '/images/blog/01-productivity-tracker-dashboard.jpg',
  'photo-1552664730-d307ca884978': '/images/blog/02-automatic-time-tracking-interface.jpg',
  'photo-1451187580459-43490279c0fa': '/images/blog/03-productivity-tracking-analytics.jpg',
  'photo-1542744173-8e7e53415bb0': '/images/blog/04-productivity-tracking-tools.jpg',
  'photo-1522071820081-009f0129c71c': '/images/blog/05-employee-productivity-software.jpg',
  'photo-1517245386807-bb43f82c33c4': '/images/blog/06-employee-monitoring-dashboard.jpg',
  'photo-1556761175-b413da4baf72': '/images/blog/07-workforce-monitoring-software.jpg',
  'photo-1454165804606-c3d57bc86b40': '/images/blog/08-activity-monitoring-reports.jpg',
  'photo-1460925895917-afdab827c52f': '/images/blog/09-work-analytics-dashboard.jpg',
  'photo-1504868584819-f8e8b4b6d7e3': '/images/blog/10-screen-monitoring-software.jpg',
  'photo-1551288049-bebda4e38f71': '/images/blog/11-project-time-tracking.jpg',
  'photo-1553877522-43269d4ea984': '/images/blog/12-employee-tracking-software.jpg',
  'photo-1600880292203-757bb62b4baf': '/images/blog/13-team-collaboration-remote.jpg',
  'photo-1559136555-9303baea8ebd': '/images/blog/14-remote-team-management.jpg',
  'photo-1557804506-669a67965ba0': '/images/blog/15-distributed-team-productivity.jpg',
  'photo-1531482615713-2afd69097998': '/images/blog/16-work-from-home-productivity.jpg',
  'photo-1521737711867-e3b97375f902': '/images/blog/17-office-productivity-team.jpg',
  'photo-1519389950473-47ba0277781c': '/images/blog/18-time-management-tools.jpg',
  'photo-1556761175-5973dc0f32e7': '/images/blog/19-employee-accountability-trust.jpg',
  'photo-1531545514256-b1400bc00f31': '/images/blog/20-performance-management-analytics.jpg',
  'photo-1552581234-26160f608093': '/images/blog/21-task-management-software.jpg',
  'photo-1542744094-3a31f272c490': '/images/blog/22-team-productivity-software.jpg',
  'photo-1507003211169-0a1dd7228f2d': '/images/blog/23-productivity-tools-teams.jpg',
  'photo-1573497019940-1c28c88b4f3e': '/images/blog/24-billing-time-tracking.jpg',
  'photo-1497215842964-222b430dc094': '/images/blog/25-client-billing-accuracy.jpg',
  'photo-1542744094-24638eff58bb': '/images/blog/26-project-profitability-analysis.jpg',
  'photo-1487017159836-4e23ece2e4cf': '/images/blog/27-roi-tracking-analytics.jpg',
  'photo-1557425955-df376b5903c8': '/images/blog/28-workforce-efficiency-metrics.jpg',
  'photo-1552664688-cf412ec27db2': '/images/blog/29-business-intelligence-dashboard.jpg',
  'photo-1498050108023-c5249f4df085': '/images/blog/30-web-development-workflow.jpg',
};

function updateBlogData() {
  const filePath = path.join(__dirname, '../lib/blog-data.ts');
  let content = fs.readFileSync(filePath, 'utf-8');

  let replacements = 0;

  // Replace all Unsplash URLs
  Object.entries(imageMap).forEach(([photoId, newPath]) => {
    // Create regex to find the Unsplash URL
    const unsplashUrl = `https://images.unsplash.com/${photoId}?w=800&h=600&fit=crop`;
    const regex = new RegExp(unsplashUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');

    const matches = content.match(regex) || [];
    if (matches.length > 0) {
      content = content.replace(regex, newPath);
      replacements += matches.length;
      console.log(`✅ Replaced: ${photoId} (${matches.length} occurrence(s))`);
    }
  });

  // Write updated content
  fs.writeFileSync(filePath, content);

  console.log(`\n✅ Update complete! Made ${replacements} replacements.`);
  console.log(`📄 File updated: ${filePath}`);
}

try {
  updateBlogData();
  process.exit(0);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
```

**Run it**:
```bash
node scripts/update-blog-data.js
```

---

## 📝 STEP 4: UPDATE MDX FILES

### Manual Updates Needed

**File**: `content/blog/posts/time-tracking-best-practices.mdx`

**Find**:
```yaml
coverImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=630&fit=crop"
```

**Replace with**:
```yaml
coverImage: "/images/blog/time-tracking-best-practices.jpg"
```

---

**File**: `content/blog/posts/employee-monitoring-guide.mdx`

**Find**:
```yaml
coverImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=630&fit=crop"
```

**Replace with**:
```yaml
coverImage: "/images/blog/employee-monitoring-guide.jpg"
```

---

**File**: `content/blog/posts/remote-work-productivity-tips.mdx`

**Find**:
```yaml
coverImage: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1200&h=630&fit=crop"
```

**Replace with**:
```yaml
coverImage: "/images/blog/remote-work-productivity-tips.jpg"
```

---

## 🖼️ STEP 5: UPDATE IMAGE COMPONENT

**File**: `components/blog-layout.tsx`

**Find the image rendering code and update**:

```typescript
// BEFORE ❌
<img
  src={post.heroImage}
  alt={post.heroImageAlt}
  style={{width: '100%', height: 'auto'}}
/>

// AFTER ✅
import Image from "next/image"

<Image
  src={post.heroImage}
  alt={post.heroImageAlt}
  width={1200}
  height={630}
  priority={true}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
  quality={85}
  className="w-full h-auto rounded-lg shadow-lg"
/>
```

---

## ✅ STEP 6: VALIDATION

### Create Validation Script

**File**: `scripts/validate-images.js`

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const blogDataPath = path.join(__dirname, '../lib/blog-data.ts');
const blogImagesDir = path.join(__dirname, '../public/images/blog');

console.log('🔍 Validating blog images...\n');

let issues = 0;

// 1. Check for remaining Unsplash URLs
const content = fs.readFileSync(blogDataPath, 'utf-8');
const unsplashUrls = content.match(/https:\/\/images\.unsplash\.com\/[^"]+/g) || [];

if (unsplashUrls.length > 0) {
  console.log(`❌ Found ${unsplashUrls.length} remaining Unsplash URLs:`);
  unsplashUrls.forEach(url => {
    console.log(`   - ${url.substring(0, 80)}...`);
    issues++;
  });
}

// 2. Check that local images exist
const localImages = (content.match(/\/images\/blog\/[^"]+\.jpg/g) || []);
console.log(`\n📋 Checking ${localImages.length} local image references...`);

localImages.forEach(imagePath => {
  const fullPath = path.join(__dirname, '..', imagePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ Missing image: ${imagePath}`);
    issues++;
  }
});

// 3. Check image file sizes
console.log('\n📊 Image file sizes:');
const files = fs.readdirSync(blogImagesDir).filter(f => f.endsWith('.jpg'));
let totalSize = 0;
let oversized = 0;

files.forEach(file => {
  const filePath = path.join(blogImagesDir, file);
  const size = fs.statSync(filePath).size / 1024; // KB
  totalSize += size;

  if (size > 150) {
    console.log(`⚠️  ${file}: ${size.toFixed(1)} KB (should be <150KB)`);
    oversized++;
  } else {
    console.log(`✅ ${file}: ${size.toFixed(1)} KB`);
  }
});

console.log(`\n📈 Summary:`);
console.log(`   Total images: ${files.length}`);
console.log(`   Total size: ${(totalSize / 1024).toFixed(2)} MB`);
console.log(`   Oversized: ${oversized}`);
console.log(`   Issues found: ${issues}`);

if (issues === 0 && oversized === 0) {
  console.log('\n✅ All validations passed!');
  process.exit(0);
} else {
  console.log('\n⚠️  Please fix issues above.');
  process.exit(1);
}
```

**Run it**:
```bash
node scripts/validate-images.js
```

---

## 🚀 COMPLETE EXECUTION CHECKLIST

### Phase 1: Download & Optimize

- [ ] **Step 1**: Run download script
  ```bash
  python scripts/download-blog-images.py
  ```
  Expected: 33 images downloaded (~2MB total)

- [ ] **Step 2**: Optimize images
  ```bash
  ./scripts/optimize-blog-images.sh
  ```
  Expected: Images compressed to ~100-130KB each

- [ ] **Step 3**: Update blog-data.ts
  ```bash
  node scripts/update-blog-data.js
  ```
  Expected: 30 Unsplash URLs replaced

- [ ] **Step 4**: Manually update MDX files (3 files, 2 min)
  - time-tracking-best-practices.mdx
  - employee-monitoring-guide.mdx
  - remote-work-productivity-tips.mdx

- [ ] **Step 5**: Update blog-layout.tsx component
  - Replace img tag with Next.js Image component

- [ ] **Step 6**: Validate changes
  ```bash
  node scripts/validate-images.js
  ```
  Expected: All validations pass

### Phase 2: Testing & Verification

- [ ] **Build project**
  ```bash
  npm run build
  ```
  Expected: No errors

- [ ] **Run dev server**
  ```bash
  npm run dev
  ```
  Expected: Blog loads without errors

- [ ] **Visual inspection**
  - Visit http://localhost:3000/blog
  - Check all images load properly
  - Images should be sharp and clear
  - No broken image errors

- [ ] **Mobile testing**
  - Open DevTools (F12)
  - Device Toolbar (Ctrl+Shift+M)
  - Test on mobile (375px width)
  - Images should display correctly

- [ ] **Performance testing**
  ```bash
  # Using Lighthouse in Chrome DevTools
  1. Press F12 to open DevTools
  2. Go to "Lighthouse" tab
  3. Click "Analyze page load"
  4. Check Performance score
  Expected: >80 (up from ~60)
  ```

### Phase 3: Monitoring

- [ ] **Core Web Vitals Test**
  - Visit: https://pagespeed.web.dev/
  - Enter your blog URL
  - Check LCP score
  Expected: <2.5s (green)

- [ ] **Mobile Friendly Test**
  - Visit: https://search.google.com/test/mobile-friendly
  - Enter your blog URL
  Expected: Mobile friendly ✓

- [ ] **Rich Results Test**
  - Visit: https://search.google.com/test/rich-results
  - Enter your blog URL
  Expected: No errors

---

## 📊 EXPECTED RESULTS

### Before Optimization:
```
LCP: 2.5-3.5 seconds ❌
Total image size: ~2MB
Performance score: 60
SEO score: 6.5/10
```

### After Optimization:
```
LCP: 1.2-1.8 seconds ✅
Total image size: ~3.5MB (with WebP: ~2.1MB)
Performance score: 85-90 ✅
SEO score: 8-8.5/10 ✅
```

---

## ⚠️ TROUBLESHOOTING

### Images not downloading?
```bash
# Check internet connection
ping images.unsplash.com

# If still failing, download manually:
# Go to https://unsplash.com and download each image
# Save to public/images/blog/ folder
```

### Optimization failing?
```bash
# Verify ImageMagick is installed
convert --version

# If not installed:
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: sudo apt-get install imagemagick
```

### Build errors?
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

---

## 📋 QUICK REFERENCE COMMANDS

```bash
# Complete Phase 1 in one go:
python scripts/download-blog-images.py && \
./scripts/optimize-blog-images.sh && \
node scripts/update-blog-data.js && \
node scripts/validate-images.js && \
npm run build && \
npm run dev

# Or step by step:
python scripts/download-blog-images.py    # 5-10 min
./scripts/optimize-blog-images.sh         # 2-3 min
node scripts/update-blog-data.js          # <1 min
# Manually update 3 MDX files             # 2 min
# Manually update blog-layout.tsx          # 5 min
node scripts/validate-images.js           # <1 min
npm run build                             # 1-2 min
npm run dev                               # 1 min

# Total: ~30-45 minutes
```

---

## 🎯 SUCCESS CRITERIA

✅ All 33 blog images downloaded locally
✅ All images optimized to <150KB
✅ WebP versions created for all images
✅ blog-data.ts updated with local paths
✅ 3 MDX files updated with local paths
✅ Image component using Next.js Image
✅ npm run build succeeds
✅ npm run dev runs without errors
✅ Blog page loads without broken images
✅ Lighthouse Performance score >85
✅ LCP <2.5 seconds
✅ SEO score improved to 8+/10

---

**Next Step**: Follow the execution checklist above to complete Phase 1!

