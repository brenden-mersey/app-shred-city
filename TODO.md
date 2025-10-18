# Shred City - TODO & Roadmap

## Planning Phase ✓

### Decision Points Needed

- [ ] Choose platform (iOS-first, Android-first, or React Native for both)
- [ ] Choose tech stack (React Native + Firebase vs React Native + SQLite vs Native)
- [ ] Define monetization strategy (free, one-time purchase, subscription, ads)
- [ ] Choose design system/component library
- [ ] Finalize MVP feature set (review PLAN.md Phase 1)

### Design Work

- [ ] Create wireframes for core screens:
  - [ ] Home/Dashboard
  - [ ] Active Workout screen
  - [ ] Exercise entry/logging
  - [ ] History/Progress view
  - [ ] Routine builder
- [ ] Define color palette and branding
- [ ] Create app icon and splash screen
- [ ] Design component library (buttons, cards, inputs)

---

## Phase 1: MVP Development

### Setup & Infrastructure

- [ ] Initialize project (React Native / Native app)
- [ ] Set up development environment
- [ ] Configure local database (SQLite / Realm)
- [ ] Set up state management (Redux / Zustand / Context)
- [ ] Configure navigation (React Navigation / Native navigation)
- [ ] Set up TypeScript (if using)

### Data Layer

- [ ] Define database schema
- [ ] Create database models/entities:
  - [ ] User
  - [ ] Exercise
  - [ ] Workout Routine
  - [ ] Workout Session
  - [ ] Set
  - [ ] Personal Record
- [ ] Implement database CRUD operations
- [ ] Create seed data for exercise library
- [ ] Implement data migration system

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

**[Date]** - Initial planning documents created
