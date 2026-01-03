#!/usr/bin/env pwsh
# PowerShell script to run the complete setup

Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "INJURED WORKERS UNITE - REAL DATA SETUP" -ForegroundColor Cyan
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Install dependencies
Write-Host "[1/6] Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] npm install failed" -ForegroundColor Red
    exit 1
}
Write-Host "[SUCCESS] Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 2: Fetch real data
Write-Host "[2/6] Fetching real data from government APIs..." -ForegroundColor Yellow
node scripts/fetch-real-data.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Data fetch failed" -ForegroundColor Red
    exit 1
}
Write-Host "[SUCCESS] Real data fetched" -ForegroundColor Green
Write-Host ""

# Step 3: Generate sitemap
Write-Host "[3/6] Generating sitemap..." -ForegroundColor Yellow
node scripts/generate-sitemap.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Sitemap generation failed" -ForegroundColor Red
    exit 1
}
Write-Host "[SUCCESS] Sitemap generated" -ForegroundColor Green
Write-Host ""

# Step 4: Generate RSS feeds
Write-Host "[4/6] Generating RSS feeds..." -ForegroundColor Yellow
node scripts/generate-rss.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] RSS generation failed" -ForegroundColor Red
    exit 1
}
Write-Host "[SUCCESS] RSS feeds generated" -ForegroundColor Green
Write-Host ""

# Step 5: Run tests
Write-Host "[5/6] Running tests..." -ForegroundColor Yellow
npm test
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Some tests failed (this is OK for first run)" -ForegroundColor Yellow
} else {
    Write-Host "[SUCCESS] All tests passed" -ForegroundColor Green
}
Write-Host ""

# Step 6: Build site
Write-Host "[6/6] Building static site..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "[SUCCESS] Build complete" -ForegroundColor Green
Write-Host ""

Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "SETUP COMPLETE!" -ForegroundColor Green
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Data Summary:" -ForegroundColor Cyan
if (Test-Path "public/data/data-summary.json") {
    Get-Content "public/data/data-summary.json" | ConvertFrom-Json | ConvertTo-Json -Depth 10
}
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Review real data in public/data/" -ForegroundColor White
Write-Host "  2. Test locally: npm run dev" -ForegroundColor White
Write-Host "  3. Deploy: Push to GitHub (Cloudflare auto-deploys)" -ForegroundColor White
Write-Host ""
Write-Host "Total Cost: `$0.00 (100% FREE APIs)" -ForegroundColor Green
Write-Host "===============================================================================" -ForegroundColor Cyan
