# Eye Oracle Daily Automation Runner
# Run this script daily to generate all content

# Change to project directory
$ProjectPath = "C:\Users\bookw\OneDrive\Desktop\injured workers unite\1-InjuredWorkersUnite"
Set-Location $ProjectPath

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  👁️  EYE ORACLE DAILY AUTOMATION                          ║" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "║  Generating: Reports, Blogs, Viral Content, Justice Data  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$StartTime = Get-Date
$ErrorCount = 0

# Function to run script with error handling
function Run-Script {
    param(
        [string]$Name,
        [string]$Script,
        [int]$Step,
        [int]$Total
    )
    
    Write-Host "[$Step/$Total] " -NoNewline -ForegroundColor Yellow
    Write-Host "$Name..." -ForegroundColor White
    
    try {
        $output = node $Script 2>&1 | Out-String
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Success" -ForegroundColor Green
            # Show last few lines of output
            $lines = $output -split "`n" | Where-Object { $_.Trim() -ne "" } | Select-Object -Last 3
            foreach ($line in $lines) {
                Write-Host "     $line" -ForegroundColor Gray
            }
        } else {
            Write-Host "  ⚠️  Completed with warnings" -ForegroundColor Yellow
            $script:ErrorCount++
        }
    }
    catch {
        Write-Host "  ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
        $script:ErrorCount++
    }
    Write-Host ""
}

# Run all generation scripts
Run-Script "Eye Oracle Daily Report" "scripts/generate-eye-oracle-daily.js" 1 4
Run-Script "Justice Report" "scripts/generate-daily-justice-report.js" 2 4
Run-Script "Blog Post" "scripts/generate-daily-blog-post.js" 3 4
Run-Script "Viral Social Content" "scripts/generate-daily-eye-viral-report.js" 4 4

# Verify generated content
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 VERIFICATION" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

try {
    $oraclePosts = Get-Content "public/data/eye-oracle-posts.json" | ConvertFrom-Json
    Write-Host "  👁️  Eye Oracle: $($oraclePosts.Count) total posts" -ForegroundColor White
    Write-Host "      Latest: $($oraclePosts[0].metadata.date)" -ForegroundColor Gray
    Write-Host "      Title: $($oraclePosts[0].title.Substring(0, [Math]::Min(60, $oraclePosts[0].title.Length)))..." -ForegroundColor Gray
}
catch {
    Write-Host "  ⚠️  Could not verify Eye Oracle posts" -ForegroundColor Yellow
    $ErrorCount++
}

try {
    $blogPosts = Get-Content "public/data/blog-posts.json" | ConvertFrom-Json
    Write-Host "  📝 Blog Posts: $($blogPosts.Count) total" -ForegroundColor White
    Write-Host "      Latest: $($blogPosts[0].date) - $($blogPosts[0].title.Substring(0, [Math]::Min(50, $blogPosts[0].title.Length)))" -ForegroundColor Gray
}
catch {
    Write-Host "  ⚠️  Could not verify blog posts" -ForegroundColor Yellow
    $ErrorCount++
}

try {
    $justiceReport = Get-Content "public/data/daily-justice-report.json" | ConvertFrom-Json
    Write-Host "  ⚖️  Justice Report: $($justiceReport.date)" -ForegroundColor White
    Write-Host "      Violations: $($justiceReport.summary.violationsDetected)" -ForegroundColor Gray
}
catch {
    Write-Host "  ⚠️  Could not verify justice report" -ForegroundColor Yellow
    $ErrorCount++
}

Write-Host ""

# Git operations
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📦 GIT OPERATIONS" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Check git status
$GitStatus = git status --porcelain
if ($GitStatus) {
    Write-Host "  📝 Changes detected in:" -ForegroundColor White
    $GitStatus -split "`n" | ForEach-Object {
        if ($_ -match "public/data") {
            Write-Host "      $_" -ForegroundColor Gray
        }
    }
    Write-Host ""
    
    # Prompt for commit
    $Commit = Read-Host "  Commit and push changes? (Y/n)"
    if ($Commit -eq "" -or $Commit -eq "Y" -or $Commit -eq "y") {
        Write-Host "  📤 Staging changes..." -ForegroundColor Yellow
        git add public/data/*.json
        
        $CommitDate = Get-Date -Format "yyyy-MM-dd"
        $CommitMsg = "🤖 Daily automation: $CommitDate"
        
        Write-Host "  💾 Committing: $CommitMsg" -ForegroundColor Yellow
        git commit -m $CommitMsg
        
        Write-Host "  🚀 Pushing to GitHub..." -ForegroundColor Yellow
        git push
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Successfully pushed to GitHub!" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Push failed!" -ForegroundColor Red
            $ErrorCount++
        }
    } else {
        Write-Host "  ⏭️  Skipping commit" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ℹ️  No changes to commit" -ForegroundColor Cyan
}

Write-Host ""

# Summary
$EndTime = Get-Date
$Duration = ($EndTime - $StartTime).TotalSeconds

Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 AUTOMATION SUMMARY" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "  ⏱️  Duration: $([Math]::Round($Duration, 1)) seconds" -ForegroundColor White
Write-Host "  📅 Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White

if ($ErrorCount -eq 0) {
    Write-Host "  ✅ Status: ALL SYSTEMS OPERATIONAL" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Status: $ErrorCount warnings/errors" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "👁️  THE EYE SEES ALL. THE EYE NEVER SLEEPS." -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Pause if run manually (not from Task Scheduler)
if ($Host.Name -eq "ConsoleHost") {
    Write-Host "Press any key to exit..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
