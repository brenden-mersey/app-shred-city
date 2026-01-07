"use client";

import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from "react";

// Context for compound components
type AccordionContextType = {
  isOpen: boolean;
  toggle: () => void;
  contentId: string;
  triggerId: string;
  contentRef: React.RefObject<HTMLDivElement | null>;
  contentHeight: number | "auto";
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
  const [contentHeight, setContentHeight] = useState<number | "auto">(
    isOpen ? "auto" : 0
  );

  // Animate height when open state changes (Bootstrap-style)
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Opening: measure and animate to full height
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);

        // After animation completes, set to auto for dynamic content
        const timer = setTimeout(() => {
          setContentHeight("auto");
        }, 250); // Match transition duration

        return () => clearTimeout(timer);
      } else {
        // Closing: set current height, force reflow, then collapse
        const currentHeight = contentRef.current.scrollHeight;
        setContentHeight(currentHeight);

        // Force reflow to ensure height is set before transition
        void contentRef.current.offsetHeight;

        // Collapse to 0
        requestAnimationFrame(() => {
          setContentHeight(0);
        });
      }
    }
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
        contentHeight,
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
  const { isOpen, contentId, triggerId, contentRef, contentHeight } =
    useAccordionContext();

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
        height: contentHeight === "auto" ? "auto" : `${contentHeight}px`,
        overflow: contentHeight === "auto" ? "visible" : "hidden",
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

  // Content ref for smooth height animation
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | "auto">(
    isOpen ? "auto" : 0
  );

  // Update height when open state changes (Bootstrap-style)
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Opening: measure and animate to full height
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);

        // After animation completes, set to auto for dynamic content
        const timer = setTimeout(() => {
          setContentHeight("auto");
        }, 250); // Match transition duration

        return () => clearTimeout(timer);
      } else {
        // Closing: set current height, force reflow, then collapse
        const currentHeight = contentRef.current.scrollHeight;
        setContentHeight(currentHeight);

        // Force reflow to ensure height is set before transition
        void contentRef.current.offsetHeight;

        // Collapse to 0
        requestAnimationFrame(() => {
          setContentHeight(0);
        });
      }
    }
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
          height: contentHeight === "auto" ? "auto" : `${contentHeight}px`,
          overflow: contentHeight === "auto" ? "visible" : "hidden",
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
