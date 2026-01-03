# ✅ IMPLEMENTATION CHECKLIST

Run these commands in order to activate 100% real data:

## 1. Install Dependencies
```powershell
cd "c:\Users\bookw\OneDrive\Desktop\injured workers unite\1-InjuredWorkersUnite"
npm install
```
**What this does**: Installs all required packages including new testing framework

## 2. Fetch Real Data
```powershell
npm run fetch:real
```
**What this does**: 
- Fetches from Open Canada API (federal datasets)
- Fetches from Ontario Open Data API (provincial datasets)
- Fetches from Reddit (community discussions)
- Fetches from OpenParliament (bills and debates)
- Creates `public/data/` files with 100% real data
- Cost: $0.00

**Expected output**:
```
👁️  THE EYE - REAL DATA FETCHER
...
✅ REAL DATA FETCH COMPLETE
Total Datasets: [number]
Cost: $0.00
```

## 3. Generate Sitemap
```powershell
npm run generate:sitemap
```
**What this does**: Creates `public/sitemap.xml` with current dates

## 4. Generate RSS Feeds
```powershell
npm run generate:rss
```
**What this does**: Creates:
- `public/blog-rss.xml`
- `public/oracle-rss.xml`
- `public/alerts-rss.xml`

## 5. Run Tests
```powershell
npm test
```
**What this does**: Verifies data files and configuration

## 6. Build Site
```powershell
npm run build
```
**What this does**: 
- Runs fetch:real automatically
- Generates sitemap and RSS automatically
- Builds static site to `/out` directory

## 7. Test Locally
```powershell
npm run dev
```
**Then visit**: http://localhost:3000

**What to check**:
- [ ] Transparency banner shows on homepage
- [ ] Navigate to `/alerts` - should show real government data
- [ ] Check `/blog-rss.xml` - should be valid XML
- [ ] Check `/sitemap.xml` - should have current dates
- [ ] Verify `public/data/data-summary.json` shows fetch success

## 8. Verify Data Files

```powershell
# Check data summary
cat public/data/data-summary.json

# Check federal datasets
cat public/data/federal-datasets.json | Select-Object -First 1

# Check Ontario datasets  
cat public/data/ontario-datasets.json | Select-Object -First 1

# Check alerts
cat public/data/alerts.json | Select-Object -First 1
```

**What to verify**:
- [ ] Each dataset has a `url` field linking to official source
- [ ] Timestamps are recent (last few hours)
- [ ] Data looks real (not placeholder text)

## 9. Commit and Push

```powershell
git add .
git commit -m "✅ Implement 100% real data integration - zero cost"
git push origin master
```

**What happens next**:
- GitHub Actions workflows start running
- `fetch-real-data.yml` will run every 6 hours
- Cloudflare Pages auto-deploys

## 10. Verify Deployment

After pushing:

1. **Check GitHub Actions**:
   - Go to repository → Actions tab
   - Verify "Fetch Real Data Daily" workflow exists
   - Should run successfully

2. **Check Cloudflare Pages**:
   - Wait 2-5 minutes for build
   - Visit https://injuredworkersunite.pages.dev
   - Should see transparency banner
   - `/alerts` should show real data

3. **Verify RSS Feeds**:
   - https://injuredworkersunite.pages.dev/blog-rss.xml
   - https://injuredworkersunite.pages.dev/oracle-rss.xml
   - https://injuredworkersunite.pages.dev/alerts-rss.xml

4. **Check Sitemap**:
   - https://injuredworkersunite.pages.dev/sitemap.xml
   - Should have recent dates

---

## Quick One-Command Setup

**Instead of steps 1-6, run**:
```powershell
.\setup.ps1
```

This runs everything automatically.

---

## Troubleshooting

### "npm: command not found"
**Fix**: Install Node.js from https://nodejs.org (v18 or higher)

### "fetch is not defined"
**Fix**: Node.js version too old. Update to v18+

### "No data files created"
**Fix**: Run `npm run fetch:real` manually and check for errors

### "GitHub Actions failing"
**Fix**: 
1. Check workflow files have correct action versions (v3)
2. Ensure GitHub Actions is enabled in repo settings

### "Build fails"
**Fix**:
```powershell
Remove-Item -Recurse -Force .next, out, node_modules
npm install
npm run build
```

---

## Success Criteria

After completing all steps, you should have:

- [ ] `public/data/` folder with 7 JSON files
- [ ] `public/sitemap.xml` with current dates
- [ ] `public/blog-rss.xml`, `oracle-rss.xml`, `alerts-rss.xml`
- [ ] Tests passing (or at least running)
- [ ] `/out` folder with built static site
- [ ] GitHub Actions workflow running every 6 hours
- [ ] Site deployed to Cloudflare Pages with real data
- [ ] Transparency banner visible on homepage
- [ ] Every alert linking to official source

---

## Next Steps After Verification

1. **Monitor GitHub Actions**: Check that workflows run every 6 hours
2. **Review Alerts**: New government datasets will create alerts
3. **Subscribe to RSS**: Use feeds to track updates
4. **Add CanLII**: Register for free API key at https://www.canlii.org/en/info/api.html
5. **Implement French**: Add bilingual support for federal compliance

---

**Total Time**: 5-10 minutes  
**Total Cost**: $0.00  
**Result**: 100% real data, fully automated, completely verifiable
