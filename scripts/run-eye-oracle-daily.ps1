# Eye Oracle Daily - PowerShell Version
# Run this script daily to generate Eye Oracle investigative posts

Write-Host ""
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "   👁️ THE EYE ORACLE - Daily Investigative Report Generator" -ForegroundColor Cyan
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""

# Change to project directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location (Join-Path $scriptPath "..")

Write-Host "[1/3] Running The Eye Oracle generator..." -ForegroundColor Yellow
node scripts/generate-eye-oracle-daily.js

Write-Host ""
Write-Host "[2/3] Verifying post creation..." -ForegroundColor Yellow
if (Test-Path "public/data/eye-oracle-posts.json") {
    Write-Host "✅ SUCCESS: Eye Oracle posts file exists" -ForegroundColor Green
    
    # Count posts
    $posts = Get-Content "public/data/eye-oracle-posts.json" | ConvertFrom-Json
    $count = $posts.Count
    Write-Host "   Total Oracle posts: $count" -ForegroundColor Green
    
    # Show latest post
    if ($count -gt 0) {
        $latest = $posts[0]
        Write-Host ""
        Write-Host "   Latest Post:" -ForegroundColor Cyan
        Write-Host "   - Date: $($latest.metadata.date)" -ForegroundColor White
        Write-Host "   - Title: $($latest.title)" -ForegroundColor White
        Write-Host "   - Risk Score: $($latest.metadata.riskScore)/100" -ForegroundColor White
        Write-Host "   - Category: $($latest.metadata.category)" -ForegroundColor White
    }
} else {
    Write-Host "⚠️  WARNING: No posts file found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host "   Process Complete! Visit http://localhost:3000/eye-oracle" -ForegroundColor Green
Write-Host "===================================================================" -ForegroundColor Cyan
Write-Host ""

# Optional: Auto-commit to git
$autoCommit = $false  # Change to $true to enable
if ($autoCommit) {
    Write-Host "[3/3] Committing to git..." -ForegroundColor Yellow
    git add public/data/eye-oracle-posts.json
    git commit -m "👁️ Eye Oracle: Daily investigative post - $(Get-Date -Format 'yyyy-MM-dd')"
    Write-Host "✅ Changes committed" -ForegroundColor Green
}

Write-Host ""
