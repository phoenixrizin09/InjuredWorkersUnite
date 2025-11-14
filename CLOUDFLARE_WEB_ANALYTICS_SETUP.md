# Cloudflare Web Analytics Setup Guide

## Current Status
✅ **Git Branch:** Now using `main` (upgraded from `master`)
⏳ **Cloudflare Analytics:** Needs hostname configuration

---

## What You Need to Do

Cloudflare Web Analytics requires a **hostname** to track your website visitors. This is the domain where your website will be hosted.

### Step 1: Determine Your Hostname

Choose ONE of the following options:

**Option A: Use a Custom Domain** (Recommended)
- If you own a domain (e.g., `injuredworkersunite.com`)
- Enter: `injuredworkersunite.com`

**Option B: Use Vercel's Default Domain**
- Vercel will assign you: `[project-name].vercel.app`
- Enter: `injuredworkersunite.vercel.app`

**Option C: Use Cloudflare Pages Domain**
- Cloudflare will assign you: `[project-name].pages.dev`
- Enter: `injuredworkersunite.pages.dev`

### Step 2: Configure in Cloudflare Dashboard

1. Go to **https://dash.cloudflare.com**
2. Select your zone (domain)
3. Go to **Analytics & Logs** → **Web Analytics**
4. Click **Add Site**
5. Enter your hostname from Step 1
6. Copy the **Measurement Token**

### Step 3: Add Token to Your Code

Add the Web Analytics script to your Next.js app. Update `/pages/_document.js` or `/pages/_app.js`:

```javascript
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        defer
        src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "YOUR_MEASUREMENT_TOKEN_HERE"}'
      />
      <Component {...pageProps} />
    </>
  );
}
```

### Step 4: Deploy and Verify

1. Deploy your app to your chosen hosting (Vercel, Cloudflare Pages, etc.)
2. Visit your website
3. In Cloudflare Analytics, you should see data appearing within a few minutes

---

## Recommended Setup

For **Injured Workers Unite**, we recommend:

**Hosting Option:** Vercel (already configured in `vercel.json`)
**Hostname:** `injuredworkersunite.vercel.app` (automatically assigned)

Once deployed to Vercel, you'll use that exact domain for Cloudflare Analytics.

---

## Next Steps

1. **Deploy to Vercel** (if not already done)
   ```bash
   npm run build
   vercel deploy
   ```

2. **Get your Vercel domain** from the deployment output

3. **Create Cloudflare Web Analytics site** with that domain

4. **Copy the measurement token** and add it to your app

5. **Redeploy** with the analytics code included

---

## Questions?

- **Cloudflare Docs:** https://developers.cloudflare.com/analytics/web-analytics/
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Script Component:** https://nextjs.org/docs/api-reference/next/script

---

**Status:** Ready for configuration
**Last Updated:** November 14, 2025
