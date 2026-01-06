# Component Organization Guide

## Current Structure ✅

```
components/
  ├── workout/          ← Feature-based (domain logic)
  ├── layout/           ← Type-based (site-wide)
  ├── ui/               ← Type-based (generic reusable)
  └── [feature].tsx     ← Feature-specific (calculator, etc.)
```

## Recommended Structure

```
components/
  ├── workout/          ← Feature-based (workout domain)
  │   ├── Workout.tsx
  │   ├── WorkoutExercise.tsx
  │   └── ...
  │
  ├── calculator/       ← Feature-based (calculator domain)
  │   ├── Calculator.tsx
  │   ├── Barbell.tsx
  │   ├── Plate.tsx
  │   └── Toggle.tsx
  │
  ├── sections/         ← Type-based (reusable page sections)
  │   ├── IntroSection.tsx
  │   ├── HeroSection.tsx
  │   ├── FeatureSection.tsx
  │   └── ...
  │
  ├── layout/           ← Type-based (site-wide layout)
  │   ├── Header.tsx
  │   ├── Footer.tsx
  │   └── ...
  │
  └── ui/               ← Type-based (generic UI components)
      ├── ButtonClose.tsx
      └── ...
```

## Organization Principles

### 1. Feature-Based (Domain Logic)

**Use for:** Components specific to a business domain/feature

```
components/
  ├── workout/          ← All workout-related components
  ├── calculator/       ← All calculator-related components
  └── auth/            ← All auth-related components (if you add them)
```

**When to use:**

- Components are tightly coupled to a feature
- Components share domain logic/state
- Components are unlikely to be reused outside the feature

**Examples:**

- `WorkoutExercise`, `WorkoutSet` → `workout/`
- `Calculator`, `Barbell`, `Plate` → `calculator/`

---

### 2. Type-Based (Reusable Components)

**Use for:** Generic, reusable components organized by their type

```
components/
  ├── sections/        ← Reusable page sections
  ├── layout/          ← Layout components
  ├── ui/              ← Generic UI components
  ├── forms/           ← Form components (if you add them)
  └── icons/           ← Icon components
```

**When to use:**

- Components are reusable across multiple pages/features
- Components are generic (not domain-specific)
- Components share a common purpose/type

**Examples:**

- `IntroSection`, `HeroSection` → `sections/`
- `Header`, `Footer` → `layout/`
- `ButtonClose`, `Button` → `ui/`

---

### 3. Page-Specific (Avoid When Possible)

**Use for:** Components used only on one specific page

```
components/
  └── home/           ← Only if truly page-specific
      └── HomeHero.tsx
```

**When to use:**

- Component is only used on one page
- Component is unlikely to be reused
- Component is page-specific content (not logic)

**⚠️ Avoid if:**

- Component could be reused elsewhere
- Component contains reusable logic
- Component is part of a feature (use feature directory instead)

---

## Decision Matrix

| Component Type               | Location            | Example                                  |
| ---------------------------- | ------------------- | ---------------------------------------- |
| Workout feature component    | `workout/`          | `WorkoutExercise.tsx`                    |
| Calculator feature component | `calculator/`       | `Barbell.tsx`                            |
| Reusable page section        | `sections/`         | `IntroSection.tsx`                       |
| Site-wide layout             | `layout/`           | `Header.tsx`                             |
| Generic UI component         | `ui/`               | `ButtonClose.tsx`                        |
| Page-specific content        | `home/` or `about/` | `HomeHero.tsx` (only if truly page-only) |

---

## Recommended Approach for Your App

### ✅ Create `sections/` Directory

For your intro section and future reusable sections:

```tsx
// components/sections/IntroSection.tsx
export default function IntroSection() {
  return (
    <section className="section section--intro intro">{/* ... */}</section>
  );
}

// app/page.tsx
import IntroSection from "@/app/components/sections/IntroSection";

export default function Home() {
  return (
    <main className="main">
      <IntroSection />
    </main>
  );
}
```

### ✅ Move Calculator Components

Consider grouping calculator components:

```
components/
  └── calculator/
      ├── Calculator.tsx
      ├── Barbell.tsx
      ├── Plate.tsx
      └── Toggle.tsx
```

**Why:** Calculator is a distinct feature, similar to workout.

---

## Best Practices

1. **Start with feature-based** for domain logic
2. **Use type-based** for generic reusable components
3. **Avoid page-specific** unless truly necessary
4. **Group related components** together
5. **Keep directory names consistent** (singular: `workout/`, not `workouts/`)

---

## Migration Path

If you want to reorganize:

1. **Create `sections/`** for reusable page sections
2. **Extract intro section** from `page.tsx` → `sections/IntroSection.tsx`
3. **Optionally group calculator** components → `calculator/` directory
4. **Keep feature-based** for workout (already good!)

---

## Summary

✅ **Recommended:** `sections/` directory for reusable page sections

❌ **Not recommended:** Page-specific directories (`home/`, `about/`) unless components are truly page-only

✅ **Current pattern is good:** Feature-based (`workout/`) + Type-based (`layout/`, `ui/`)
