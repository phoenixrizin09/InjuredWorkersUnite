#!/usr/bin/env node

/**
 * Automated Backup Script
 * Creates timestamped backups of critical data and configurations
 * Run: node scripts/backup.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BACKUP_DIR = path.join(__dirname, '../backups');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
const backupPath = path.join(BACKUP_DIR, `backup-${timestamp}`);

console.log('🔄 Starting backup process...\n');

// Create backup directory
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

if (!fs.existsSync(backupPath)) {
  fs.mkdirSync(backupPath, { recursive: true });
}

// Files and directories to backup
const itemsToBackup = [
  'public/data',
  'public/memes',
  'public/sitemap.xml',
  'public/blog-rss.xml',
  'public/oracle-rss.xml',
  'public/alerts-rss.xml',
  'public/.well-known',
  'package.json',
  'package-lock.json',
  'next.config.js',
  '.github/workflows',
  'README.md',
  'QUICK_START.md',
  'TODO.md'
];

let backedUp = 0;
let failed = 0;

itemsToBackup.forEach(item => {
  const sourcePath = path.join(__dirname, '..', item);
  const destPath = path.join(backupPath, item);
  
  try {
    if (fs.existsSync(sourcePath)) {
      // Create parent directory
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // Copy file or directory
      const stats = fs.statSync(sourcePath);
      if (stats.isDirectory()) {
        copyDir(sourcePath, destPath);
        console.log(`  ✓ Backed up directory: ${item}`);
      } else {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`  ✓ Backed up file: ${item}`);
      }
      backedUp++;
    } else {
      console.log(`  ⚠ Skipped (not found): ${item}`);
    }
  } catch (error) {
    console.error(`  ✗ Failed to backup ${item}:`, error.message);
    failed++;
  }
});

// Create backup metadata
const metadata = {
  timestamp: new Date().toISOString(),
  items: backedUp,
  failed: failed,
  node_version: process.version,
  platform: process.platform
};

fs.writeFileSync(
  path.join(backupPath, 'backup-info.json'),
  JSON.stringify(metadata, null, 2)
);

console.log(`\n✅ Backup complete!`);
console.log(`   Location: ${backupPath}`);
console.log(`   Items backed up: ${backedUp}`);
console.log(`   Failed: ${failed}`);

// Clean up old backups (keep last 7)
cleanOldBackups();

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function cleanOldBackups() {
  const backups = fs.readdirSync(BACKUP_DIR)
    .filter(name => name.startsWith('backup-'))
    .sort()
    .reverse();
  
  if (backups.length > 7) {
    console.log(`\n🗑️  Cleaning up old backups...`);
    const toDelete = backups.slice(7);
    
    toDelete.forEach(backup => {
      const backupPath = path.join(BACKUP_DIR, backup);
      fs.rmSync(backupPath, { recursive: true, force: true });
      console.log(`  ✓ Deleted: ${backup}`);
    });
  }
}

console.log('\n💡 Tip: Schedule this script to run daily via cron or Task Scheduler');
console.log('   Windows: schtasks /create /tn "InjuredWorkersBackup" /tr "node scripts/backup.js" /sc daily');
console.log('   Linux/Mac: 0 2 * * * cd /path/to/project && node scripts/backup.js\n');
