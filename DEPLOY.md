# Deployment Guide

## Deploy to Vercel (Recommended)

### Quick Deploy

1. **Push your code to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Sign up/Login to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (recommended)

3. **Import your repository**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings

4. **Configure (optional)**:
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

5. **Deploy**:
   - Click "Deploy"
   - Wait ~2 minutes for build to complete

6. **Add Custom Domain**:
   - Go to your project → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions
   - Vercel provides automatic HTTPS certificates

### Environment Variables
If you add any later (e.g., Supabase keys), add them in:
Project → Settings → Environment Variables

## Alternative: Deploy to Netlify

If you prefer Netlify:

1. **Push to GitHub** (same as above)

2. **Sign up at Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

3. **Add new site**:
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repo

4. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: (leave empty for now)

5. **Optional: Create `netlify.toml`**:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

6. **Deploy**:
   - Click "Deploy site"

7. **Add Custom Domain**:
   - Site settings → Domain management → Add custom domain

## Notes

- Both services offer free HTTPS certificates
- Both support automatic deployments from Git pushes
- Both free tiers are sufficient for this calculator app
- Vercel is recommended due to optimized Next.js support

