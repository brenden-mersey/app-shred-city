# Shred City

Shred City starts as a fast, equipment-aware barbell and plate calculator built for lifters who think in per-side weight. No more mental math between sets—punch in your target, get your plate breakdown instantly.

## Current Focus (v0.1)

Shipping a genuinely useful plate calculator:

- **Barbell plate calculator** — enter target weight, get plate breakdown
- **Per-side loading logic** — see what goes on each side of the bar
- **Equipment settings** — configure bar weight, available plates, and units
- **Local persistence** — your settings survive browser refreshes
- **Deployed web app** — works on any device, no install required

## Future Direction (Post v0.1)

Once the calculator ships, we build the tracker platform:

- Workout session logging (exercises, sets, reps, weights)
- Exercise library (strength-focused, equipment-aware)
- Offline-first architecture with cloud sync
- Progress tracking and analytics
- Programs, routines, and periodization

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font).

## Tech Stack

**Current (v0.1):**

- Next.js (App Router) + TypeScript
- SCSS + CSS Modules
- Client-side state + localStorage
- Deployment: GitHub → Vercel or Netlify

**Future (Post v0.1):**

- Supabase (Auth + Postgres)
- IndexedDB + Dexie.js (offline storage)
- TanStack Query (cache management)
- PWA configuration

## Documentation

- **[PLAN.md](./PLAN.md)** — Architecture, phasing, and decisions
- **[TODO.md](./TODO.md)** — Active tasks and roadmap

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Philosophy

Built for lifters who value speed over features. Ship small, prove usefulness, grow deliberately.
