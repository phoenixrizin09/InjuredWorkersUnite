# Cloudflare Pages Deployment + Web Analytics Setup

## ✅ Status: Ready for Deployment

Your site is now ready to deploy to Cloudflare Pages with Web Analytics enabled.

---

## What's Been Done

✅ **Created Next.js source files**
  - `pages/_document.js` — HTML document with analytics placeholder
  - `pages/_app.js` — Next.js app component
  - `pages/index.js` — Homepage with status message

✅ **Set up Cloudflare Web Analytics integration**
  - JavaScript snippet is embedded in `_document.js`
  - Placeholder token waiting for your measurement token

✅ **Pushed to GitHub**
  - All files committed to `main` branch
  - Ready for Cloudflare Pages deployment

---

## Next Steps to Complete Setup

### Step 1: Get Your Cloudflare Measurement Token

1. Go to **https://dash.cloudflare.com**
2. Select your zone (domain)
3. Go to **Analytics & Logs** → **Web Analytics**
4. Create a new site with hostname: **`injuredworkersunite.pages.dev`**
5. Copy the measurement token (looks like: `"token": "abc123def456..."`)

### Step 2: Add Token to Code

Replace `YOUR_CLOUDFLARE_MEASUREMENT_TOKEN_HERE` in `pages/_document.js` with your actual token:

**File:** `pages/_document.js` (Line 7)

```javascript
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'
></script>
```

Change to:
```javascript
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "z1a2b3c4d5e6f7g8h9i0j"}'
></script>
```

### Step 3: Commit and Push

```powershell
git add pages/_document.js
git commit -m "Add: Cloudflare measurement token for Web Analytics"
git push origin main
```

### Step 4: Deploy to Cloudflare Pages

**Connect your GitHub repo to Cloudflare Pages:**

1. Go to **https://dash.cloudflare.com**
2. Go to **Pages** → **Create a project**
3. Select **Connect to Git**
4. Choose your GitHub account and `InjuredWorkersUnite` repository
5. Build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output directory:** `.next`
   - **Root directory:** (leave empty)
6. Click **Save and Deploy**

Cloudflare will automatically:
- Build your project
- Deploy to `injuredworkersunite.pages.dev`
- Enable Web Analytics with your token
- Serve pages globally through Cloudflare's CDN

### Step 5: Verify Analytics is Working

1. Visit **https://injuredworkersunite.pages.dev**
2. Wait 1-2 minutes
3. Go to Cloudflare Dashboard → **Analytics & Logs** → **Web Analytics**
4. You should see visitor data appearing

---

## File Structure

```
pages/
├── _app.js ..................... App component
├── _document.js ................ HTML document with analytics
├── index.js .................... Homepage
.
├── package.json ................ Dependencies
├── next.config.js .............. Next.js config
└── .env.local .................. Environment variables
```

---

## Cloudflare Analytics Script

The Web Analytics script in `_document.js` is automatically injected into every page and:
- Tracks visitor data (no cookies)
- Reports page views to Cloudflare
- Uses minimal bandwidth
- Doesn't slow down your site

---

## Environment Variables (Optional)

Currently set in `.env.local` (can be left as-is for analytics):
- `CLOUDFLARE_API_TOKEN` — For API access (not needed for basic analytics)
- `CLOUDFLARE_ACCOUNT_ID` — For API access (not needed for basic analytics)

---

## Troubleshooting

### "Analytics token not found"
→ Ensure you've replaced `YOUR_CLOUDFLARE_MEASUREMENT_TOKEN_HERE` with your actual token

### "No data appearing in dashboard"
→ Wait 2-3 minutes after deployment
→ Visit your site at least once to trigger data collection
→ Check that hostname matches exactly: `injuredworkersunite.pages.dev`

### "Build fails on Cloudflare Pages"
→ Check that `pages/` directory exists
→ Verify `package.json` and `next.config.js` are in root directory
→ Check build logs in Cloudflare Dashboard

---

## Production Readiness Checklist

- [ ] Get Cloudflare measurement token
- [ ] Add token to `pages/_document.js`
- [ ] Commit changes to git
- [ ] Connect GitHub repo to Cloudflare Pages
- [ ] Verify deployment succeeds
- [ ] Test site at `injuredworkersunite.pages.dev`
- [ ] Confirm analytics data is appearing
- [ ] Site is live! 🎉

---

## Resources

- **Cloudflare Pages:** https://pages.cloudflare.com/
- **Cloudflare Web Analytics:** https://developers.cloudflare.com/analytics/web-analytics/
- **Next.js:** https://nextjs.org/docs
- **Deployment Guide:** https://developers.cloudflare.com/pages/get-started/

---

**Status:** Ready to deploy
**Hostname:** injuredworkersunite.pages.dev
**Framework:** Next.js 14 + React 18
**Last Updated:** November 14, 2025
