# Shred City - TODO & Roadmap

## Phase 0 — Calculator MVP (ACTIVE)

Ship a fast, useful plate calculator. Nothing else until this is live.

---

### Setup

- [x] Initialize Next.js project with App Router + TypeScript
- [x] Install and configure SCSS + CSS Modules
- [x] Create GitHub repository
- [x] Set up deployment (Vercel or Netlify)
- [x] Basic folder structure and routing

---

### Core Calculator

- [ ] Target weight input (number field)
- [ ] Bar weight setting (45lb default, editable)
- [ ] Plate inventory editor (which plates are available)
- [x] Unit toggle (lbs / kg)
- [x] Per-side calculation logic
- [ ] Display: plates needed per side
- [ ] Display: achieved weight vs target weight
- [ ] Display: difference (if plates can't hit exact target)

---

### Persistence

- [ ] Save settings to localStorage (bar weight, plates, units)
- [ ] Restore settings on page load
- [ ] Clear / reset option

---

### UX

- [ ] Clean, fast input UI
- [ ] Mobile-friendly layout (touch targets, responsive)
- [ ] Zero-friction interactions (no unnecessary modals or steps)
- [ ] Instant feedback on input changes
- [ ] Dark mode support

---

### Deployment

- [ ] Production build passes
- [ ] Live URL accessible
- [ ] Test on mobile devices
- [ ] Share link for feedback

---

## Deferred — Tracker Platform (Post-Calculator)

Everything below waits until the calculator ships.

### Tracking Foundations (Phase 1)

- Exercise library (20-30 strength movements)
- Workout session logging (start/end, exercises, sets, reps)
- Set entry: weight per-side, reps, equipment type
- Series markers (A/B/C) for exercise grouping
- History view (past sessions)
- IndexedDB + Dexie.js local storage
- PWA configuration

### Sync & Progress (Phase 2)

- Supabase Auth (Google + Apple OAuth)
- Cloud database (PostgreSQL)
- Background sync engine
- Conflict resolution (last-write-wins)
- Personal records (PRs) tracking
- Progress graphs (weight over time)
- Volume tracking
- 1RM calculator
- Workout streaks

### Expansion (Phase 3)

- Program templates (5×5, 5/3/1, PPL, GVT)
- Progressive overload automation
- Deload scheduling
- Warmup set calculator
- Rest timer with notifications
- Apple Health / Google Fit integration
- Data export/import
- Premium tier / monetization
- Native wrapper (Capacitor)

### Future Ideas

- Video exercise demos
- Voice logging
- Apple Watch / Wear OS app
- AI workout suggestions
- Social features (profiles, sharing, challenges)

---

## Guiding Rule

> If a feature slows down shipping the calculator, it waits.
> Ship small. Prove usefulness. Grow deliberately.
