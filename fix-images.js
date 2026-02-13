const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'app', 'marketing', '[slug]', 'page-content.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// 1. Remove _REMOVE_legacyPool2 array
let s = c.indexOf('// REMOVED_LEGACY_POOL2_MARKER_X');
if (s !== -1) {
  let e = c.indexOf('];', s) + 3;
  c = c.substring(0, s) + c.substring(e);
  console.log('1. Removed legacy pool2');
} else {
  console.log('1. Legacy pool2 already removed');
}

// 2. Remove whyChooseImages array
s = c.indexOf('const whyChooseImages = [');
if (s !== -1) {
  let e = c.indexOf('];', s) + 3;
  c = c.substring(0, s) + c.substring(e);
  console.log('2. Removed whyChooseImages');
} else {
  console.log('2. whyChooseImages already removed');
}

fs.writeFileSync(filePath, c, 'utf8');
console.log('Done!');
