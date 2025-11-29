#!/usr/bin/env node

/**
 * Accessibility Enhancement Checker
 * Validates WCAG 2.1 AA compliance and generates fixes
 * Run: node scripts/accessibility-checker.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('♿ Accessibility Checker\n');

const issues = [];
const fixes = [];

// Check 1: Alt text for images
console.log('1️⃣ Checking image alt text...');
const pageFiles = glob.sync('pages/**/*.js');
let totalImages = 0;
pageFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const imgTags = content.match(/<img[^>]+>/g) || [];
  totalImages += imgTags.length;
  imgTags.forEach(tag => {
    if (!tag.includes('alt=')) {
      issues.push({
        severity: 'ERROR',
        file,
        issue: 'Missing alt attribute on image',
        wcag: 'WCAG 2.1 A 1.1.1',
        tag
      });
    } else if (tag.includes('alt=""') && !tag.includes('decorative')) {
      issues.push({
        severity: 'WARNING',
        file,
        issue: 'Empty alt text - ensure image is decorative',
        wcag: 'WCAG 2.1 A 1.1.1',
        tag
      });
    }
  });
});
console.log(`   Found ${totalImages} images across ${pageFiles.length} files\n`);

// Check 2: Heading hierarchy
console.log('2️⃣ Checking heading hierarchy...');
pageFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const headings = content.match(/<h[1-6][^>]*>/g) || [];
  let prevLevel = 0;
  headings.forEach(heading => {
    const level = parseInt(heading.match(/h(\d)/)[1]);
    if (level > prevLevel + 1) {
      issues.push({
        severity: 'WARNING',
        file,
        issue: `Heading skip: h${prevLevel} → h${level}`,
        wcag: 'WCAG 2.1 AAA 2.4.6'
      });
    }
    prevLevel = level;
  });
});
console.log(`   Heading hierarchy validated\n`);

// Check 3: ARIA labels on interactive elements
console.log('3️⃣ Checking ARIA labels...');
pageFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const buttons = content.match(/<button[^>]+>/g) || [];
  buttons.forEach(btn => {
    if (!btn.includes('aria-label') && !btn.includes('>') && !btn.includes('children')) {
      issues.push({
        severity: 'WARNING',
        file,
        issue: 'Button without aria-label or text content',
        wcag: 'WCAG 2.1 A 4.1.2',
        element: btn
      });
    }
  });
});
console.log(`   ARIA attributes checked\n`);

// Check 4: Color contrast (requires manual verification)
console.log('4️⃣ Color contrast notes...');
fixes.push({
  category: 'Color Contrast',
  priority: 'HIGH',
  wcag: 'WCAG 2.1 AA 1.4.3',
  recommendation: 'Verify all text has 4.5:1 contrast ratio (3:1 for large text)',
  tool: 'Use Chrome DevTools Lighthouse or WebAIM Contrast Checker',
  action: 'Manual verification required after deployment'
});
console.log(`   Manual verification required\n`);

// Check 5: Keyboard navigation
console.log('5️⃣ Keyboard navigation...');
fixes.push({
  category: 'Keyboard Navigation',
  priority: 'HIGH',
  wcag: 'WCAG 2.1 A 2.1.1',
  recommendation: 'All interactive elements must be keyboard accessible',
  implementation: 'Ensure tabIndex, focus states, and Enter/Space handlers',
  testing: 'Tab through entire site, verify all actions work without mouse'
});
console.log(`   Keyboard navigation guidelines added\n`);

// Check 6: Focus indicators
console.log('6️⃣ Focus indicators...');
pageFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('outline: none') && !content.includes('focus-visible')) {
    issues.push({
      severity: 'ERROR',
      file,
      issue: 'Removed focus outline without alternative',
      wcag: 'WCAG 2.1 AA 2.4.7',
      fix: 'Use :focus-visible pseudo-class instead'
    });
  }
});
console.log(`   Focus indicators validated\n`);

// Check 7: Semantic HTML
console.log('7️⃣ Semantic HTML...');
fixes.push({
  category: 'Semantic HTML',
  priority: 'MEDIUM',
  wcag: 'WCAG 2.1 A 4.1.1',
  recommendation: 'Use <nav>, <main>, <article>, <aside>, <header>, <footer>',
  benefit: 'Improves screen reader navigation',
  status: 'Review _document.js and major page components'
});
console.log(`   Semantic HTML guidelines added\n`);

// Check 8: Skip links
console.log('8️⃣ Skip navigation links...');
const hasSkipLink = pageFiles.some(file => {
  const content = fs.readFileSync(file, 'utf8');
  return content.includes('skip-to-content') || content.includes('#main-content');
});
if (!hasSkipLink) {
  issues.push({
    severity: 'WARNING',
    file: 'All pages',
    issue: 'Missing "Skip to main content" link',
    wcag: 'WCAG 2.1 A 2.4.1',
    fix: 'Add skip link in Header component'
  });
}
console.log(`   Skip link check complete\n`);

// Generate report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalIssues: issues.length,
    errors: issues.filter(i => i.severity === 'ERROR').length,
    warnings: issues.filter(i => i.severity === 'WARNING').length,
    filesScanned: pageFiles.length
  },
  issues,
  fixes,
  nextSteps: [
    'Fix all ERROR severity issues immediately',
    'Address WARNING issues before production',
    'Test with screen reader (NVDA or JAWS)',
    'Run Lighthouse accessibility audit',
    'Verify keyboard navigation (Tab, Enter, Space, Arrows)',
    'Check color contrast with WebAIM tool',
    'Add skip navigation link',
    'Ensure all forms have labels',
    'Test at 200% zoom',
    'Validate with WAVE browser extension'
  ]
};

fs.writeFileSync(
  path.join(__dirname, '../ACCESSIBILITY_REPORT.json'),
  JSON.stringify(report, null, 2)
);

// Console output
console.log('═══════════════════════════════════════════════════════════');
console.log('ACCESSIBILITY AUDIT RESULTS\n');
console.log(`Files scanned: ${report.summary.filesScanned}`);
console.log(`Errors: ${report.summary.errors}`);
console.log(`Warnings: ${report.summary.warnings}`);
console.log(`Total issues: ${report.summary.totalIssues}\n`);

if (issues.length > 0) {
  console.log('🔴 ISSUES FOUND:\n');
  issues.slice(0, 5).forEach((issue, i) => {
    console.log(`${i + 1}. [${issue.severity}] ${issue.issue}`);
    console.log(`   File: ${path.basename(issue.file)}`);
    console.log(`   WCAG: ${issue.wcag}\n`);
  });
  if (issues.length > 5) {
    console.log(`   ... and ${issues.length - 5} more (see ACCESSIBILITY_REPORT.json)\n`);
  }
}

console.log('📋 RECOMMENDED ENHANCEMENTS:\n');
fixes.forEach((fix, i) => {
  console.log(`${i + 1}. ${fix.category} [${fix.priority}]`);
  console.log(`   ${fix.recommendation}`);
  console.log(`   WCAG: ${fix.wcag}\n`);
});

console.log('═══════════════════════════════════════════════════════════');
console.log('📄 Full report saved: ACCESSIBILITY_REPORT.json');
console.log('♿ Next: Implement fixes and test with assistive technology\n');
