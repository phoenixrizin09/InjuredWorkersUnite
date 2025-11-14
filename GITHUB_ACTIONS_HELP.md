# GitHub Actions Troubleshooting Guide

## Current Status
✅ Workflow file exists: `.github/workflows/daily-monitoring.yml`
✅ File is in Git and pushed to master branch
✅ Repository: https://github.com/phoenixrizin09/InjuredWorkersUnite

## Why You Might Not See "The EYE" Workflow

### Option 1: Actions Tab Not Showing Workflows
1. Go to: https://github.com/phoenixrizin09/InjuredWorkersUnite/actions
2. Look for "👁️ The EYE - Daily Monitoring" in the left sidebar
3. If you see a message about enabling Actions:
   - Click "I understand my workflows, go ahead and enable them"
4. If you see nothing at all:
   - The workflow may need to run once to appear
   - Try Option 2 below

### Option 2: Manually Trigger First Run
1. Go to: https://github.com/phoenixrizin09/InjuredWorkersUnite
2. Click the "Actions" tab at the top
3. You should see "👁️ The EYE - Daily Monitoring" in the left sidebar
4. Click it
5. Click "Run workflow" button (right side)
6. Select branch: master
7. Click green "Run workflow" button

### Option 3: Check Repository Settings
1. Go to: https://github.com/phoenixrizin09/InjuredWorkersUnite/settings/actions
2. Under "Actions permissions", make sure one of these is selected:
   - "Allow all actions and reusable workflows"
   - "Allow [your organization] and select non-[your organization] actions and reusable workflows"
3. Scroll down to "Workflow permissions"
4. Select "Read and write permissions"
5. Click "Save"

### Option 4: Force Workflow Sync
Sometimes GitHub needs a small change to detect the workflow:

```bash
# Add a comment to the workflow file and re-push
git add .github/workflows/daily-monitoring.yml
git commit -m "Trigger workflow detection"
git push origin master
```

## The Workflow Will:
- ✅ Run daily at 6:00 AM EST
- ✅ Monitor Ontario Legislature, WSIB, Disability Benefits, Corporate Filings, Lobbyists
- ✅ Save alerts to `data/alerts.json`
- ✅ Display on https://injuredworkersunite.pages.dev/alerts
- ✅ Cost: $0.00 (uses GitHub's free 2,000 minutes/month)

## Next Step
Visit: https://github.com/phoenixrizin09/InjuredWorkersUnite/actions

If you still don't see it after these steps, let me know what you see on that page!
