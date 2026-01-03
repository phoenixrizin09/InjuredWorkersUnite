# 🚀 REAL DATA INTEGRATION - IMPLEMENTATION GUIDE

## ✅ WHAT WE'VE IMPLEMENTED (100% FREE, NO MOCK DATA)

### 1. **Real Data Fetching System**
- **File**: `scripts/fetch-real-data.js`
- **What it does**: Fetches 100% real data from free government APIs
- **Data Sources**:
  - ✅ **Open Canada** (Federal datasets) - FREE
  - ✅ **Ontario Open Data** (Provincial datasets) - FREE
  - ✅ **Reddit** (Community discussions) - FREE
  - ✅ **OpenParliament.ca** (Bills and debates) - FREE
- **Cost**: $0.00
- **Run it**: `npm run fetch:real`

### 2. **Automated GitHub Actions**
- **File**: `.github/workflows/fetch-real-data.yml`
- **Schedule**: Every 6 hours
- **What it does**: Automatically fetches fresh data and commits to repository
- **Fixed**: Corrected action versions (v3 instead of v4)

### 3. **Dynamic Sitemap Generator**
- **File**: `scripts/generate-sitemap.js`
- **What it does**: Generates sitemap.xml with current dates
- **Updates**: Automatically before each build
- **Run it**: `npm run generate:sitemap`

### 4. **RSS Feed Generator**
- **File**: `scripts/generate-rss.js`
- **Feeds Generated**:
  - `/blog-rss.xml` - Blog posts
  - `/oracle-rss.xml` - Eye Oracle reports
  - `/alerts-rss.xml` - Real-time alerts
- **Run it**: `npm run generate:rss`

### 5. **Testing Framework**
- **Files**: `jest.config.json`, `jest.setup.js`, `__tests__/basic.test.js`
- **Tests**: Data file validation, API connector checks, configuration verification
- **Run it**: `npm test`

### 6. **SEO Enhancements**
- **Structured Data** (JSON-LD) added to `_document.js`:
  - Organization schema
  - WebSite schema
  - Proper social media links
- **Benefits**: Better Google/Bing indexing, rich snippets

### 7. **Transparency Banner**
- **File**: `components/TransparencyBanner.js`
- **Purpose**: Makes it 100% clear that we use real data
- **Location**: Top of homepage

---

## 🎯 HOW TO USE

### First Time Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Fetch initial real data**:
   ```bash
   npm run fetch:real
   ```
   This will create:
   - `public/data/federal-datasets.json`
   - `public/data/ontario-datasets.json`
   - `public/data/reddit-discussions.json`
   - `public/data/parliament-bills.json`
   - `public/data/government-data.json`
   - `public/data/alerts.json`
   - `public/data/data-summary.json`

3. **Generate sitemap and RSS**:
   ```bash
   npm run generate:sitemap
   npm run generate:rss
   ```

4. **Build the site**:
   ```bash
   npm run build
   ```
   (This now automatically runs fetch:real, generate:sitemap, and generate:rss)

### Daily Operations

**The GitHub Actions workflow handles everything automatically:**
- Fetches fresh data every 6 hours
- Generates new blog posts daily
- Updates sitemap and RSS feeds
- Commits changes to repository
- Cloudflare Pages auto-deploys

**Manual Updates** (if needed):
```bash
npm run fetch:all  # Fetch data + generate blog + oracle reports
npm run build      # Full build with all updates
```

---

## 📊 DATA VERIFICATION

### How to verify data is real:

1. **Check data files**:
   ```bash
   cat public/data/data-summary.json
   ```
   Shows what APIs were hit and when

2. **View alerts**:
   ```bash
   cat public/data/alerts.json
   ```
   Each alert has a `source_url` you can click to verify

3. **Federal datasets**:
   ```bash
   cat public/data/federal-datasets.json
   ```
   Each entry has a direct URL to open.canada.ca

4. **Ontario datasets**:
   ```bash
   cat public/data/ontario-datasets.json
   ```
   Each entry has a direct URL to data.ontario.ca

---

## 🔧 CONFIGURATION

### Environment Variables (Optional)

Create `.env.local` if you want notifications:
```env
# Optional - for notifications only
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id
```

**Note**: Data fetching works without ANY environment variables!

### GitHub Secrets (for Actions)

Add to your repository settings → Secrets:
- `DISCORD_WEBHOOK_URL` (optional, for notifications)

---

## 🧪 TESTING

Run tests:
```bash
npm test
```

Watch mode:
```bash
npm test:watch
```

Tests verify:
- Data files exist and are valid JSON
- API connectors are properly exported
- Scripts are present
- Configuration is correct

---

## 🚀 DEPLOYMENT

### Cloudflare Pages (Current)

**Automatic deployment**:
1. Push to `master` branch
2. GitHub Actions fetch fresh data
3. Cloudflare Pages deploys automatically

**Build command**: `npm run build`
**Output directory**: `out`

### Manual Deploy

```bash
npm run build
# Upload /out folder to any static host
```

---

## 📈 MONITORING

### Data Freshness

Check when data was last updated:
```bash
cat public/data/data-summary.json | grep generated_at
```

### GitHub Actions Status

View workflow runs:
- Go to repository → Actions tab
- Check "Fetch Real Data Daily" workflow
- Should run every 6 hours

### Alerts

New government datasets trigger alerts:
- Visible at `/alerts` page
- Available in RSS feed `/alerts-rss.xml`
- Each alert links to original source

---

## 🆓 COST BREAKDOWN

| Service | Cost | Limit |
|---------|------|-------|
| Open Canada API | **$0** | Unlimited |
| Ontario Open Data API | **$0** | Unlimited |
| Reddit JSON API | **$0** | Rate-limited (we respect it) |
| OpenParliament API | **$0** | Unlimited |
| Cloudflare Pages | **$0** | 500 builds/month |
| GitHub Actions | **$0** | 2000 minutes/month (public repos) |
| **TOTAL** | **$0.00** | ✅ |

---

## 🔍 TROUBLESHOOTING

### "No data found" error

**Solution**: Run `npm run fetch:real` to fetch initial data

### GitHub Actions failing

**Solution**: 
1. Check `.github/workflows/` files have correct action versions (v3)
2. Ensure repository has GitHub Actions enabled

### Data seems outdated

**Solution**: 
1. Check GitHub Actions logs
2. Manually run: `npm run fetch:real`
3. Commit and push changes

### Build fails

**Solution**:
```bash
rm -rf .next out node_modules
npm install
npm run build
```

---

## 📚 API DOCUMENTATION

### Open Canada API
- **URL**: https://open.canada.ca/data/api/3/action/package_search
- **Docs**: https://open.canada.ca/en/access-our-application-programming-interface-api
- **Rate Limit**: None documented
- **Authentication**: None required

### Ontario Open Data
- **URL**: https://data.ontario.ca/api/3/action/package_search
- **Docs**: https://data.ontario.ca/en/ontario-data-catalogue-api
- **Rate Limit**: Reasonable use
- **Authentication**: None required

### OpenParliament
- **URL**: https://openparliament.ca/api/
- **Docs**: https://openparliament.ca/api/
- **Rate Limit**: Reasonable use
- **Authentication**: None required

### Reddit
- **URL**: https://www.reddit.com/r/[subreddit]/search.json
- **Docs**: https://www.reddit.com/dev/api/
- **Rate Limit**: 60 requests/minute
- **Authentication**: None required for public endpoints

---

## 🎓 NEXT STEPS

### Immediate
1. ✅ Run `npm run fetch:real` to get initial data
2. ✅ Run `npm test` to verify setup
3. ✅ Push to GitHub to trigger Actions
4. ✅ Check deployed site for transparency banner

### Short Term
1. Add CanLII API (requires free registration)
2. Implement French language support
3. Add performance monitoring
4. Create contributor documentation

### Long Term
1. Implement database for historical data
2. Add trend analysis
3. Create public API
4. Build mobile app

---

## 💡 CONTRIBUTING

All data fetching is 100% transparent:
- Scripts are open source
- APIs are documented
- Data files are committed to repo
- No secrets required for basic operation

To improve data fetching:
1. Edit `scripts/fetch-real-data.js`
2. Add new free API sources
3. Submit pull request with documentation

---

## 📄 LICENSE

- **Code**: MIT License
- **Data**: Government data is public domain
- **Content**: Creative Commons BY-SA 4.0

---

**Questions?** Email: injuredworker34@gmail.com
**Issues?** https://github.com/phoenixrizin09/InjuredWorkersUnite/issues
