#!/usr/bin/env node

/**
 * Security Audit Script
 * Scans for common security issues
 * Run: node scripts/security-audit.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔐 Security Audit Starting...\n');

const issues = [];
const warnings = [];
const passed = [];

// Check 1: Scan for exposed API keys
console.log('1️⃣ Checking for exposed API keys...');
const sensitivePatterns = [
  /api[_-]?key['"]?\s*[:=]\s*['"]\w+/gi,
  /secret['"]?\s*[:=]\s*['"]\w+/gi,
  /password['"]?\s*[:=]\s*['"]\w+/gi,
  /token['"]?\s*[:=]\s*['"]\w+/gi,
  /Bearer\s+[A-Za-z0-9\-._~+\/]+=*/gi
];

const filesToScan = glob.sync('**/*.{js,jsx,ts,tsx,json,env}', {
  ignore: ['node_modules/**', 'out/**', '.next/**', 'backups/**']
});

let keysFound = false;
filesToScan.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  sensitivePatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      // Exclude common false positives
      const filtered = matches.filter(m => 
        !m.includes('process.env') && 
        !m.includes('YOUR_API_KEY') &&
        !m.includes('example.com')
      );
      if (filtered.length > 0) {
        issues.push({
          severity: 'CRITICAL',
          file,
          issue: 'Potential exposed API key or secret',
          matches: filtered,
          fix: 'Move to environment variables (process.env.API_KEY)'
        });
        keysFound = true;
      }
    }
  });
});

if (!keysFound) {
  passed.push('No exposed API keys found');
  console.log('   ✓ No exposed API keys found\n');
} else {
  console.log('   ✗ Found potential exposed keys\n');
}

// Check 2: Verify .gitignore
console.log('2️⃣ Checking .gitignore configuration...');
const gitignorePath = path.join(__dirname, '../.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignore = fs.readFileSync(gitignorePath, 'utf8');
  const requiredEntries = ['.env', '.env.local', 'node_modules', '.next'];
  const missing = requiredEntries.filter(entry => !gitignore.includes(entry));
  
  if (missing.length > 0) {
    warnings.push({
      severity: 'WARNING',
      issue: '.gitignore missing important entries',
      missing,
      fix: 'Add these entries to .gitignore'
    });
    console.log(`   ⚠ Missing entries: ${missing.join(', ')}\n`);
  } else {
    passed.push('.gitignore properly configured');
    console.log('   ✓ .gitignore properly configured\n');
  }
} else {
  issues.push({
    severity: 'HIGH',
    issue: '.gitignore file not found',
    fix: 'Create .gitignore file'
  });
  console.log('   ✗ .gitignore not found\n');
}

// Check 3: Security headers
console.log('3️⃣ Checking security headers...');
const headersPath = path.join(__dirname, '../public/_headers');
if (fs.existsSync(headersPath)) {
  const headers = fs.readFileSync(headersPath, 'utf8');
  const requiredHeaders = [
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'Content-Security-Policy'
  ];
  
  const missing = requiredHeaders.filter(h => !headers.includes(h));
  if (missing.length > 0) {
    warnings.push({
      severity: 'MEDIUM',
      issue: 'Missing security headers',
      missing,
      fix: 'Add headers to public/_headers'
    });
    console.log(`   ⚠ Missing headers: ${missing.join(', ')}\n`);
  } else {
    passed.push('Security headers configured');
    console.log('   ✓ Security headers configured\n');
  }
} else {
  warnings.push({
    severity: 'MEDIUM',
    issue: 'No _headers file found',
    fix: 'Create public/_headers with security headers'
  });
  console.log('   ⚠ No _headers file found\n');
}

// Check 4: Dependencies vulnerabilities
console.log('4️⃣ Checking for known vulnerabilities...');
console.log('   ℹ Run "npm audit" for detailed vulnerability report\n');
passed.push('Manual npm audit required');

// Check 5: HTTPS enforcement
console.log('5️⃣ Checking HTTPS enforcement...');
if (fs.existsSync(headersPath)) {
  const headers = fs.readFileSync(headersPath, 'utf8');
  if (headers.includes('Strict-Transport-Security')) {
    passed.push('HTTPS enforcement via HSTS');
    console.log('   ✓ HSTS header configured\n');
  } else {
    warnings.push({
      severity: 'MEDIUM',
      issue: 'HSTS header not configured',
      fix: 'Add Strict-Transport-Security header'
    });
    console.log('   ⚠ HSTS not configured\n');
  }
}

// Check 6: API rate limiting
console.log('6️⃣ Checking API routes...');
const apiFiles = glob.sync('pages/api/**/*.js');
let rateLimitingFound = false;

apiFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('rate') || content.includes('limit') || content.includes('throttle')) {
    rateLimitingFound = true;
  }
});

if (apiFiles.length === 0) {
  passed.push('No API routes to protect');
  console.log('   ℹ No API routes require rate limiting\n');
} else if (!rateLimitingFound) {
  warnings.push({
    severity: 'MEDIUM',
    issue: 'API routes may lack rate limiting',
    fix: 'Implement rate limiting middleware'
  });
  console.log(`   ⚠ ${apiFiles.length} API routes found without rate limiting\n`);
} else {
  passed.push('Rate limiting detected in API routes');
  console.log('   ✓ Rate limiting found\n');
}

// Check 7: CORS configuration
console.log('7️⃣ Checking CORS configuration...');
let corsConfigured = false;
apiFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('Access-Control-Allow-Origin')) {
    corsConfigured = true;
  }
});

if (apiFiles.length > 0 && !corsConfigured) {
  warnings.push({
    severity: 'LOW',
    issue: 'CORS not explicitly configured',
    fix: 'Add CORS headers to API routes if needed'
  });
  console.log('   ⚠ CORS not explicitly configured\n');
} else {
  passed.push('CORS configuration acceptable');
  console.log('   ✓ CORS configuration acceptable\n');
}

// Generate report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    critical: issues.filter(i => i.severity === 'CRITICAL').length,
    high: issues.filter(i => i.severity === 'HIGH').length,
    medium: warnings.filter(w => w.severity === 'MEDIUM').length,
    low: warnings.filter(w => w.severity === 'LOW').length,
    passed: passed.length
  },
  issues,
  warnings,
  passed,
  recommendations: [
    'Run "npm audit fix" to address dependency vulnerabilities',
    'Consider implementing rate limiting for API routes',
    'Test security headers with securityheaders.com after deployment',
    'Set up automated security scanning with GitHub Actions',
    'Enable Dependabot for automated dependency updates',
    'Review and rotate any API keys periodically',
    'Implement monitoring for suspicious activity',
    'Keep Next.js and dependencies up to date'
  ]
};

fs.writeFileSync(
  path.join(__dirname, '../SECURITY_AUDIT_REPORT.json'),
  JSON.stringify(report, null, 2)
);

// Console output
console.log('═══════════════════════════════════════════════════════════');
console.log('SECURITY AUDIT RESULTS\n');
console.log(`Critical Issues: ${report.summary.critical}`);
console.log(`High Priority: ${report.summary.high}`);
console.log(`Medium Priority: ${report.summary.medium}`);
console.log(`Low Priority: ${report.summary.low}`);
console.log(`Passed Checks: ${report.summary.passed}\n`);

if (issues.length > 0) {
  console.log('🔴 CRITICAL ISSUES:\n');
  issues.forEach((issue, i) => {
    console.log(`${i + 1}. [${issue.severity}] ${issue.issue}`);
    if (issue.file) console.log(`   File: ${issue.file}`);
    console.log(`   Fix: ${issue.fix}\n`);
  });
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:\n');
  warnings.slice(0, 5).forEach((warning, i) => {
    console.log(`${i + 1}. [${warning.severity}] ${warning.issue}`);
    console.log(`   Fix: ${warning.fix}\n`);
  });
}

console.log('✅ PASSED CHECKS:\n');
passed.forEach((check, i) => {
  console.log(`${i + 1}. ${check}`);
});

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📄 Full report: SECURITY_AUDIT_REPORT.json');
console.log('🔐 Next: Run "npm audit" for dependency vulnerabilities\n');

// Exit with appropriate code
process.exit(report.summary.critical > 0 ? 1 : 0);
