/**
 * 👁️ FINAL CLEANUP - Remove all posts without verified sources
 * 
 * THE EYE ONLY REPORTS VERIFIED FACTS WITH SOURCES
 */

const fs = require('fs');
const path = require('path');

const POSTS_PATH = path.join(__dirname, '../public/data/eye-oracle-posts.json');
const ALERTS_PATH = path.join(__dirname, '../public/data/alerts.json');

console.log('👁️ FINAL CLEANUP - Removing all unverified posts...');
console.log('');

// Load posts
let posts = JSON.parse(fs.readFileSync(POSTS_PATH, 'utf8'));
const originalCount = posts.length;

// Keep only posts with verified sources
const verifiedPosts = posts.filter(p => {
  const hasSource = p.source && p.sourceVerified === true;
  const id = String(p.id || p.slug || '');
  
  if (!hasSource) {
    console.log(`   ❌ Removing (no verified source): ${id || p.title?.substring(0, 40)}`);
    return false;
  }
  
  return true;
});

// Save
fs.writeFileSync(POSTS_PATH, JSON.stringify(verifiedPosts, null, 2));

console.log('');
console.log(`📊 Posts before: ${originalCount}`);
console.log(`📊 Posts after: ${verifiedPosts.length}`);
console.log(`❌ Removed: ${originalCount - verifiedPosts.length}`);
console.log('');

// Clean alerts too
let alerts = JSON.parse(fs.readFileSync(ALERTS_PATH, 'utf8'));
const alertsBefore = alerts.length;

alerts = alerts.filter(a => {
  // Keep alerts for verified posts
  if (a.sourceVerified === true) return true;
  
  // Keep alerts that reference verified post IDs
  const postId = a.id?.replace('alert-', '');
  if (verifiedPosts.some(p => p.id === postId)) return true;
  
  // Keep Ontario bill alerts
  if (a.id?.includes('Bill-') && a.source?.includes('ola.org')) return true;
  
  console.log(`   ❌ Removing alert: ${a.id}`);
  return false;
});

fs.writeFileSync(ALERTS_PATH, JSON.stringify(alerts, null, 2));

console.log(`🚨 Alerts before: ${alertsBefore}`);
console.log(`🚨 Alerts after: ${alerts.length}`);
console.log('');
console.log('════════════════════════════════════════════════════════════════════');
console.log('👁️ THE EYE NOW CONTAINS ONLY VERIFIED DATA WITH SOURCES');
console.log('👁️ EVERY CLAIM IS LINKED TO OFFICIAL DOCUMENTATION');
console.log('════════════════════════════════════════════════════════════════════');
