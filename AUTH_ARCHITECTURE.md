# Auth Architecture in Next.js App Router

## The Problem

In Next.js App Router, you have two types of components:

1. **Server Components** (default):
   - Can export `metadata` for SEO
   - Can't use hooks (`useState`, `useEffect`, `useContext`)
   - Can't use browser APIs
   - Better for SEO and performance

2. **Client Components** (`"use client"`):
   - Can use hooks and context
   - Can use browser APIs
   - Can't export `metadata`
   - Required for interactivity

## Current Setup

Your `AuthContext` is a **client component** because it uses:
- `useState` and `useEffect` hooks
- Browser APIs (localStorage, cookies)

## Best Practices

### ✅ Option 1: Server Component Page (Recommended for Static Content)

Keep `page.tsx` as a server component when you don't need auth interactivity:

```tsx
// app/page.tsx (Server Component)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  // No hooks, no context - just render content
  return (
    <main>
      <h1>Welcome</h1>
    </main>
  );
}
```

**When to use:**
- Static content pages
- Pages that don't need real-time auth state
- Better SEO and performance

### ✅ Option 2: Client Component for Auth-Dependent UI

If you need to show different content based on auth state:

```tsx
// app/components/HomeContent.tsx (Client Component)
"use client";

import { useAuth } from "@/app/contexts/AuthContext";

export default function HomeContent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (user) {
    return <div>Welcome back, {user.email}!</div>;
  }
  
  return <div>Please log in</div>;
}

// app/page.tsx (Server Component)
import type { Metadata } from "next";
import HomeContent from "./components/HomeContent";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main>
      <HomeContent />
    </main>
  );
}
```

### ✅ Option 3: Server-Side Auth Check (Best for Protected Routes)

For pages that need auth but don't need real-time updates:

```tsx
// app/dashboard/page.tsx (Server Component)
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
    </main>
  );
}
```

**When to use:**
- Protected routes
- Server-side rendering with auth
- Better SEO (content is in HTML)

## Your Current Architecture

```
layout.tsx (Server Component)
  └── AuthProvider (Client Component)
      └── {children} (Server Components by default)
          └── page.tsx (Server Component) ✅
```

This is **correct**! The `AuthProvider` wraps everything, so any client component can use `useAuth()`, but pages can remain server components.

## When to Use Each Approach

| Scenario | Approach | Example |
|----------|----------|---------|
| Static content | Server Component | Home page, About page |
| Auth-dependent UI | Client Component | User profile, personalized dashboard |
| Protected route | Server Component + redirect | Admin pages, user settings |
| Real-time updates | Client Component | Live notifications, chat |

## Summary

✅ **Keep `page.tsx` as a server component** when:
- You don't need auth interactivity
- You want better SEO
- Content is mostly static

✅ **Use client components** when:
- You need real-time auth state
- You need user interactions based on auth
- You need browser APIs

✅ **Use server-side auth** when:
- You need to protect routes
- You want server-rendered content based on auth
- You want better SEO for authenticated content

