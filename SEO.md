# SEO Guide for Shred City

## Where SEO Content Lives

### 1. **Root Layout** (`src/app/layout.tsx`)
**Purpose:** Site-wide SEO defaults that apply to all pages

**What goes here:**
- Default title and description
- Open Graph tags (for social sharing)
- Twitter Card metadata
- Site-wide keywords
- Robots directives
- Canonical URLs
- Site verification codes

**Example:**
```typescript
export const metadata: Metadata = {
  title: {
    default: "Shred City - Barbell Plate Calculator",
    template: "%s | Shred City", // Template for page titles
  },
  description: "Your site description...",
  // ... more metadata
};
```

### 2. **Page-Specific Metadata** (`src/app/page.tsx` or any page)
**Purpose:** Override or extend metadata for specific pages

**What goes here:**
- Page-specific title (uses template from layout)
- Page-specific description
- Page-specific Open Graph images
- Page-specific canonical URLs

**Example:**
```typescript
export const metadata: Metadata = {
  title: "Specific Page Title", // Becomes "Specific Page Title | Shred City"
  description: "Page-specific description...",
};
```

### 3. **Structured Data** (JSON-LD)
**Location:** Can be added to `layout.tsx` or individual pages

**Purpose:** Help search engines understand your content better

**Example:**
```typescript
// In layout.tsx or page.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Shred City",
      description: "Barbell plate calculator...",
      // ... more structured data
    }),
  }}
/>
```

## Current SEO Setup

✅ **Already configured:**
- Title and description
- Open Graph tags
- Twitter Card metadata
- Robots directives
- Keywords

📝 **To add later:**
1. **Open Graph Image** (`/public/og-image.png`)
   - Recommended: 1200x630px
   - Add to `openGraph.images` in metadata

2. **Twitter Image** (`/public/twitter-image.png`)
   - Recommended: 1200x675px
   - Add to `twitter.images` in metadata

3. **Favicon & Icons** (`/public/`)
   - `favicon.ico`
   - `apple-touch-icon.png` (180x180px)
   - Add via Next.js metadata or `<link>` tags

4. **Site URL Environment Variable**
   - Add `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` to `.env.local`
   - Used for absolute URLs in metadata

5. **Structured Data** (JSON-LD)
   - Add schema.org markup for better search results
   - Can mark your app as a "WebApplication" or "SoftwareApplication"

6. **Sitemap** (`src/app/sitemap.ts`)
   - Next.js can auto-generate from your routes
   - Or create manually for more control

7. **robots.txt** (`src/app/robots.ts`)
   - Define which pages search engines can crawl
   - Next.js can auto-generate this

## Quick Wins

1. **Add your actual domain** to `metadataBase` in `layout.tsx`
2. **Create OG images** for social sharing
3. **Add structured data** for rich search results
4. **Set up sitemap** for better crawling

## Testing SEO

- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **Lighthouse** (in Chrome DevTools): Check SEO score

## Next Steps

1. Create and add Open Graph images
2. Set up environment variable for site URL
3. Add structured data (JSON-LD)
4. Generate sitemap
5. Add favicon and app icons

