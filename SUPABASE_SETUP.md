# Supabase Auth Setup Guide

This guide will walk you through setting up Supabase authentication with Google OAuth for Shred City.

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - **Name**: Shred City (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
5. Click "Create new project" and wait for it to initialize (~2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Project Settings** → **API** (or **API Keys** in the left sidebar).
2. Under **Publishable and secret API keys**, you'll need:
   - **Project URL** — use this for `NEXT_PUBLIC_SUPABASE_URL` (e.g., `https://xxxxx.supabase.co`)
   - **Publishable key** — use this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`. It’s in the **Publishable key** section (the key may look like `sb_publishable_...`). This is the key safe to use in the browser when RLS is enabled.

## Step 3: Set Up Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- **NEXT_PUBLIC_SUPABASE_URL**: Copy the **Project URL** from the API settings.
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Copy the **Publishable key** from the “Publishable key” section (not a secret key).

**For production**, update `NEXT_PUBLIC_SITE_URL` to your actual domain (e.g., `https://shred-city.ca`).

## Step 4: Configure Google OAuth

### 4.1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure the OAuth consent screen if prompted:
   - Choose **External** (unless you have a Google Workspace)
   - Fill in the required fields (App name, User support email, etc.)
   - Add your email to test users
6. Create OAuth client ID:
   - **Application type**: Web application
   - **Name**: Shred City (or your app name)
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - `https://your-domain.com` (for production)
   - **Authorized redirect URIs**:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - (You'll get this from Supabase in the next step)
7. Click **Create**
8. Copy the **Client ID** and **Client Secret**

### 4.2: Configure Google OAuth in Supabase

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** in the list and click to configure it
3. Enable Google provider
4. Paste your **Client ID** and **Client Secret** from Google Cloud Console
5. Copy the **Redirect URL** shown in Supabase (it looks like `https://xxxxx.supabase.co/auth/v1/callback`)
6. Go back to Google Cloud Console and add this redirect URI to your OAuth client:
   - **Authorized redirect URIs**: Add the Supabase callback URL
7. Save the changes in both Google Cloud Console and Supabase

## Step 5: Test the Setup

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`
3. Click "Continue with Google"
4. You should be redirected to Google's sign-in page
5. After signing in, you should be redirected back to your app

## Step 6: (Optional) Configure Protected Routes

The middleware is currently set up to protect all routes except:

- `/login`
- `/auth/*` (auth callbacks)
- `/` (home page)

To customize which routes are protected, edit `middleware.ts` in the root of your project.

## Troubleshooting

### "Invalid redirect URI" error

- Make sure the redirect URI in Google Cloud Console matches exactly what Supabase shows
- Check that you've added both `http://localhost:3000` and your production domain

### "Redirect URI mismatch" error

- Verify the redirect URIs in Google Cloud Console include the Supabase callback URL
- Make sure there are no trailing slashes or extra characters

### Environment variables not loading

- Restart your Next.js dev server after adding `.env.local`
- Make sure the file is in the root directory (same level as `package.json`)
- Check that variable names start with `NEXT_PUBLIC_` for client-side access

### User not redirecting after login

- Check the browser console for errors
- Verify your `NEXT_PUBLIC_SITE_URL` is set correctly
- Make sure the callback route handler is working (`/auth/callback`)

## Next Steps

Once authentication is working:

- Add user profile management
- Connect to Supabase database for workout storage
- Implement data syncing between devices
- Add more OAuth providers (Apple, GitHub, etc.) if needed

## Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
