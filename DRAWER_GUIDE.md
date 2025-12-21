# Drawer Menu Implementation Guide

## Where to Add It

### Current Recommendation: **`page.tsx`**

Since your header is already in `page.tsx`, add the drawer there for now. This keeps related UI together.

**Structure:**
```
page.tsx
  ├── Header (with hamburger button)
  ├── Drawer (slides in from side)
  ├── Main content
  └── Footer
```

### Future Option: **`layout.tsx`** (if you add more pages)

If you plan to have multiple pages later (e.g., `/calculator`, `/about`, `/settings`), move both header and drawer to `layout.tsx` for site-wide navigation.

**Structure:**
```
layout.tsx
  ├── Header (site-wide)
  ├── Drawer (site-wide)
  └── {children} (all pages)

page.tsx
  └── Just page content
```

## Implementation Steps

### Step 1: Create Drawer Component

Create `src/app/components/Drawer.tsx`:

```tsx
'use client';

import { useEffect } from 'react';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Drawer({ isOpen, onClose, children }: DrawerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay ${isOpen ? 'drawer-overlay--open' : ''}`}
        onClick={handleOverlayClick}
        aria-hidden={!isOpen}
      />
      
      {/* Drawer */}
      <aside
        className={`drawer ${isOpen ? 'drawer--open' : ''}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer__content">
          {children}
        </div>
      </aside>
    </>
  );
}
```

### Step 2: Create Drawer Styles

Create `src/app/styles/partials/_drawer.scss`:

```scss
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: none;

  &--open {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }
}

.drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  max-width: 85vw;
  background: var(--dark-secondary);
  z-index: 9999;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);

  &--open {
    transform: translateX(0);
  }

  &__content {
    padding: 2rem 1.5rem;
    height: 100%;
    overflow-y: auto;
  }
}

// Right-side drawer variant (optional)
.drawer--right {
  left: auto;
  right: 0;
  transform: translateX(100%);

  &.drawer--open {
    transform: translateX(0);
  }
}
```

### Step 3: Add Drawer to Your Styles

In `src/app/styles/partials/_index.scss`:

```scss
@forward "calculator";
@forward "plate";
@forward "drawer"; // Add this line
```

### Step 4: Add Drawer to page.tsx

```tsx
'use client';

import { useState } from 'react';
import type { Metadata } from "next";
import Calculator from "./components/Calculator";
import Drawer from "./components/Drawer";

// Note: Metadata export needs to be in a separate file or removed if using 'use client'
// Consider moving metadata to layout.tsx or creating a separate metadata file

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="header__menu-button"
              aria-label="Open menu"
            >
              {/* Hamburger icon - add SVG or use text */}
              ☰
            </button>
            <h1>SC</h1>
          </div>
        </div>
      </header>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <nav>
          <h2>Menu</h2>
          <ul>
            <li><a href="/">Calculator</a></li>
            {/* Add more menu items */}
          </ul>
        </nav>
      </Drawer>

      <main className="main">
        <section className="section">
          <div className="container">
            <Calculator />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Shred City</p>
        </div>
      </footer>
    </>
  );
}
```

### Step 5: Handle Metadata with Client Components

⚠️ **Important:** If you use `'use client'` in `page.tsx`, you can't export metadata there. Options:

1. **Keep metadata in page.tsx** (remove 'use client' from page, add it only to components that need it)
2. **Move metadata to layout.tsx** (recommended for site-wide metadata)
3. **Use a wrapper component** - keep page.tsx as server component, create a client wrapper

## Alternative: Component-Based Approach (Recommended)

Keep `page.tsx` as a server component, create a client wrapper:

**Create `src/app/components/PageLayout.tsx`:**

```tsx
'use client';

import { useState } from 'react';
import Drawer from './Drawer';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container">
          <button onClick={() => setIsDrawerOpen(true)}>☰</button>
          <h1>SC</h1>
        </div>
      </header>
      
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {/* Menu content */}
      </Drawer>
      
      {children}
      
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Shred City</p>
        </div>
      </footer>
    </>
  );
}
```

**Then in `page.tsx`:**

```tsx
import type { Metadata } from "next";
import Calculator from "./components/Calculator";
import PageLayout from "./components/PageLayout";

export const metadata: Metadata = {
  // Your metadata here
};

export default function Home() {
  return (
    <PageLayout>
      <main className="main">
        <section className="section">
          <div className="container">
            <Calculator />
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
```

## Quick Decision Matrix

| Scenario | Location | Reason |
|----------|----------|--------|
| Single page app | `page.tsx` or component | Simple, keeps related UI together |
| Multiple pages planned | `layout.tsx` | Site-wide navigation, better architecture |
| Settings/options drawer | Component in page | Page-specific functionality |
| Navigation menu | `layout.tsx` | Shared across all pages |

## Next Steps

1. Decide on approach (page.tsx vs layout.tsx)
2. Create Drawer component
3. Add drawer styles
4. Integrate into your chosen location
5. Add hamburger button to header
6. Style and customize

