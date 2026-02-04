#!/usr/bin/env node
/**
 * Update blog-data.ts with new local image paths
 * Run from project root: node scripts/update-blog-data.js
 */

const fs = require('fs');
const path = require('path');

const imageMap = {
  'photo-1611224923853-80b023f02d71': '/images/blog/01-productivity-tracker.jpg',
  'photo-1552664730-d307ca884978': '/images/blog/02-automatic-time-tracking.jpg',
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

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: ${filePath} not found`);
    process.exit(1);
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  let replacements = 0;

  console.log('🔄 Updating blog-data.ts...\n');

  Object.entries(imageMap).forEach(([photoId, newPath]) => {
    const oldUrl = `https://images.unsplash.com/${photoId}?w=800&h=600&fit=crop`;
    const regex = new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');

    const matches = (content.match(regex) || []).length;
    if (matches > 0) {
      content = content.replace(regex, newPath);
      replacements += matches;
      console.log(`✅ ${photoId}: ${newPath}`);
    }
  });

  fs.writeFileSync(filePath, content);

  console.log(`\n✅ Updated ${replacements} image references!`);
  console.log(`📄 File: ${filePath}\n`);
}

try {
  updateBlogData();
  process.exit(0);
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
