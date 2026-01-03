# Blog System Documentation

## Overview
Automated daily blog system that highlights one feature of InjuredWorkersUnite website per day.

## Components Created

### 1. Blog Page (`/pages/blog.js`)
- Displays all blog posts in a grid layout
- Category filtering system
- Responsive design matching site theme
- Links to featured pages

### 2. Blog Data (`/public/data/blog-posts.json`)
- JSON file storing all blog posts
- Contains 8 initial posts covering all major features
- Auto-updated by GitHub Actions

### 3. Post Generator (`/scripts/generate-daily-blog-post.js`)
- Automated script that creates new blog posts
- Rotates through 8 feature categories:
  - The EYE
  - Monitoring
  - Target Acquisition
  - Memetic Embassy
  - Alerts
  - Meme Gallery
  - Legislative Tracking
  - Legal Framework
- Multiple variants for each category to avoid repetition

### 4. GitHub Actions Workflow (`/.github/workflows/daily-blog-post.yml`)
- Runs daily at 9:00 AM UTC (4:00 AM EST/5:00 AM EDT)
- Automatically generates new post
- Commits and pushes to repository
- Can also be triggered manually

## How It Works

1. **Daily Automation**: GitHub Actions runs the generator script every morning
2. **Smart Rotation**: Script checks last post and generates next feature in rotation
3. **Variant Selection**: Cycles through different content variants for each feature
4. **Auto-Publish**: New post is committed to repository and deployed via Cloudflare Pages

## Manual Usage

### Generate a Post Manually
```bash
npm run blog:generate
```

### Preview Recent Posts
```bash
npm run blog:preview
```

### Trigger GitHub Action Manually
1. Go to GitHub repository
2. Click "Actions" tab
3. Select "Generate Daily Blog Post"
4. Click "Run workflow"

## Content Strategy

Each feature has multiple content variants covering:
- **Overview**: What the feature does
- **How it works**: Technical details
- **Why it matters**: Impact and benefits
- **Use cases**: Practical applications

Posts rotate through all 8 features, then repeat with different content variants.

## Customization

### Add New Feature Category
Edit `/scripts/generate-daily-blog-post.js`:

```javascript
'New Feature': {
  emoji: '🎯',
  category: 'New Feature',
  variants: [
    {
      title: "Feature Title",
      excerpt: "Description...",
      keyFeatures: ["Feature 1", "Feature 2"]
    }
  ],
  ctaText: "Explore →",
  ctaLink: "/new-feature"
}
```

### Add New Variant to Existing Feature
Add to the `variants` array in the feature template.

### Change Publishing Schedule
Edit `.github/workflows/daily-blog-post.yml`:
```yaml
schedule:
  - cron: '0 14 * * *'  # 2:00 PM UTC
```

## File Structure
```
/pages/blog.js                          # Blog page component
/public/data/blog-posts.json            # Blog post data
/scripts/generate-daily-blog-post.js    # Generator script
/.github/workflows/daily-blog-post.yml  # Automation workflow
```

## Verification

After deployment, visit:
- Blog page: `https://injuredworkersunite.pages.dev/blog`
- Check GitHub Actions: Repository → Actions tab
- View commits: Look for "🤖 Auto-generated daily blog post"

## Notes

- Posts are never duplicated on the same date
- Script checks for existing posts before generating
- All changes auto-deploy via Cloudflare Pages
- Blog link added to main navigation header
- Featured on homepage with call-to-action

## Future Enhancements

Possible additions:
- RSS feed for blog
- Social media auto-posting
- Email notifications
- Blog post commenting (external service)
- Analytics on popular posts
- SEO optimization per post
