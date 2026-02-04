#!/usr/bin/env node
/**
 * Update blog-data.ts to use local image paths instead of Unsplash URLs
 * Run: node scripts/update-blog-image-paths.js
 */

const fs = require('fs');
const path = require('path');

// Mapping of Unsplash photo IDs to local filenames
const PHOTO_ID_TO_FILE = {
  "1611224923853-80b023f02d71": "01-productivity-tracker",
  "1552664730-d307ca884978": "02-automatic-time-tracking",
  "1451187580459-43490279c0fa": "03-productivity-tracking-analytics",
  "1542744173-8e7e53415bb0": "04-productivity-tracking-tools",
  "1522071820081-009f0129c71c": "05-employee-productivity-software",
  "1517245386807-bb43f82c33c4": "06-employee-monitoring-dashboard",
  "1556761175-b413da4baf72": "07-workforce-monitoring-software",
  "1454165804606-c3d57bc86b40": "08-activity-monitoring-reports",
  "1460925895917-afdab827c52f": "09-work-analytics-dashboard",
  "1504868584819-f8e8b4b6d7e3": "10-screen-monitoring-software",
  "1551288049-bebda4e38f71": "11-project-time-tracking",
  "1553877522-43269d4ea984": "12-employee-tracking-software",
  "1600880292203-757bb62b4baf": "13-team-collaboration-remote",
  "1559136555-9303baea8ebd": "14-remote-team-management",
  "1557804506-669a67965ba0": "15-distributed-team-productivity",
  "1531482615713-2afd69097998": "16-work-from-home-productivity",
  "1521737711867-e3b97375f902": "17-office-productivity-team",
  "1519389950473-47ba0277781c": "18-time-management-tools",
  "1556761175-5973dc0f32e7": "19-employee-accountability-trust",
  "1531545514256-b1400bc00f31": "20-performance-management-analytics",
  "1552581234-26160f608093": "21-task-management-software",
  "1542744094-3a31f272c490": "22-team-productivity-software",
  "1507003211169-0a1dd7228f2d": "23-productivity-tools-teams",
  "1573497019940-1c28c88b4f3e": "24-billing-time-tracking",
  "1497215842964-222b430dc094": "25-client-billing-accuracy",
  "1542744094-24638eff58bb": "26-project-profitability-analysis",
  "1487017159836-4e23ece2e4cf": "27-roi-tracking-analytics",
  "1557425955-df376b5903c8": "28-workforce-efficiency-metrics",
  "1552664688-cf412ec27db2": "29-business-intelligence-dashboard",
  "1498050108023-c5249f4df085": "30-web-development-workflow",
  "1573496359142-b8d87734a5a2": "employee-monitoring-guide",
  "1587560699334-cc4ff634909a": "remote-work-productivity-tips",
};

// Additional photo IDs found in the file
const ADDITIONAL_MAPPINGS = {
  "1553028826-f4804a6dba3b": "05-employee-productivity-software",
  "1543269865-cbf427effbad": "05-employee-productivity-software",
  "1600880292089-90a7e086ee0c": "09-work-analytics-dashboard",
  "1515378791036-0648a3ef77b2": "18-time-management-tools",
  "1585241645927-c7a8e5840c42": "18-time-management-tools",
  "1497366216548-37526070297c": "23-productivity-tools-teams",
  "1507925921958-8a62f3d1a50d": "23-productivity-tools-teams",
  "1573164713988-8665fc963095": "employee-monitoring-guide",
  "1542744173-05336fcc7ad4": "04-productivity-tracking-tools",
  "1484480974693-6ca0a78fb36b": "17-office-productivity-team",
  "1552664730-d307ca884978": "02-automatic-time-tracking",
  "1557425955-df376b5903c8": "28-workforce-efficiency-metrics",
  "1554224155-8d04cb21cd6c": "29-business-intelligence-dashboard",
  "1450101499163-c8848c66ca85": "09-work-analytics-dashboard",
  "1460925895917-afdab827c52f": "09-work-analytics-dashboard",
  "1516321318423-f06f85e504b3": "22-team-productivity-software",
  "1542744173-05336fcc7ad4": "04-productivity-tracking-tools",
  "1504384308090-c894fdcc538d": "10-screen-monitoring-software",
  "1517048676732-d65bc937f952": "11-project-time-tracking",
  "1556761175-4b46a572b786": "07-workforce-monitoring-software",
  "1587440871875-191322ee64b0": "13-team-collaboration-remote",
  "1434626881859-194d67b2b86f": "26-project-profitability-analysis",
  "1496181133206-80ce9b88a853": "30-web-development-workflow",
  "1486406146926-c627a92ad1ab": "20-performance-management-analytics",
  "1593642632559-0c6d3fc62b89": "27-roi-tracking-analytics",
  "1554224155-6726b3ff858f": "29-business-intelligence-dashboard",
  "1560472354-b33ff0c44a43": "15-distributed-team-productivity",
  // Missing images now downloaded
  "1611532736597-de2d4265fba3": "31-automatic-tracking-system",
  "1551434678-e076c223a692": "32-team-productivity-office",
  "1517430816045-df4b7de11d1d": "33-remote-work-management",
  "1521737604893-d14cc237f11d": "34-business-team-meeting",
};

// Merge mappings
const ALL_MAPPINGS = { ...PHOTO_ID_TO_FILE, ...ADDITIONAL_MAPPINGS };

function updateBlogDataFile() {
  const blogDataPath = path.join(__dirname, '../lib/blog-data.ts');
  let content = fs.readFileSync(blogDataPath, 'utf-8');

  console.log('Updating Unsplash URLs to local paths...\n');

  let replacements = 0;
  const seenUrls = new Set();

  // Replace all Unsplash URLs
  content = content.replace(
    /https:\/\/images\.unsplash\.com\/photo-([a-z0-9-]+)\?[^"']*/gi,
    (match, photoId) => {
      const cleanPhotoId = photoId.split('?')[0];
      const fileName = ALL_MAPPINGS[cleanPhotoId];

      if (fileName) {
        const localPath = `/images/blog/${fileName}.jpg`;
        if (!seenUrls.has(match)) {
          console.log(`${cleanPhotoId} -> ${fileName}.jpg`);
          seenUrls.add(match);
          replacements++;
        }
        return localPath;
      } else {
        console.log(`Warning: No mapping for photo ID: ${cleanPhotoId}`);
        return match;
      }
    }
  );

  // Write the updated file
  fs.writeFileSync(blogDataPath, content);

  console.log(`\n=== Summary ===`);
  console.log(`Total replacements: ${replacements}`);
  console.log(`File updated: ${blogDataPath}\n`);
}

updateBlogDataFile();
