# 🤖 Complete Automation Setup Guide

## Current Status

✅ **Content just generated successfully!**
- New Eye Oracle post created (Post #80)
- Daily Justice Report updated  
- Blog post created
- Viral content generated

**Last update**: January 14, 2026

---

## Why Wasn't Content Auto-Generating?

The automation has **3 ways to run**:

### 1. **GitHub Actions** (Fully Automated) ⏰
Runs automatically twice daily, but **requires**:
- GitHub Actions to be enabled in your repository settings
- The workflow file to be in the master branch ✅ (already done)
- The repository to be public OR have Actions minutes available

### 2. **Manual Run** (What we just did) 🖱️
Run scripts locally whenever you want:
```bash
node scripts/generate-eye-oracle-daily.js
node scripts/generate-daily-justice-report.js
node scripts/generate-daily-blog-post.js
node scripts/generate-daily-eye-viral-report.js
```

### 3. **Windows Task Scheduler** (Local Automation) 🪟
Set up daily tasks on your computer to run scripts automatically

---

## Setup Option 1: GitHub Actions (Recommended) 🚀

### Step 1: Enable GitHub Actions

1. Go to your GitHub repository
2. Click **Settings** → **Actions** → **General**
3. Under "Actions permissions", select:
   - ✅ **Allow all actions and reusable workflows**
4. Scroll down to **Workflow permissions**
5. Select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
6. Click **Save**

### Step 2: Verify Workflow is Present

The workflow file is already in your repo:
```
.github/workflows/eye-oracle-automation.yml
```

This runs **automatically** at:
- 6:00 AM ET (11:00 UTC) - Morning report
- 6:00 PM ET (23:00 UTC) - Evening update

### Step 3: Manually Trigger First Run

1. Go to **Actions** tab in GitHub
2. Click **Eye Oracle Daily Report** workflow
3. Click **Run workflow** → **Run workflow**
4. Wait 2-3 minutes for completion

### Step 4: Monitor Runs

- Check **Actions** tab to see workflow runs
- Green checkmark = success ✅
- Red X = failed ❌ (check logs)

---

## Setup Option 2: Windows Task Scheduler (Local) 🪟

If you want your local computer to generate posts daily:

### Create Batch File

1. Create `run-daily-automation.bat`:

```batch
@echo off
cd /d "C:\Users\bookw\OneDrive\Desktop\injured workers unite\1-InjuredWorkersUnite"

echo Running Eye Oracle Daily Automation...
echo.

echo [1/4] Eye Oracle Report...
node scripts/generate-eye-oracle-daily.js
echo.

echo [2/4] Justice Report...
node scripts/generate-daily-justice-report.js
echo.

echo [3/4] Blog Post...
node scripts/generate-daily-blog-post.js
echo.

echo [4/4] Viral Content...
node scripts/generate-daily-eye-viral-report.js
echo.

echo === AUTOMATION COMPLETE ===
echo.

REM Commit and push
git add -A
git commit -m "🤖 Daily automation: %date%"
git push

pause
```

Save to: `C:\Users\bookw\OneDrive\Desktop\injured workers unite\1-InjuredWorkersUnite\run-daily-automation.bat`

### Schedule in Windows

1. Press `Win + R`, type `taskschd.msc`, press Enter
2. Click **Create Basic Task**
3. Name: `Eye Oracle Daily Automation`
4. Trigger: **Daily**
5. Time: `6:00 AM`
6. Action: **Start a program**
7. Program: Browse to your `run-daily-automation.bat` file
8. Check **Open the Properties dialog...**
9. In Properties, check **Run whether user is logged on or not**
10. Click **OK**

---

## Setup Option 3: Manual Commands (Quick Method) ⚡

### Quick Run All

Create this PowerShell script `run-automation.ps1`:

```powershell
# Change to project directory
Set-Location "C:\Users\bookw\OneDrive\Desktop\injured workers unite\1-InjuredWorkersUnite"

Write-Host "🤖 Running Daily Automation..." -ForegroundColor Cyan
Write-Host ""

# Run all generators
Write-Host "[1/4] Eye Oracle..." -ForegroundColor Yellow
node scripts/generate-eye-oracle-daily.js

Write-Host "[2/4] Justice Report..." -ForegroundColor Yellow
node scripts/generate-daily-justice-report.js

Write-Host "[3/4] Blog Post..." -ForegroundColor Yellow
node scripts/generate-daily-blog-post.js

Write-Host "[4/4] Viral Content..." -ForegroundColor Yellow
node scripts/generate-daily-eye-viral-report.js

Write-Host ""
Write-Host "✅ Complete! Committing changes..." -ForegroundColor Green

# Commit and push
git add -A
git commit -m "🤖 Daily automation: $(Get-Date -Format 'yyyy-MM-dd')"
git push

Write-Host "✅ Pushed to GitHub!" -ForegroundColor Green
```

### Run it:
```powershell
.\run-automation.ps1
```

### Or use npm scripts:

```bash
# Run all automation
npm run automation:all

# Or individual parts
npm run oracle:generate
npm run justice:generate
npm run blog:generate
npm run viral:generate
```

---

## Verification & Testing

### Check if Content was Generated

```bash
# Run diagnostic
node scripts/diagnostic-automation.js

# Check latest post
node -e "const p = require('./public/data/eye-oracle-posts.json'); console.log('Latest:', p[0].metadata.date, '-', p[0].title.substring(0,60))"

# Check all data files
dir public\data\*.json | Select-Object Name, Length, LastWriteTime
```

### What Gets Generated

Each run creates/updates:

1. **Eye Oracle Posts** (`public/data/eye-oracle-posts.json`)
   - New investigative report
   - Evidence receipts
   - Viral hooks for all platforms
   - Risk analysis

2. **Justice Report** (`public/data/daily-justice-report.json`)
   - Legal framework analysis
   - Rights violations
   - Population impact

3. **Blog Posts** (`public/data/blog-posts.json`)
   - Feature spotlight
   - Rotates through categories

4. **Viral Content** (`public/data/daily-eye-viral-report.json`)
   - Social media hooks
   - Headlines
   - Share-ready content

5. **Social Hooks** (`public/data/today-social-hooks.json`)
   - Platform-specific posts
   - Hashtags
   - Best posting times

---

## Commit & Deploy Workflow

### After Content is Generated

1. **Review changes**:
   ```bash
   git status
   git diff public/data/
   ```

2. **Commit**:
   ```bash
   git add public/data/*.json
   git commit -m "🤖 Daily automation: $(date +%Y-%m-%d)"
   git push
   ```

3. **Deploy** (if using Cloudflare Pages):
   ```bash
   npm run build
   wrangler pages deploy
   ```

   Or GitHub Pages will auto-deploy from master

---

## Troubleshooting

### "No new content generated"

**Reason**: Scripts check if today's post already exists

**Solution**:
```bash
# Check latest post date
node -e "console.log(require('./public/data/eye-oracle-posts.json')[0].metadata.date)"

# If it's not today, manually run:
node scripts/generate-eye-oracle-daily.js
```

### "GitHub Actions not running"

**Checks**:
1. Go to GitHub → Settings → Actions → Verify it's enabled
2. Go to Actions tab → Check for workflow runs
3. If no runs, click "Run workflow" manually
4. Check workflow file is in `.github/workflows/`

**Fix**:
```bash
# Verify file exists
cat .github/workflows/eye-oracle-automation.yml

# Make a small change to trigger Actions
git commit --allow-empty -m "Trigger Actions"
git push
```

### "Scripts fail with errors"

**Check Node version**:
```bash
node --version  # Should be v18+
```

**Check dependencies**:
```bash
npm install
```

**Check file permissions**:
```bash
# Windows
icacls public\data /grant Everyone:F /T

# Or run as Administrator
```

### "Posts not showing on website"

**Reason**: Website needs to be deployed

**Solution**:
```bash
# Build site
npm run build

# Deploy to Cloudflare
wrangler pages deploy

# Or commit and push (if using GitHub Pages)
git push
```

---

## Quick Reference

### Daily Manual Run (Recommended Until Auto-Setup)

```bash
cd "C:\Users\bookw\OneDrive\Desktop\injured workers unite\1-InjuredWorkersUnite"

# Generate all content
node scripts/generate-eye-oracle-daily.js
node scripts/generate-daily-justice-report.js
node scripts/generate-daily-blog-post.js
node scripts/generate-daily-eye-viral-report.js

# Verify
node scripts/diagnostic-automation.js

# Commit
git add -A
git commit -m "🤖 Daily content: $(date +%Y-%m-%d)"
git push
```

### NPM Scripts (if configured)

```bash
npm run automation:all     # Run everything
npm run automation:check   # Run diagnostic
npm run automation:commit  # Generate + commit + push
```

---

## Recommended Setup Path

**For most reliable automation:**

1. ✅ **GitHub Actions** (primary) - Runs automatically in the cloud
2. ✅ **Manual daily run** (backup) - Run script each morning
3. ✅ **Windows Task Scheduler** (optional) - Local automation

**Start with**:
1. Enable GitHub Actions (10 minutes)
2. Run manual script daily until confident (1 week)
3. Set up Task Scheduler if desired (optional)

---

## Files You Need

All files are already in place:

- ✅ `.github/workflows/eye-oracle-automation.yml` - GitHub Actions
- ✅ `scripts/generate-eye-oracle-daily.js` - Main generator
- ✅ `scripts/generate-daily-justice-report.js` - Justice analysis
- ✅ `scripts/generate-daily-blog-post.js` - Blog posts
- ✅ `scripts/generate-daily-eye-viral-report.js` - Viral content
- ✅ `scripts/diagnostic-automation.js` - Health check

---

## Next Steps

**Right now**:
1. ✅ Content generated for Jan 14 (just completed)
2. Commit these changes
3. Push to GitHub
4. Enable GitHub Actions in repo settings
5. Manually trigger first workflow run

**Tomorrow**:
- Check if GitHub Actions ran automatically at 6 AM / 6 PM
- If not, run scripts manually
- Repeat daily

**This week**:
- Monitor GitHub Actions runs
- Set up Task Scheduler if desired
- Configure deployment automation

---

**Current Status**: Content generating manually ✅  
**Goal**: Fully automated via GitHub Actions ⏰  
**Timeline**: Can be set up in 10 minutes
