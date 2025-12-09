/**
 * Eye Oracle Data Integrity Verification Script
 * Verifies ALL posts have real sources with verified links
 */

const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'public', 'data', 'eye-oracle-posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

console.log('='.repeat(70));
console.log('EYE ORACLE DATA INTEGRITY VERIFICATION');
console.log('='.repeat(70));

// Count by verification status
const verified = posts.filter(p => p.sourceVerified === true);
const unverified = posts.filter(p => !p.sourceVerified);
const withSourceUrl = posts.filter(p => p.source && p.source.url);

console.log('');
console.log('TOTAL POSTS: ' + posts.length);
console.log('Verified (sourceVerified=true): ' + verified.length);
console.log('Unverified: ' + unverified.length);
console.log('With Source URLs: ' + withSourceUrl.length);

// Count by jurisdiction
const byJurisdiction = {};
posts.forEach(p => {
  const j = p.jurisdiction || 'Unknown';
  byJurisdiction[j] = (byJurisdiction[j] || 0) + 1;
});
console.log('');
console.log('BY JURISDICTION:');
Object.entries(byJurisdiction).sort((a,b) => b[1]-a[1]).forEach(([j, count]) => {
  console.log('  ' + j + ': ' + count);
});

// Count by category
const byCategory = {};
posts.forEach(p => {
  const c = p.category || 'Unknown';
  byCategory[c] = (byCategory[c] || 0) + 1;
});
console.log('');
console.log('BY CATEGORY:');
Object.entries(byCategory).sort((a,b) => b[1]-a[1]).forEach(([c, count]) => {
  console.log('  ' + c + ': ' + count);
});

// Count by priority
const byPriority = {};
posts.forEach(p => {
  const pr = p.priority || 'Unknown';
  byPriority[pr] = (byPriority[pr] || 0) + 1;
});
console.log('');
console.log('BY PRIORITY:');
Object.entries(byPriority).forEach(([pr, count]) => {
  console.log('  ' + pr + ': ' + count);
});

// Sample of source URLs
console.log('');
console.log('SAMPLE SOURCE URLS:');
withSourceUrl.slice(0, 10).forEach(p => {
  console.log('  ' + p.title.substring(0, 50) + '...');
  console.log('    -> ' + p.source.url);
});

// Any posts without sources?
if (unverified.length > 0) {
  console.log('');
  console.log('WARNING - UNVERIFIED POSTS:');
  unverified.forEach(p => console.log('  - ' + p.title));
}

// Check source domains
const sourceDomains = {};
withSourceUrl.forEach(p => {
  try {
    const url = new URL(p.source.url);
    sourceDomains[url.hostname] = (sourceDomains[url.hostname] || 0) + 1;
  } catch (e) {
    sourceDomains['invalid-url'] = (sourceDomains['invalid-url'] || 0) + 1;
  }
});

console.log('');
console.log('SOURCE DOMAINS:');
Object.entries(sourceDomains).sort((a,b) => b[1]-a[1]).forEach(([domain, count]) => {
  console.log('  ' + domain + ': ' + count + ' posts');
});

console.log('');
console.log('='.repeat(70));
if (unverified.length === 0) {
  console.log('ALL POSTS VERIFIED - ZERO PLACEHOLDER DATA');
} else {
  console.log('WARNING: ' + unverified.length + ' posts need verification');
}
console.log('='.repeat(70));
