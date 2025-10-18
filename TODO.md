# Shred City - TODO & Roadmap

## Planning Phase ✅ COMPLETE

### Decision Points ✅

- [x] Choose platform → **Web-first (PWA)**
- [x] Choose tech stack → **Next.js 14 + TypeScript + Supabase + IndexedDB**
- [x] Choose auth → **Supabase Auth (Google + Apple OAuth)**
- [x] Choose design system → **TailwindCSS + Shadcn/ui (optional)**
- [x] Finalize MVP feature set → **See PLAN.md Phase 1**
- [ ] Define monetization strategy (deferred - focus on MVP)

### Design Work (Next Up)

- [ ] Create wireframes for core screens:
  - [ ] Sign-in screen
  - [ ] Home screen (Start Workout options)
  - [ ] Active Workout screen (the critical screen)
  - [ ] Exercise selection
  - [ ] Set logging interface
  - [ ] History view
- [ ] Define color palette and branding
- [ ] Choose typography
- [ ] Create app icon and splash screen (later)
- [ ] Dark mode color scheme

---

## Phase 1: MVP Development

### Setup & Infrastructure

- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Set up TailwindCSS
- [ ] Configure Supabase project
  - [ ] Create Supabase account/project
  - [ ] Set up Google OAuth credentials
  - [ ] Set up Apple Sign In credentials (later)
  - [ ] Configure Supabase Auth in Next.js
- [ ] Set up local database layer
  - [ ] Install and configure Dexie.js (IndexedDB wrapper)
  - [ ] Create database schema in Dexie
  - [ ] Test local CRUD operations
- [ ] Set up TanStack Query for cache management
- [ ] Configure PWA manifest and service worker
- [ ] Set up Vercel project for deployment
- [ ] Create basic folder structure and routing

### Data Layer

**Dual Database Setup:**

**Supabase (Cloud):**

- [ ] Define PostgreSQL schema (tables, relationships, RLS policies)
- [ ] Create migrations for:
  - [ ] users (profiles)
  - [ ] exercises (exercise library)
  - [ ] workout_templates
  - [ ] workout_sessions
  - [ ] exercise_instances
  - [ ] sets
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create seed data for exercise library
- [ ] Test CRUD operations via Supabase client

**IndexedDB (Local):**

- [ ] Define Dexie schema (mirror of Supabase)
- [ ] Create TypeScript types/interfaces (shared between both DBs)
- [ ] Implement local CRUD operations
- [ ] Create seed data sync (download exercises on first load)

**Sync Layer:**

- [ ] Build sync queue for pending operations
- [ ] Implement background sync worker
- [ ] Add online/offline detection
- [ ] Create conflict resolution logic (last-write-wins for MVP)
- [ ] Test sync with Supabase Realtime subscriptions

### Core Features

#### Exercise Library

- [ ] Create exercise database (20-30 common exercises for MVP)
- [ ] Implement exercise search/filter
- [ ] Exercise detail view with instructions
- [ ] Categorize by muscle group and equipment

#### Workout Logging

- [ ] "Start Workout" flow
- [ ] Exercise selection screen
- [ ] Set entry interface (weight + reps)
- [ ] Previous set display (for reference)
- [ ] Complete/save set functionality
- [ ] Rest timer between sets
  - [ ] Auto-start option
  - [ ] Customizable duration
  - [ ] Sound/vibration notification
- [ ] Add/remove exercises during workout
- [ ] Workout notes
- [ ] Complete/cancel workout
- [ ] Workout duration tracking

#### Workout Routines

- [ ] Create routine builder
- [ ] Add exercises to routine
- [ ] Define default sets/reps per exercise
- [ ] Name and save routine
- [ ] Edit existing routine
- [ ] Delete routine
- [ ] Start workout from routine (pre-populate exercises)
- [ ] Schedule routines to specific days

#### History & Progress

- [ ] Workout history list view
- [ ] View past workout details
- [ ] Exercise history (view all sessions for one exercise)
- [ ] Basic progress graph (weight over time for exercise)
- [ ] Personal Records (PRs) display
  - [ ] Auto-detect and record PRs
  - [ ] PR notification when achieved
- [ ] Delete workout from history

#### Home/Dashboard

- [ ] Display today's scheduled workout (if any)
- [ ] Quick stats (workouts this week, current streak)
- [ ] Recent PRs
- [ ] "Start Workout" button
- [ ] Quick access to routine library

### UI/UX Polish

- [ ] Implement smooth animations/transitions
- [ ] Loading states
- [ ] Error handling and user feedback
- [ ] Empty states (no workouts, no routines)
- [ ] Dark mode support
- [ ] Haptic feedback on key actions

### Testing & Quality

- [ ] Test on physical devices
- [ ] Performance profiling
- [ ] Test offline functionality
- [ ] Edge case testing (delete in-progress workout, etc.)
- [ ] User testing with 3-5 target users

---

## Phase 2: Enhanced Features

### Advanced Analytics

- [ ] Volume tracking (weekly/monthly)
- [ ] 1RM calculator
- [ ] 1RM progress tracking
- [ ] Body weight tracking
- [ ] Body measurements (chest, arms, waist, etc.)
- [ ] Workout intensity graphs
- [ ] Consistency calendar view

### Progression & Programming

- [ ] Progressive overload suggestions
- [ ] Auto-increment weight feature
- [ ] Program templates (Starting Strength, 5/3/1, PPL)
- [ ] Deload week scheduling
- [ ] Warmup set calculator
- [ ] Plate calculator (what plates to load on bar)

### User Experience Improvements

- [ ] Workout templates (beyond routines - save specific sessions)
- [ ] Clone previous workout
- [ ] Exercise substitutions
- [ ] Super-set support
- [ ] Drop-set support
- [ ] RPE (Rate of Perceived Exertion) tracking
- [ ] Notes per exercise/set
- [ ] Rest timer presets per exercise

### Data Management

- [ ] Export workout data (CSV/JSON)
- [ ] Import workout data
- [ ] Backup/restore functionality
- [ ] Multi-device sync (requires backend)

---

## Phase 3: Premium & Growth

### Backend & Sync

- [ ] Set up backend service
- [ ] User authentication
- [ ] Cloud data sync
- [ ] Conflict resolution (offline edits)
- [ ] Account management

### Social Features (Optional)

- [ ] User profiles
- [ ] Share workouts
- [ ] Activity feed
- [ ] Friends/following system
- [ ] Achievement badges
- [ ] Challenges/competitions

### Integrations

- [ ] Apple Health integration (iOS)
- [ ] Google Fit integration (Android)
- [ ] Export to Apple Health/Google Fit
- [ ] Calendar app integration

### Monetization

- [ ] Implement payment system
- [ ] Premium tier features
- [ ] Subscription management
- [ ] Restore purchases

### Marketing & Launch

- [ ] App Store listing (screenshots, description)
- [ ] Landing page
- [ ] Beta testing program (TestFlight / Play Store Beta)
- [ ] Social media presence
- [ ] App Store Optimization (ASO)

---

## Future Ideas (Post-Launch)

- [ ] Video demonstrations for exercises
- [ ] Form check reminders based on time since learning
- [ ] AI-powered workout suggestions
- [ ] Nutrition tracking integration
- [ ] Workout music integration
- [ ] Gym finder / check-in
- [ ] Personal trainer marketplace
- [ ] Custom exercise creation
- [ ] Barcode scanner for equipment
- [ ] Voice logging ("log 225 for 5 reps")
- [ ] Apple Watch / Wear OS app
- [ ] Web dashboard

---

## Bug Tracking

_As bugs are discovered, track them here_

### High Priority

- None yet

### Medium Priority

- None yet

### Low Priority

- None yet

---

## Notes & Decisions Log

_Keep track of important decisions and rationale here_

### **October 18, 2025** - Planning Phase Complete

**Tech Stack Finalized:**

- Next.js 14 (App Router) + TypeScript
- Supabase (Auth + Postgres)
- IndexedDB + Dexie.js (local storage)
- TailwindCSS + Shadcn/ui
- PWA configuration
- Vercel deployment

**Key Architecture Decisions:**

- **Offline-first**: All writes to IndexedDB first (< 10ms), sync to cloud in background
- **Auth**: Google OAuth + Apple Sign In (via Supabase)
- **Per-side weight tracking**: Store weight as per-side for barbells, per-hand for dumbbells
- **Series markers**: A/B/C for organizing exercises (main lifts vs supersets)
- **Reps-last entry**: Enter weight before set, log reps after completion
- **Auto-save**: No manual save button, save as you go
- **Multi-device conflicts**: Last-write-wins with timestamps for MVP (defer complex merging)

**MVP Scope:**

- Focus on workout logging speed (30-second rest period target)
- Start empty workout OR from last week's workout
- Exercise library (strength-focused)
- Equipment type selection per exercise (Barbell, Dumbbell, Kettlebell, Trap Bar, Landmine)
- History view
- NO rest timer for MVP (Phase 2)
- NO PRs/analytics for MVP (Phase 2)
- NO bodyweight exercise handling for MVP (deferred)

**Development Approach:**

- Hybrid learning/building model
- Brenden drives when comfortable, AI assists on complex parts
- Explain everything, no magic
- Document decisions and patterns as we go

**Deferred Decisions:**

- Monetization strategy
- Bodyweight exercise handling
- Mid-workout editing capabilities
- Calendar view alternative
- Social features
