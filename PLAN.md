# Shred City - Planning Document

## Project Overview

**Shred City** is a snappy, intuitive weight-training and tracking application built for serious strength trainers who need to log workouts fast, without friction, and in a way that matches how lifters actually think.

### Core Problem

Existing weight training apps are clunky, slow, and don't match how lifters actually work in the gym. When you have 30 seconds between sets, you need to log instantly. When you load a bar, you think "45+25 per side," not "140 total."

### Core Philosophy

- **Snappy**: Built for 30-second rest periods - instant logging, zero lag
- **Intuitive**: Track weight the way you actually think about it (per-side for barbells, per-hand for dumbbells)
- **Strength-Focused**: No clutter, no cardio - pure strength training (5×5, German Volume Training 10×10, etc.)
- **Progress-Driven**: Simple tracking and comparison to previous workouts to facilitate consistent growth
- **Beautiful & Modern**: Thoughtfully designed UI/UX that feels polished and professional

### Key Differentiators

1. **Per-Side Weight Tracking** - Track what you actually load on the bar (45+25 per side), not just total weight
2. **Equipment-First Design** - Select bar type (barbell, dumbbell, kettlebell, trap bar) per exercise
3. **Series Organization** - Group exercises with A/B/C markers for main lifts, supersets, and circuits
4. **Previous Workout Comparison** - See exactly what you did last time, right when logging
5. **Reps-Last Entry** - Enter weight before your set, log reps after completion

---

## Target Users

**Primary**: You - serious strength trainers who follow structured programs and need speed above all else

**Secondary**:

- Powerlifters and strength athletes
- Bodybuilders focused on progressive overload
- Anyone following 5×5, German Volume Training, or similar structured strength protocols

---

## Core Features

### Phase 1: MVP (Minimum Viable Product)

#### 1. Workout Logging - The Core Experience

**Starting a Workout:**

- Select or create a workout (e.g., "Strength Training Mondays", "Alpha Workout")
- Workout templates are editable and track consistency by name

**Exercise Setup:**

- Add exercise from library
- Select equipment type: Barbell, Dumbbell, Kettlebell, Trap Bar, Landmine (one-sided)
- Equipment selection is per-exercise (not per-set)
- Assign series marker: A, B, or C for visual grouping
  - A Series: Main compound lifts (typically single exercise)
  - B/C Series: Supersets/circuits (typically 2+ exercises)

**Logging a Set (The Critical Flow):**

1. Enter weight BEFORE performing the set:
   - For barbells: Enter per-side weight (e.g., "45+25")
   - Display shows: "45+25 per side (140 total)"
   - For dumbbells/kettlebells: Enter per-hand weight (e.g., "50 lb")
2. Perform the set
3. Return and enter reps completed
4. Optional: Copy weight to next set
5. Display previous workout data for reference (last time's weights/reps)

**Exercise Library:**

- Pre-defined exercises (compound lifts + common accessories)
- Focus on strength training movements
- Organized by muscle group and movement pattern

#### 2. Progress Tracking

**During Workout:**

- View previous workout's data for the same exercise
- Track by workout name (e.g., comparing this week's "Strength Training Mondays" to last week's)

**History:**

- Complete workout history organized by date
- View all previous sessions of any workout by name
- Exercise-specific history (all sets/reps/weights for a single movement)

**Future Enhancement:**

- Personal records (PRs) tracking
- Basic progress graphs (weight progression over time)

### Phase 2: Enhanced Features

1. **Rest Timer & Workout Tools**

   - Auto-start rest timer after completing a set
   - Customizable rest periods per exercise
   - Sound/vibration notifications
   - Plate calculator (what plates to load for target weight)

2. **Advanced Analytics & Progress**

   - Volume tracking (sets × reps × weight over time)
   - One-rep max (1RM) calculator and tracking
   - Personal records (PRs) with notifications when beaten
   - Workout consistency streaks and calendar
   - Detailed progress graphs

3. **Program Templates & Periodization**
   - Pre-built programs (5×5, German Volume Training, 5/3/1, etc.)
   - Progressive overload automation
   - Deload week scheduling
   - Warmup set calculator

### Phase 3: Premium Features

1. **AI/ML Features**

   - Smart progression suggestions
   - Form check reminders
   - Fatigue/recovery insights

2. **Integration**
   - Apple Health / Google Fit sync
   - Wearable device integration
   - Calendar integration

---

## Data Models

### Core Entities

#### User

- Profile info (name, preferences)
- Settings (units: kg/lbs, default equipment types)
- Body stats (weight, height) - optional

#### Exercise

- Name (e.g., "Barbell Squat", "Dumbbell Bench Press")
- Category (compound, accessory)
- Muscle groups (primary, secondary)
- Default equipment type (Barbell, Dumbbell, Kettlebell, Trap Bar, Landmine)
- Instructions/form tips (optional)

#### Workout Template

- Name (e.g., "Strength Training Mondays", "Alpha Workout", "German Volume Training - Chest")
- User-editable
- List of planned exercises with:
  - Exercise reference
  - Equipment type
  - Series marker (A, B, or C)
  - Target sets/reps (optional guidance)
- Notes

#### Workout Session

- Date/time started
- Date/time completed
- Template name (for consistency tracking)
- List of exercises performed
- Total duration (auto-calculated)
- Notes

#### Exercise Instance (within a session)

- Exercise reference
- Equipment type (Barbell, Dumbbell, Kettlebell, Trap Bar, Landmine)
- Series marker (A, B, or C)
- List of sets
- Notes

#### Set

- Weight loaded (stored as per-side for barbells, per-hand for dumbbells)
- Equipment type (to know how to calculate total)
- Reps completed
- Set number (within exercise)
- Timestamp (auto)
- Notes (optional)

**Weight Storage Strategy:**

- Store: `weight_per_side` + `equipment_type`
- Display:
  - Barbell: "45+25 per side (140 total)" [per-side + calculated total]
  - Dumbbell/Kettlebell: "50 lb" [just the weight]
  - Landmine: "45+25 one side (70 + bar)" [special case]

#### Personal Record (Phase 2)

- Exercise
- Equipment type
- Weight (total calculated)
- Reps
- Date achieved

---

## Technical Architecture

### Technology Stack (TBD)

**Frontend Options:**

- React Native (iOS + Android from one codebase)
- Native Swift (iOS) or Kotlin (Android)
- Flutter

**Backend Options:**

- Firebase (quickest MVP)
- Supabase (open-source alternative)
- Custom API (Node.js/Express, Python/FastAPI)

**Database:**

- SQLite (local-first approach for speed)
- PostgreSQL (if using backend)
- Firebase/Firestore

**Recommendation:** Start with **React Native + Firebase** for rapid MVP, or **React Native + SQLite** for a true "snappy" local-first experience.

### Architecture Principles

1. **Local-First**: Data stored locally for instant access
2. **Offline-First**: Full functionality without internet
3. **Sync When Possible**: Background sync for backups/multi-device
4. **Minimal Dependencies**: Keep it lean and fast

---

## UI/UX Considerations

### Design Principles

1. **Speed Over Features**: Every screen should load instantly
2. **Smart Defaults**: Remember last weight/reps, suggest next weight
3. **Minimal Taps**: Log a set in 2-3 taps maximum
4. **Clear Visual Hierarchy**: Important info (current set, timer) is prominent
5. **Dark Mode Ready**: Many users work out in dim gyms

### Key Screens

1. **Home/Dashboard**

   - Today's workout (if scheduled)
   - Quick stats (streak, this week's volume)
   - "Start Workout" button

2. **Active Workout Screen**

   - Current exercise prominent
   - Quick weight/rep entry (numpad style)
   - Rest timer (auto-start between sets)
   - Previous set displayed for reference
   - Easy navigation to next exercise

3. **History/Progress**

   - Calendar view of completed workouts
   - Exercise-specific progress graphs
   - PR list

4. **Routine Builder**

   - Drag-and-drop exercise ordering
   - Set/rep scheme configuration
   - Schedule assignment

5. **Exercise Library**
   - Search/filter by muscle group, equipment
   - Exercise details with instructions
   - Add to routine or current workout

---

## Performance Targets

- App launch: < 1 second
- Screen transitions: < 100ms
- Set logging: Instant (< 50ms)
- Workout start: < 500ms

---

## Competitive Analysis

### Existing Apps

- **Strong**: Clean UI, great logging experience, but heavy
- **JEFIT**: Feature-rich, but cluttered UI
- **FitNotes**: Simple, fast, Android-focused
- **Hevy**: Modern design, social features

### Our Differentiation

1. **Faster** than Strong
2. **Simpler** than JEFIT
3. **More visual** than FitNotes
4. **More focused** than Hevy (pure lifting, no distractions)

---

## Success Metrics

1. **User Retention**: 70%+ return for 2nd workout
2. **Session Duration**: Matches actual workout time (indicator of efficiency)
3. **Time to Log Set**: < 10 seconds average
4. **App Store Rating**: 4.5+ stars

---

## Risk Factors & Mitigations

1. **Risk**: App feels too basic

   - **Mitigation**: Focus on polish and speed over features initially

2. **Risk**: Data loss if local-only

   - **Mitigation**: Implement backup/export early

3. **Risk**: User abandonment after a few weeks

   - **Mitigation**: Build habit-forming features (streaks, reminders)

4. **Risk**: Scaling backend costs
   - **Mitigation**: Start with local-first architecture

---

## Open Questions

1. What platform to launch on first? (iOS, Android, or both)
2. Free vs. Premium model? (One-time purchase, subscription, or freemium)
3. Social features - yes or no for MVP?
4. Web version needed?
5. Target launch timeline?

---

## Next Steps

See `TODO.md` for specific implementation tasks and milestones.
