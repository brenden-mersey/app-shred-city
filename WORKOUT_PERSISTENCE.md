# Workout persistence

Notes and plan for persisting workouts to Supabase so users can save, list, revisit, and edit workouts. This doc is the single source of truth for the feature; update it as we implement.

---

## Goal

- **Save** workouts (create and update) so they survive refresh and devices.
- **List** previous workouts (e.g. by date, with basic metadata).
- **Revisit** a past workout (view and, eventually, edit again).

Auth is already in place (Supabase + RLS); workouts are scoped to the signed-in user.

---

## Data structure

### In-app types (source of truth)

Defined in `src/app/types/workout.ts`:

- **WorkoutSession**: `id`, `date`, `startTime`, `endTime`, `duration?`, `notes?`, `defaultWeightUnit`, `templateName?`, `hasPreviousData?`, **`exercises`** (array).
- **Exercise**: `id`, `name`, `category`, `muscleGroups`, `defaultEquipment`, `equipmentType`, `series`, **`sets`**, `weightUnit?`, `barWeight?`, `notes?`, etc.
- **Set**: `id`, `weightPerSide`, `totalWeight`, `weightUnit`, `equipmentType`, `reps`, `setNumber`, `timestamp`, optional `previousWeight` / `previousReps` / `previousWeightUnit`.

All `Date` fields exist only in memory; in the DB we store ISO strings and parse back when loading.

### Database (Supabase Postgres)

**Approach:** Use **relational tables** (workouts → workout_exercises → sets) for futureproofing, queryability, and scale. The JSONB approach is documented below as a fallback; the rest of this doc focuses on the relational design.

---

## Decisions summary (locked)

- **Exercise library:** Master list, per-user. Users can add exercises to their library. Every exercise in a workout links to the library (no one-offs).
- **Templates:** In scope. Start from template; if template was used before, pre-fill from last workout that used that template. “Start new from this workout” copies any past workout. Edit past workout = update in place.
- **Programs / folders:** Hybrid. Optional programs (folders) for grouping. **One template can live in only one folder.** **Multiple templates can exist in one folder.** Sortable via `sort_order` on templates. Optional `origin` on templates: `'starter' | 'import' | 'user'` for UI (“Starter templates” vs “My templates”).
- **Templates from JSON:** Bundled starter templates (ship .json, copy into user’s account) and user import from .json. Export produces same format.

---

## Relational schema: questions to align on

Answering these will lock in the schema and API shape. No wrong answers—they just change table design, FKs, and indexes.

---

### 1. Exercise library: shared list vs copy-paste each time

- **When someone adds “Bench Press” to a workout, should the app treat it as “this exercise from the master list” or as “whatever they typed this time”?**
  - **Master list:** There’s one shared list of exercises (e.g. “Back Squat”, “Bench Press”). Adding to a workout means “pick from that list.” The app can then do things like “show me all my Bench Press sets ever” or “progress on Back Squat,” because it knows which exercise is which.
  - **Standalone each time:** Each workout just stores the name and details the user entered for that session (e.g. “Bench Press”, “bench”, “Barbell Bench”). No shared list in the database. Simpler to build, but tying “this set” to “that exercise” across workouts is trickier (e.g. matching by name).

**Decision:** Use a master list so the same exercise (e.g. Bench Press) has context across workouts. Users can add their own exercises to the library.

**Whose list?** **Per-user.** Each user has their own library: built-in/system exercises plus exercises they’ve added. Custom exercises are private and scoped by `user_id`. Pros: privacy, no moderation or naming collisions, simple RLS. Global (shared list) would allow community library but adds moderation and permission complexity; we can revisit if we ever want “shared” or “popular” exercises.

**One-offs?** **No.** If a user adds an exercise, it’s added to their library, full stop. No “just for this workout” without saving. Simpler model and one source of truth; every exercise in a workout links to a library entry (or we store name/details on the workout row only when we can’t link, but the product rule is: add = save to library).

---

### 2. Templates, programs, and “use as starter”

**Decision:** Support **templates** and use them as the basis for a **program** (e.g. 6–8 weeks: Monday, Tuesday, Thursday, Friday templates). When starting a workout, the user picks a template; we optionally pre-fill from the last workout that used that template.

**Flows:**

1. **Edit a past workout** — Fix the historical record (start/end time, missing reps, etc.). Same workout row, updated.
2. **Start from template** — User selects a template (e.g. “Monday”). Create a *new* workout:
   - **If this template has been used before:** Pre-fill the new workout with data from the **most recent workout that was started from this template** (same exercises, weights/reps/settings, bar weight, unit, etc.; `start_time` = now). So “Monday again” pulls from last Monday.
   - **If this template has never been used:** New workout has the template’s structure only (exercise list, order, maybe default sets); no previous weights.
   - To support “last workout from this template,” store `template_id` (FK, nullable) on each workout row. Query: most recent workout where `user_id` = X and `template_id` = Y, order by `start_time` desc, limit 1.
3. **Start new from this workout** — User opens any past workout and chooses “Copy / start new from this.” New workout is a copy of that one (new id, `start_time` = now). Doesn’t go through a template; useful for one-off repeats or when they’re not following the program.

**Program = set of templates** — A “program” (e.g. “Strength Block 1”) can be a grouping of templates (Monday, Tuesday, Thursday, Friday). Schema: either a `programs` table (id, user_id, name, maybe duration_weeks) with templates belonging to a program and having a day/order, or just templates with a `program_id` (nullable) and `day_label` / `sort_order`. We can keep it minimal at first: templates with name + optional day/program metadata.

**Summary:** Templates (and optionally programs) are in scope. “Start template” uses last workout from that template when available; “Start new from this workout” copies any past workout. Edit past remains a separate action.

**Loading templates from JSON**

- **Yes — templates can be defined and loaded from .json.** Two main use cases:
  1. **Bundled starter templates** — Ship a few .json files with the app (e.g. “Beginner Full Body”, “Push / Pull / Legs”) so new users have ready-made options. On “Add starter templates” or first use, read the JSON and create template rows (and template_exercise rows) **in the user’s account** (copy into their `workout_templates`). That way they own a copy and can edit or delete; no separate “system template” table required. Exercises in the JSON can reference by **stable id** (if we have system exercise ids, e.g. `back-squat`) or by **name + default_equipment** so we can match to the user’s exercise library or create the exercise in their library if missing.
  2. **User import** — “Import template” from a .json file (their own export or a shared file). Same idea: parse JSON → insert into `workout_templates` and `workout_template_exercises` for that user; resolve or create exercises as above.

- **JSON shape (sketch)** — One template per file, or an array of templates. Each template: `name`, `default_weight_unit?`, `program_name?`, `exercises`: array of `{ "exercise_id" or "exercise_name", "default_equipment", "equipment_type?", "series?", "bar_weight?", "sort_order" }`. Keep it flat and easy to hand-edit or generate.

- **Export** — “Export template” can produce the same JSON format for backup or sharing; re-import elsewhere (or same account) creates a copy.

**Organizing templates**

Decide this before building so the schema and UI stay aligned.

1. **Flat vs grouped**
   - **Flat:** One list of templates (e.g. “Monday”, “Tuesday”, “Beginner Full Body”). Simple. Optional: sort by name or a `sort_order` field.
   - **Grouped by program:** Templates belong to a program (e.g. “Strength Block 1”). User sees programs first, then templates under the selected program. Needs `program_id` (FK) on `workout_templates` and a `programs` table. Good for “6–8 week block” with Mon/Tue/Thu/Fri.
   - **Hybrid:** Programs are optional. Some templates have `program_id`, some don’t. UI: “Programs” section (templates that have a program) and “Other templates” or one list with optional program filter.

2. **Fields that support organization**
   - `name` — e.g. “Monday”, “Push Day”.
   - `program_id` (nullable) — if grouped.
   - `sort_order` or `day_label` — display order (e.g. 1–4 for Mon/Tue/Thu/Fri, or 0 for “no day”). Lets you show “Monday” before “Tuesday” without relying on name.
   - Optional: `source` / `origin` — e.g. `'starter' | 'import' | 'user'` so the UI can show “Starter templates” vs “My templates” or “Imported”. Once in the DB they’re all just templates; this is for filtering/labels only.

3. **Grouping: folder vs tags**
   - **Folder-style (one group per template):** Each template lives in at most one group. The group has a name (e.g. “Strength Block 1”, “Push/Pull/Legs”). In the UI: list of folders; expand a folder → see its templates in order. In the schema: that’s what we already have with **programs** — `workout_templates.program_id` (nullable). User creates a “program” (or we label it “Folder” / “Group” in the UI), adds templates to it. **Sortable:** `sort_order` on each template (per folder and for “no folder”); drag-and-drop or up/down to reorder. Simple and clear.
   - **Tags / categories (many-to-many):** User defines labels (e.g. “Full Body”, “Beginner”, “Upper”). A template can have multiple tags. UI: filter by tag (“Show me Full Body templates”); a template can appear under several categories. Schema: `template_categories` (id, user_id, name) and `workout_template_categories` (template_id, category_id) or a tags array. More flexible, but more to build and more UI (managing tags, multi-select).
   - **Recommendation:** Start with **folder-style grouping** (programs). One group per template, sort_order within the group. We can call the entity “Program” or “Folder” in the app so it feels like “I’m putting these templates in a folder.” Add tags later if you want “this template is both Full Body and Beginner.”

4. **Locked choices (hybrid)**
   - **Optional programs (folders):** `programs` table; `workout_templates.program_id` (nullable). A template can be in at most one folder; a folder can contain many templates. Templates with no program = “Ungrouped” or shown in a flat list.
   - **Sortable:** `sort_order` (integer) on `workout_templates` — defines order within a folder and order among ungrouped templates. UI: reorder by drag-and-drop or up/down.
   - **Optional origin:** `origin` on `workout_templates`: `'starter' | 'import' | 'user'` for “Starter templates” vs “My templates” in the UI.

**Locked:** Grouping = folders (programs). **One template belongs to at most one folder.** **One folder can contain many templates.** Sortable via `sort_order`. Tags/categories deferred.

---

### 3. Analytics and cross-workout queries

- **Do you need to query across workouts?** Examples: “all sets of exercise X for this user”, “volume per week”, “PRs / progress over time”.
  - **Yes:** Normalized tables (workouts, workout_exercises, sets) with indexes (e.g. `user_id`, `start_time`; `workout_id`; `exercise_id` or `exercise_name`) make these queries straightforward. Avoids scanning JSONB.
  - **No (only “load one workout” and “list workouts”):** Either normalized or JSONB is fine; normalized still helps consistency and future analytics.

---

### 4. Scale and performance

- **Rough scale:** How many workouts per user (order of magnitude)? Sets per workout?
  - Drives: need for pagination on list, indexes (e.g. `(user_id, start_time DESC)`), and whether we ever partition by time. For most personal apps, single-table indexes are enough.
- **Load pattern:** When opening a workout, do we always load the full tree (workout + all exercises + all sets) in one go?
  - If yes: one query with joins or 2–3 small queries (workout, exercises, sets) is fine. Avoid N+1.

---

### 5. Concurrency and updates

- **Can the same workout be edited from two places at once** (e.g. two tabs or mobile + web)?
  - If we need to reduce conflicts: add `updated_at` (timestamptz) and optionally use it for optimistic locking (e.g. “update only if updated_at = :expected”). For now, last-write-wins is usually acceptable.

---

### 6. Soft delete vs hard delete

- **Do you want to “delete” a workout but keep the data** (e.g. for “undo” or analytics)?
  - **Yes:** Add `deleted_at` (timestamptz, nullable). All queries filter `WHERE deleted_at IS NULL` (or expose “trash” with the opposite). Same idea can apply to workout_exercises/sets if we ever want to soft-delete a single exercise/set.
  - **No:** Hard delete; no `deleted_at`.

---

### 7. Previous-set values (e.g. “last time”)

- **`previousWeight` / `previousReps` on a set:** Store on the set row, or compute when loading (e.g. from the previous workout’s same exercise)?
  - **Store:** Simpler at read time; one source for “what we showed last time”. Slightly redundant.
  - **Compute:** Single source of truth; query “previous workout’s sets for this exercise” when building the session. More logic, no redundancy.

---

### 8. Identifiers: UUIDs vs serial

- **Primary keys:** UUIDs (e.g. `gen_random_uuid()`) vs bigint/serial?
  - **UUIDs:** Match your current `WorkoutSession.id` / exercise/set ids; no sequence contention; slightly larger indexes.
  - **Serial/bigint:** Smaller, simpler for “list recent” ordering; you’d still need stable client ids if you create rows from the client before insert.

*Recommendation: UUIDs for workouts and for workout_exercises/sets if we create them client-side; otherwise DB-generated ids are fine.*

---

## Relational schema (draft — to refine after answers)

Assumptions: per-user exercise library; every exercise in a workout links to the library; templates and optional programs (folders); one template per folder, many templates per folder; sort_order; optional origin; store previous values on set; UUIDs; soft delete optional.

**Tables (conceptual)**

| Table                  | Purpose |
|------------------------|--------|
| `exercises`            | Per-user exercise library. `id`, `user_id`, `name`, `category`, `muscle_groups`, `default_equipment`, `instructions?`, `notes?`. |
| `programs`             | Folders for grouping templates. `id`, `user_id`, `name`, `duration_weeks?`. One program has many templates. |
| `workout_templates`    | Blueprint for a day/session. `id`, `user_id`, `name` (e.g. “Monday”), `program_id` (FK nullable — at most one folder per template), `default_weight_unit`, `sort_order`, `origin?` (`'starter'|'import'|'user'`). |
| `workout_template_exercises` | Exercise list for a template. `id`, `workout_template_id` (FK), `exercise_id` (FK), `equipment_type`, `series`, `bar_weight?`, `sort_order`. (We can add default sets later if needed.) |
| `workouts`             | One row per session. `id`, `user_id`, `template_id` (FK nullable — which template this was started from, for “last workout from this template” pre-fill), `start_time`, `end_time`, `duration_minutes`, `default_weight_unit`, `notes`, `created_at`, `updated_at`, optional `deleted_at`. |
| `workout_exercises`    | One row per exercise in a workout. `id`, `workout_id` (FK), `exercise_id` (FK). Overrides: `equipment_type`, `series`, `weight_unit?`, `bar_weight?`, `notes?`, `sort_order`. |
| `workout_sets`         | One row per set. `id`, `workout_exercise_id` (FK), `weight_per_side`, `total_weight`, `weight_unit`, `equipment_type`, `reps`, `set_number`, `performed_at`, `previous_weight?`, `previous_reps?`, `previous_weight_unit?`. |

**Indexes (for performance)**

- `workouts`: `(user_id, start_time DESC)` for list; `(user_id, id)` for “get one”; `(user_id, template_id, start_time DESC)` for “last workout from this template.”
- `workout_exercises`: `(workout_id)`; optionally `(exercise_id)` for progress by exercise.
- `workout_sets`: `(workout_exercise_id)`.
- `workout_templates`: `(user_id)`; `(program_id)` if we use programs.
- `workout_template_exercises`: `(workout_template_id)`.

**RLS**

- All tables: `user_id` on the row or reachable via JOIN (e.g. workouts → user_id; templates, programs, exercises → user_id). RLS so `auth.uid()` matches.

Once you’ve answered the questions above, we can lock the schema (and add a concrete “Schema (final)” section with full column types and migrations).

---

## Fallback: one table + JSONB (original plan)

If we keep the simpler approach instead of relational:

**Table: `workouts`**

| Column               | Type         | Notes                                      |
|----------------------|--------------|--------------------------------------------|
| `id`                 | uuid         | PK; same as `WorkoutSession.id`            |
| `user_id`            | uuid         | `auth.uid()` for RLS                       |
| `start_time`         | timestamptz  | From `startTime`                           |
| `end_time`           | timestamptz  | Nullable; from `endTime`                  |
| `duration_minutes`   | int          | Nullable                                   |
| `default_weight_unit`| text         | `'lbs'` or `'kg'`                          |
| `notes`              | text         | Nullable                                   |
| `template_name`      | text         | Nullable                                   |
| `exercises`          | jsonb        | Full `Exercise[]` (each with nested `sets`) |

**Serialization (save)** — Map `WorkoutSession` → row; in `exercises` blob, convert all `Date` fields to ISO strings.

**Deserialization (load)** — Map row → `WorkoutSession`; parse dates in `exercises` back to `Date`.

---

## Flows

1. **Create**  
   User starts/ends a workout → insert into `workouts` with `user_id = auth.uid()`, using `WorkoutSession.id` as `id`. Serialize dates in `exercises` to ISO strings.

2. **List**  
   Query `workouts` where `user_id = auth.uid()`, order by `start_time desc`, limit (e.g. 50). Return only list-needed columns (no need to send full `exercises` blob for list view).

3. **Revisit / Edit**  
   User taps a workout → fetch row by `id` (and ensure `user_id` matches). Deserialize row → `WorkoutSession`. Navigate to the same workout screen with `initialWorkout={loadedSession}`. Edits = update that row (same `id`), re-serialize and write `exercises` + metadata.

4. **When to persist**  
   TBD: e.g. on “End workout”, and/or “Save” button, and/or periodic draft save. Optional: status (e.g. `in_progress` vs `completed`) for list display.

---

## Implementation checklist

**After remaining questions are answered and schema is locked:**

- [ ] Supabase: create tables (`exercises`, `programs`, `workout_templates`, `workout_template_exercises`, `workouts`, `workout_exercises`, `workout_sets`), indexes, and RLS.
- [ ] Map app types ↔ DB: build `WorkoutSession` from joined rows (with date parsing); on save, write workout + workout_exercises + workout_sets (transactions).
- [ ] API or server actions: create/update workout (insert/upsert tree), list workouts, get workout by id (full tree); “last workout from template” query.
- [ ] Wire “End workout” / “Save” to create or update.
- [ ] Workouts list page: fetch list; tap → load by id, hydrate `WorkoutSession`, open workout screen with `initialWorkout`; “Start new from this workout” (copy).
- [ ] Templates: CRUD for programs (folders) and workout_templates; list templates (grouped by program, sort_order); “Start from template” (pre-fill from last workout when available).
- [ ] Template JSON: bundled starter .json files; “Add starters” / import flow (copy into user’s templates); export template to same JSON format.
- [ ] (Optional) Soft delete, draft vs completed, last-saved indicator.

---

## References

- Types: `src/app/types/workout.ts`
- Context: `src/app/contexts/WorkoutContext.tsx` (consumes `initialWorkout`)
- New workout entry: `src/app/workouts/new/page.tsx` (`createNewWorkout`, `WorkoutProvider`)
- Auth: Supabase; use `auth.uid()` for `user_id` and RLS.
