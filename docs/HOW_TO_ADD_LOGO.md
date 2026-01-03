# How to Add Your Logo

## Quick Steps:

1. **Save the logo image** (the bandaged fist with Canadian flag):
   - Right-click the image you attached
   - Save as: `logo.png`
   
2. **Copy to the right location**:
   ```
   Copy the file to:
   C:\Users\bookw\OneDrive\Desktop\injured workers unite\1-InjuredWorkersUnite\public\logo.png
   ```

3. **Push to GitHub**:
   ```bash
   cd "C:\Users\bookw\OneDrive\Desktop\injured workers unite\1-InjuredWorkersUnite"
   git add public/logo.png
   git commit -m "Add logo image"
   git push origin master
   ```

4. **Wait for Cloudflare deployment** (about 1-2 minutes)

5. **View your site** with the logo at:
   https://injuredworkersunite.pages.dev/

## Logo Specifications:
- **Current**: The image will work as-is
- **Recommended size**: 300x300 pixels or larger
- **Format**: PNG with transparent background (best), or JPG
- **What it shows**: Bandaged fist over Canadian maple leaf with "INJURED WORKERS UNITE" banner

## If Logo Doesn't Show:
The Header.js has a fallback - if the image fails to load, it will show larger text instead of the image. Both ways look good!

## Your Logo Location:
```
public/
  └── logo.png  ← Place your image here
```
