#!/usr/bin/env pwsh
# Pre-build check - ensures data is fresh before deployment

Write-Host "🔍 Pre-Build Checks..." -ForegroundColor Cyan

$dataDir = "public/data"
$criticalFiles = @(
    "government-data.json",
    "alerts.json",
    "data-summary.json"
)

$warnings = 0
$errors = 0

# Check if data directory exists
if (-not (Test-Path $dataDir)) {
    Write-Host "❌ ERROR: $dataDir directory not found" -ForegroundColor Red
    Write-Host "   Run: npm run fetch:real" -ForegroundColor Yellow
    exit 1
}

# Check critical files exist
foreach ($file in $criticalFiles) {
    $filePath = Join-Path $dataDir $file
    if (-not (Test-Path $filePath)) {
        Write-Host "⚠️  WARNING: $file not found" -ForegroundColor Yellow
        $warnings++
    } else {
        # Check if file is recent (less than 7 days old)
        $fileAge = (Get-Date) - (Get-Item $filePath).LastWriteTime
        if ($fileAge.TotalDays -gt 7) {
            Write-Host "⚠️  WARNING: $file is $([math]::Round($fileAge.TotalDays)) days old" -ForegroundColor Yellow
            $warnings++
        } else {
            Write-Host "✅ $file (updated $([math]::Round($fileAge.TotalHours)) hours ago)" -ForegroundColor Green
        }
    }
}

# Check if sitemap exists and is recent
if (Test-Path "public/sitemap.xml") {
    $sitemapAge = (Get-Date) - (Get-Item "public/sitemap.xml").LastWriteTime
    if ($sitemapAge.TotalDays -gt 7) {
        Write-Host "⚠️  WARNING: sitemap.xml is old - run: npm run generate:sitemap" -ForegroundColor Yellow
        $warnings++
    } else {
        Write-Host "✅ sitemap.xml is up to date" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  WARNING: sitemap.xml not found" -ForegroundColor Yellow
    $warnings++
}

# Check RSS feeds
$rssFeeds = @("blog-rss.xml", "oracle-rss.xml", "alerts-rss.xml")
foreach ($feed in $rssFeeds) {
    if (-not (Test-Path "public/$feed")) {
        Write-Host "⚠️  WARNING: $feed not found - run: npm run generate:rss" -ForegroundColor Yellow
        $warnings++
    }
}

# Summary
Write-Host ""
if ($errors -gt 0) {
    Write-Host "❌ Build blocked: $errors critical errors" -ForegroundColor Red
    Write-Host "   Fix errors before building" -ForegroundColor Yellow
    exit 1
} elseif ($warnings -gt 0) {
    Write-Host "⚠️  $warnings warnings (build will continue)" -ForegroundColor Yellow
    Write-Host "   Consider running: npm run fetch:all" -ForegroundColor Cyan
} else {
    Write-Host "✅ All checks passed - ready to build!" -ForegroundColor Green
}

Write-Host ""
