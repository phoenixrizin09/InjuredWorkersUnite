# Google Search Console & Bing Webmaster Setup

## Quick Setup Guide

### 1. Google Search Console

**Submit Your Site** (5 minutes):

1. Go to: https://search.google.com/search-console
2. Click: "Add Property" → "URL prefix"
3. Enter: `https://59047984.injuredworkersunite-rsr.pages.dev`
4. Verification: Use DNS or HTML file method
   - **DNS Method** (Recommended):
     - Add TXT record to your domain
     - Value provided by Google
   - **HTML File Method**:
     - Download verification file
     - Upload to `public/` directory
     - Rebuild and redeploy

**Submit Sitemap**:
```
https://59047984.injuredworkersunite-rsr.pages.dev/sitemap.xml
```

**Expected Results**:
- Indexing begins within 24-48 hours
- Full indexing: 1-2 weeks
- 29 URLs submitted (from sitemap)

---

### 2. Bing Webmaster Tools

**Submit Your Site** (5 minutes):

1. Go to: https://www.bing.com/webmasters
2. Click: "Add Site"
3. Enter: `https://59047984.injuredworkersunite-rsr.pages.dev`
4. Verification: 
   - **Option 1**: Import from Google Search Console (easiest)
   - **Option 2**: XML file upload
   - **Option 3**: Meta tag in `<head>`

**Submit Sitemap**:
```
https://59047984.injuredworkersunite-rsr.pages.dev/sitemap.xml
```

**Expected Results**:
- Indexing begins within 1 week
- Bing also powers DuckDuckGo and Yahoo search

---

### 3. Additional Search Engines (Optional)

**Yandex Webmaster**:
- URL: https://webmaster.yandex.com/
- Useful for Russian/Eastern European traffic
- Submit sitemap: `/sitemap.xml`

**Baidu Webmaster**:
- URL: https://ziyuan.baidu.com/
- Useful for Chinese traffic
- Requires Chinese verification

---

## Automated Submission Script

Run this after deployment:

```bash
# Create submission checklist
node scripts/submit-to-search-engines.js
```

---

## Verification Files

If using HTML file verification:

**Google**: `google[hash].html` → Place in `public/`
**Bing**: `BingSiteAuth.xml` → Place in `public/`

Then rebuild and redeploy:
```bash
npm run build
wrangler pages deploy out --project-name=injuredworkersunite
```

---

## Post-Submission Checklist

Within 24 hours:
- [ ] Verify ownership confirmed
- [ ] Sitemap submitted and processed
- [ ] Check for crawl errors
- [ ] Review coverage report

Within 1 week:
- [ ] Check which pages are indexed
- [ ] Review search performance data
- [ ] Fix any mobile usability issues
- [ ] Monitor Core Web Vitals

---

## Expected Indexing Timeline

| Search Engine | First Crawl | Full Index | Rich Results |
|---------------|-------------|------------|--------------|
| Google        | 24-48 hrs   | 1-2 weeks  | 2-4 weeks    |
| Bing          | 3-7 days    | 2-3 weeks  | 3-6 weeks    |
| DuckDuckGo    | 1 week      | 2-4 weeks  | N/A          |
| Yahoo         | 1 week      | 2-4 weeks  | N/A          |

---

## Optimization Tips

**Improve Indexing Speed**:
1. Submit RSS feeds as additional sitemaps
2. Share links on social media (Google crawls faster)
3. Get backlinks from indexed sites
4. Update content regularly (triggers recrawl)

**Monitor Performance**:
- Check Search Console weekly
- Track keyword rankings
- Monitor click-through rates
- Review Core Web Vitals

---

## Your Current Sitemap

**Location**: `https://59047984.injuredworkersunite-rsr.pages.dev/sitemap.xml`

**Contents**:
- 29 URLs total
- 18 static pages
- 11 blog posts
- Updated automatically every 6 hours

**Additional Feeds**:
- Blog RSS: `/blog-rss.xml`
- Oracle RSS: `/oracle-rss.xml`
- Alerts RSS: `/alerts-rss.xml`

Submit all 4 URLs (sitemap + 3 RSS feeds) to search engines for maximum indexing!
