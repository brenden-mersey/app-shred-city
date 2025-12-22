# Icons Guide - Best Practices

## Where to Put Inline SVG Icons

✅ **Recommended: `src/app/components/icons/`**
- Each icon as a separate component file
- Reusable across the app
- Type-safe with TypeScript
- Can accept props (size, color, className, etc.)
- Tree-shakeable (only imports what you use)

❌ **Avoid: `public/` directory**
- `public/` is for static assets referenced by URL
- Not ideal for inline SVGs that need to be styled or customized

❌ **Avoid: Inline in every component**
- Hard to reuse
- Makes components cluttered
- Hard to maintain consistency

## Structure

```
src/app/components/icons/
  ├── HamburgerIcon.tsx
  ├── CloseIcon.tsx
  ├── PlusIcon.tsx
  ├── MinusIcon.tsx
  └── index.ts  (optional: re-export all icons)
```

## Icon Component Template

```tsx
// src/app/components/icons/HamburgerIcon.tsx
type IconProps = {
  className?: string;
  size?: number;
  'aria-hidden'?: boolean;
};

export default function HamburgerIcon({ 
  className, 
  size = 24,
  'aria-hidden': ariaHidden = true 
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
    >
      {/* SVG paths here */}
    </svg>
  );
}
```

## Usage Example

```tsx
import HamburgerIcon from '@/components/icons/HamburgerIcon';

<button>
  <HamburgerIcon className="icon" size={20} />
</button>
```

## Benefits

1. **Reusable** - Use the same icon anywhere
2. **Stylable** - Pass className or use CSS to style
3. **Customizable** - Props for size, color, etc.
4. **Accessible** - Can add aria labels easily
5. **Maintainable** - One source of truth per icon
6. **Tree-shakeable** - Only imports what you use

## Alternative: Icon Library

If you have many icons, consider using an icon library:
- `react-icons` - Popular, includes many icon sets
- `@heroicons/react` - Heroicons as React components
- `lucide-react` - Clean, consistent icon set

Example with react-icons:
```tsx
import { HiMenu } from 'react-icons/hi';

<button>
  <HiMenu className="icon" />
</button>
```

