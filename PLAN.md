# Shred City - Planning Document

## Project Overview

**Shred City** is a snappy, intuitive weight-training toolkit built for serious strength trainers. We start with a fast plate calculator—then grow into a full workout tracking platform.

### Core Problem

Lifters think in per-side weight. When you load a bar, you think "45+25 per side," not "140 total." Existing calculators are slow, clunky, or buried in bloated apps. We fix that first—then tackle workout logging.

### Core Philosophy

- **Ship visible value early** — start with a working tool, not a grand vision
- **Snappy** — built for 30-second rest periods, instant interactions
- **Intuitive** — track weight the way you actually think about it
- **Strength-focused** — no clutter, no cardio, pure lifting
- **Progress-driven** — simple tracking to facilitate consistent growth

---

## Architectural Principles

1. **Ship visible value early** — a working calculator beats a planned tracker
2. **Local-first / offline-capable** — works in gym dead zones
3. **Speed beats features** — fast and simple wins over slow and complete
4. **Complexity is earned** — add backend, auth, and sync only when needed

---

## Phase 0 — Calculator Foundation (BUILD FIRST)

**Goal:** Ship a genuinely useful plate calculator within days. Faster than Googling.

### Scope

- Target weight input (total or per-side mode)
- Bar weight setting (45lb default, configurable)
- Plate inventory editor (which plates do you have?)
- Unit selection (lbs/kg)
- Per-side calculation output
- Achieved vs target difference display
- Local persistence only (localStorage)

### Explicitly Excluded

- Authentication
- Backend / Supabase
- Workout history UI
- Routines or programs
- Analytics or progress tracking

### Deliverable

A live URL where a lifter can calculate plates faster than any alternative.

---

## Phase 1 — Tracking Foundations

**Goal:** Core local-first workout logging. No backend required yet.

### Scope

- Start workout (empty or from template)
- Exercise library (20-30 strength movements)
- Set logging: weight (per-side), reps, equipment type
- Exercise instances with series markers (A/B/C)
- Workout session: start/end time, notes
- History view (past sessions)
- IndexedDB + Dexie.js for local storage

### Data Models

**Exercise:** name, category, muscle groups, default equipment, instructions

**Workout Session:** date, template name, exercises performed, duration, notes

**Exercise Instance:** exercise ref, equipment type, series marker, sets, notes

**Set:** weight per-side, equipment type, reps, set number, timestamp

**Weight Storage:**

- Store `weight_per_side` + `equipment_type`
- Barbell: "45+25 per side (140 total)"
- Dumbbell/Kettlebell: "50 lb"
- Landmine: "45+25 one side (70 + bar)"

---

## Phase 2 — Sync & Progress

**Goal:** Cloud backup, multi-device sync, and progress visibility.

### Scope

- Supabase Auth (Google OAuth + Apple Sign In)
- PostgreSQL cloud storage
- Background sync engine (local → cloud)
- Conflict resolution (last-write-wins for MVP)
- Personal records (PRs) tracking and notifications
- Basic progress graphs (weight over time)
- Volume tracking (sets × reps × weight)
- 1RM calculator and tracking
- Workout consistency streaks

---

## Phase 3 — Expansion

**Goal:** Programs, integrations, and sustainability.

### Scope

- Program templates (5×5, 5/3/1, PPL, German Volume Training)
- Progressive overload automation
- Deload week scheduling
- Warmup set calculator
- Rest timer with notifications
- Apple Health / Google Fit integration
- Export/import data (CSV/JSON)
- Premium tier and monetization
- Native app wrapper (Capacitor) if needed

---

## Target Users

**Primary:** Serious strength trainers who follow structured programs and need speed above all else.

**Secondary:**

- Powerlifters and strength athletes
- Bodybuilders focused on progressive overload
- Anyone following 5×5, German Volume Training, or similar protocols

---

## Key Differentiators

1. **Per-side weight tracking** — track what you load, not just totals
2. **Equipment-first design** — barbell, dumbbell, kettlebell, trap bar, landmine
3. **Series organization** — A/B/C markers for main lifts and supersets
4. **Previous workout comparison** — see last session while logging
5. **Reps-last entry** — enter weight before set, log reps after

---

## UI/UX Principles

1. **Speed over features** — every screen loads instantly
2. **Smart defaults** — remember last weight/reps, suggest next
3. **Minimal taps** — log a set in 2-3 taps maximum
4. **Clear hierarchy** — important info is prominent
5. **Dark mode ready** — many gyms are dim

---

## Performance Targets

- App launch: < 1 second
- Screen transitions: < 100ms
- Set logging: < 50ms
- Calculator result: instant

---

## Competitive Analysis

| App      | Strength      | Weakness               |
| -------- | ------------- | ---------------------- |
| Strong   | Clean UI      | Heavy, slow            |
| JEFIT    | Feature-rich  | Cluttered              |
| FitNotes | Simple, fast  | Android-only, basic UI |
| Hevy     | Modern design | Social bloat           |

**Our edge:** Faster than Strong, simpler than JEFIT, more visual than FitNotes, more focused than Hevy.

---

## Risk Factors & Mitigations

| Risk                    | Mitigation                                    |
| ----------------------- | --------------------------------------------- |
| App feels too basic     | Focus on polish and speed first               |
| Data loss if local-only | Build export early, add cloud sync in Phase 2 |
| User abandonment        | Ship fast, iterate on feedback                |
| Scope creep             | Stick to phase boundaries                     |

---

## Open Questions

- Free vs Premium model (deferred until post-Phase 1)
- Bodyweight exercise handling (deferred)
- Calendar view alternative (deferred)
- Mid-workout editing capabilities (deferred)

---

## Next Steps

See `TODO.md` for the active Phase 0 checklist.
