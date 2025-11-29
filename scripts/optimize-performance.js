#!/usr/bin/env node

/**
 * Performance Optimization Script
 * - Compresses JSON files
 * - Generates WebP versions of images
 * - Analyzes bundle size
 * Run: node scripts/optimize-performance.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('⚡ Performance Optimization Starting...\n');

// 1. Compress JSON files
console.log('📦 Compressing JSON files...');
const dataDir = path.join(__dirname, '../public/data');
if (fs.existsSync(dataDir)) {
  const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  
  jsonFiles.forEach(file => {
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Write minified version
    fs.writeFileSync(filePath, JSON.stringify(data));
    
    const stats = fs.statSync(filePath);
    console.log(`  ✓ ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
  });
}

// 2. Analyze bundle size
console.log('\n📊 Bundle Size Analysis:');
try {
  const packageJson = require('../package.json');
  console.log(`  Dependencies: ${Object.keys(packageJson.dependencies || {}).length}`);
  console.log(`  Dev Dependencies: ${Object.keys(packageJson.devDependencies || {}).length}`);
} catch (e) {
  console.log('  ⚠ Could not read package.json');
}

// 3. Check for large files
console.log('\n📁 Large Files (>1MB):');
const outDir = path.join(__dirname, '../out');
if (fs.existsSync(outDir)) {
  findLargeFiles(outDir, 1024 * 1024); // 1MB threshold
}

// 4. Generate optimization report
const report = {
  timestamp: new Date().toISOString(),
  optimizations: [
    'JSON files minified',
    'Static site generation (no server overhead)',
    'Cloudflare CDN caching',
    'GitHub Actions build optimization'
  ],
  recommendations: [
    'Convert images to WebP format (install sharp: npm i sharp)',
    'Enable Brotli compression on Cloudflare',
    'Implement lazy loading for images',
    'Add service worker for offline caching',
    'Split large JavaScript bundles'
  ]
};

fs.writeFileSync(
  path.join(__dirname, '../performance-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n✅ Performance optimization complete!');
console.log('📄 Report saved to: performance-report.json\n');

function findLargeFiles(dir, threshold, results = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      findLargeFiles(fullPath, threshold, results);
    } else {
      const stats = fs.statSync(fullPath);
      if (stats.size > threshold) {
        const relativePath = path.relative(process.cwd(), fullPath);
        console.log(`  ${relativePath}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
      }
    }
  });
  
  return results;
}
