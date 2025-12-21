# How to Verify SEO Content

## Quick Methods (Right Now)

### Method 1: View Page Source (Easiest)

1. **Start your dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Open your browser** to `http://localhost:3000`

3. **View page source**:
   - **Chrome/Edge**: Right-click → "View Page Source" or `Ctrl+U` (Windows) / `Cmd+Option+U` (Mac)
   - **Firefox**: Right-click → "View Page Source" or `Ctrl+U` (Windows) / `Cmd+U` (Mac)
   - **Safari**: Right-click → "Show Page Source" or `Cmd+Option+U`

4. **Look for these tags** in the `<head>` section:
   ```html
   <title>Barbell Plate Calculator | Shred City</title>
   <meta name="description" content="Calculate barbell plate loading instantly...">
   <meta property="og:title" content="Shred City - Barbell Plate Calculator">
   <meta property="og:description" content="Fast, equipment-aware barbell...">
   <meta name="twitter:card" content="summary_large_image">
   <!-- etc. -->
   ```

### Method 2: Browser DevTools (Most Detailed)

1. **Open DevTools**:
   - `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - `Cmd+Option+I` (Mac)
   - Right-click → "Inspect"

2. **Go to Elements/Inspector tab**

3. **Find the `<head>` element** and expand it

4. **Look for meta tags** - you should see:
   - `<title>` tag
   - `<meta name="description">`
   - `<meta property="og:*">` tags (Open Graph)
   - `<meta name="twitter:*">` tags
   - `<meta name="keywords">`
   - `<link rel="canonical">`

5. **Or use the Console** to check:
   ```javascript
   // Check title
   document.title

   // Check description
   document.querySelector('meta[name="description"]')?.content

   // Check all meta tags
   Array.from(document.querySelectorAll('meta')).forEach(meta => {
     console.log(meta.getAttribute('name') || meta.getAttribute('property'), meta.content);
   })
   ```

### Method 3: Online SEO Tools (After Deployment)

Once your site is live, use these tools:

#### Google Rich Results Test
- **URL**: https://search.google.com/test/rich-results
- Enter your URL
- Shows how Google sees your page
- Checks structured data (when you add it)

#### Meta Tags Inspector
- **URL**: https://metatags.io/
- Paste your URL
- Visual preview of how your page appears on social media
- Shows all meta tags

#### Facebook Sharing Debugger
- **URL**: https://developers.facebook.com/tools/debug/
- Enter your URL
- See how Facebook sees your Open Graph tags
- Useful for troubleshooting social sharing

#### Twitter Card Validator
- **URL**: https://cards-dev.twitter.com/validator
- Enter your URL
- Preview how your Twitter card looks
- Validates Twitter Card metadata

#### SEO Checker Tools
- **Ahrefs Webmaster Tools**: Free SEO audit
- **Google Search Console**: After deployment, submit your sitemap
- **Screaming Frog SEO Spider**: Desktop tool for crawling (free for small sites)

### Method 4: Command Line Check (Local Development)

You can use `curl` to fetch and inspect the HTML:

```bash
# Get the HTML and grep for meta tags
curl -s http://localhost:3000 | grep -i '<title\|<meta' | head -20

# Or save to file and inspect
curl -s http://localhost:3000 > page-source.html
# Then open in text editor
```

### Method 5: Next.js Build Output

1. **Build your app**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Check the built HTML** in `.next/server/app/page.html` (or similar)

   Note: In Next.js App Router, metadata is injected at runtime, so viewing the static files won't show the final output. Use the browser methods instead.

## What You Should See

### Expected Meta Tags

When you inspect your page, you should find:

```html
<!-- Title -->
<title>Barbell Plate Calculator | Shred City</title>

<!-- Description -->
<meta name="description" content="Calculate barbell plate loading instantly...">

<!-- Keywords -->
<meta name="keywords" content="barbell calculator, plate calculator, weightlifting calculator...">

<!-- Open Graph (Facebook, LinkedIn, etc.) -->
<meta property="og:type" content="website">
<meta property="og:title" content="Shred City - Barbell Plate Calculator">
<meta property="og:description" content="Fast, equipment-aware barbell...">
<meta property="og:url" content="/">
<meta property="og:site_name" content="Shred City">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Shred City - Barbell Plate Calculator">
<meta name="twitter:description" content="Fast, equipment-aware barbell...">

<!-- Robots -->
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

<!-- Canonical URL -->
<link rel="canonical" href="...">
```

## Quick Verification Checklist

- [ ] Title tag appears in `<head>`
- [ ] Description meta tag is present
- [ ] Open Graph tags (`og:*`) are present
- [ ] Twitter Card tags are present
- [ ] Keywords meta tag is present
- [ ] Canonical link is present
- [ ] Robots meta tag is set correctly

## Troubleshooting

**If you don't see the meta tags:**

1. **Clear browser cache** and hard refresh (`Ctrl+Shift+R` or `Cmd+Shift+R`)
2. **Check the dev server is running** (`npm run dev`)
3. **Verify the metadata is exported correctly** in `layout.tsx` and `page.tsx`
4. **Check browser console** for any errors
5. **Try a different browser** or incognito mode

## After Deployment

Once deployed to Vercel/Netlify:

1. Use the online tools above with your live URL
2. Submit your sitemap to Google Search Console
3. Test social sharing by posting your URL on Twitter/Facebook/LinkedIn
4. Use Google's "Fetch as Google" in Search Console to see how Googlebot sees your page

