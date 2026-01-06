# Setting Up Environment Variables in Vercel

The 500 error is likely because your Supabase environment variables aren't set in Vercel.

## Steps to Fix

1. **Go to your Vercel project dashboard**

   - Navigate to your project
   - Click on **Settings** → **Environment Variables**

2. **Add the following environment variables:**

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
   ```

   **Note:** Use your custom domain if you have one connected. If not, use your Vercel domain (e.g., `https://your-app.vercel.app`).

3. **Set them for all environments:**

   - Production
   - Preview
   - Development

4. **Redeploy:**
   - After adding the variables, Vercel will automatically trigger a new deployment
   - Or manually trigger a redeploy from the Deployments tab

## How to Get Your Supabase Values

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Important Notes

- **Variable names must match exactly** (including `NEXT_PUBLIC_` prefix)
- **No quotes needed** - Vercel handles that automatically
- **Redeploy after adding** - Environment variables are only available after a new deployment
- **Check all environments** - Make sure variables are set for Production, Preview, and Development

## Verify It's Working

After redeploying, check:

1. The build should complete successfully
2. No more 500 errors
3. The middleware should work correctly

If you still get errors after setting the variables and redeploying, check the Vercel function logs for more details.
