"use client";

import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from "react";
import { gsap } from "gsap";

// Context for compound components
type AccordionContextType = {
  isOpen: boolean;
  toggle: () => void;
  contentId: string;
  triggerId: string;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion compound components must be used within Accordion.Root"
    );
  }
  return context;
}

// Simple Accordion Props (backward compatible)
type AccordionProps = {
  /** The trigger element (button text/icon) that toggles the accordion */
  trigger: ReactNode;
  /** The content to show/hide when accordion is toggled */
  children: ReactNode;
  /** Optional controlled state - if provided, component becomes controlled */
  isOpen?: boolean;
  /** Callback when accordion is toggled (for controlled mode) */
  onToggle?: (isOpen: boolean) => void;
  /** Default open state (uncontrolled mode only) */
  defaultOpen?: boolean;
  /** Additional CSS class for the wrapper */
  className?: string;
  /** Additional CSS class for the trigger button */
  triggerClassName?: string;
  /** Additional CSS class for the content wrapper */
  contentClassName?: string;
  /** Unique ID for ARIA attributes (auto-generated if not provided) */
  id?: string;
};

// Root component for compound pattern
type AccordionRootProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  id?: string;
};

function AccordionRoot({
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  id: providedId,
}: AccordionRootProps) {
  const isControlled = controlledIsOpen !== undefined;
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const idRef = useRef(
    providedId || `accordion-${Math.random().toString(36).substr(2, 9)}`
  );
  const contentId = `${idRef.current}-content`;
  const triggerId = `${idRef.current}-trigger`;

  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP animation when open state changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        if (isOpen) {
          // Opening animation
          gsap.to(contentRef.current, {
            onStart: () => {
              contentRef.current?.classList.add("opening");
              contentRef.current?.classList.remove("closing", "closed");
            },
            onComplete: () => {
              contentRef.current?.classList.add("opened");
              contentRef.current?.classList.remove("opening");
            },
            height: "auto",
            duration: 0.333,
            ease: "ease",
            overwrite: true,
          });
        } else {
          // Closing animation
          gsap.to(contentRef.current, {
            onStart: () => {
              contentRef.current?.classList.add("closing");
              contentRef.current?.classList.remove("opening", "opened");
            },
            onComplete: () => {
              contentRef.current?.classList.remove("closing");
              contentRef.current?.classList.add("closed");
            },
            height: 0,
            duration: 0.333,
            ease: "ease",
            overwrite: true,
          });
        }
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  const toggle = () => {
    const newIsOpen = !isOpen;
    if (isControlled) {
      onToggle?.(newIsOpen);
    } else {
      setInternalIsOpen(newIsOpen);
    }
  };

  return (
    <AccordionContext.Provider
      value={{
        isOpen,
        toggle,
        contentId,
        triggerId,
        contentRef,
      }}
    >
      {children}
    </AccordionContext.Provider>
  );
}

// Trigger component
type AccordionTriggerProps = {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
};

function AccordionTrigger({ children, className = "" }: AccordionTriggerProps) {
  const { isOpen, toggle, contentId, triggerId } = useAccordionContext();

  return (
    <button
      id={triggerId}
      type="button"
      className={`accordion__trigger ${className}`.trim()}
      onClick={toggle}
      aria-expanded={isOpen}
      aria-controls={contentId}
    >
      {children}
    </button>
  );
}

// Content component
type AccordionContentProps = {
  children: ReactNode;
  className?: string;
};

function AccordionContent({ children, className = "" }: AccordionContentProps) {
  const { isOpen, contentId, triggerId, contentRef } = useAccordionContext();

  return (
    <div
      ref={contentRef}
      id={contentId}
      className={`accordion__content ${
        isOpen ? "accordion__content--open" : ""
      } ${className}`.trim()}
      role="region"
      aria-labelledby={triggerId}
      style={{
        height: 0,
        overflow: "hidden",
      }}
    >
      <div className="accordion__content-inner">{children}</div>
    </div>
  );
}

// Simple Accordion component (backward compatible)
function Accordion({
  trigger,
  children,
  isOpen: controlledIsOpen,
  onToggle,
  defaultOpen = false,
  className = "",
  triggerClassName = "",
  contentClassName = "",
  id: providedId,
}: AccordionProps) {
  // Determine if component is controlled
  const isControlled = controlledIsOpen !== undefined;

  // Internal state for uncontrolled mode
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  // Use controlled or internal state
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Generate unique ID for ARIA attributes
  const idRef = useRef(
    providedId || `accordion-${Math.random().toString(36).substr(2, 9)}`
  );
  const contentId = `${idRef.current}-content`;
  const triggerId = `${idRef.current}-trigger`;

  // Content ref for GSAP animation
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP animation when open state changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        if (isOpen) {
          // Opening animation
          gsap.to(contentRef.current, {
            onStart: () => {
              contentRef.current?.classList.add("open");
            },
            onComplete: () => {
              contentRef.current?.classList.add("opened");
            },
            height: "auto",
            duration: 0.333,
            ease: "ease",
            overwrite: true,
          });
        } else {
          // Closing animation
          gsap.to(contentRef.current, {
            onStart: () => {
              contentRef.current?.classList.remove("open");
            },
            onComplete: () => {
              contentRef.current?.classList.remove("opened");
            },
            height: 0,
            duration: 0.333,
            ease: "ease",
            overwrite: true,
          });
        }
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;

    if (isControlled) {
      // In controlled mode, call the callback
      onToggle?.(newIsOpen);
    } else {
      // In uncontrolled mode, update internal state
      setInternalIsOpen(newIsOpen);
    }
  };

  const blockName = "accordion";
  const wrapperClasses = [
    blockName,
    isOpen ? `${blockName}--open` : `${blockName}--closed`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      <button
        id={triggerId}
        type="button"
        className={`${blockName}__trigger ${triggerClassName}`.trim()}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {trigger}
      </button>
      <div
        ref={contentRef}
        id={contentId}
        className={`${blockName}__content ${contentClassName}`.trim()}
        role="region"
        aria-labelledby={triggerId}
        style={{
          height: 0,
          overflow: "hidden",
        }}
      >
        <div className={`${blockName}__content-inner`}>{children}</div>
      </div>
    </div>
  );
}

// Export compound components
Accordion.Root = AccordionRoot;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default Accordion;
