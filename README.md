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

## Tech Stack

**Current (v0.1):**

- Next.js (App Router) + TypeScript
- TailwindCSS
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

## Philosophy

Built for lifters who value speed over features. Ship small, prove usefulness, grow deliberately.
