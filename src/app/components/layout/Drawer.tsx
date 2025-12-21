"use client";

import { useEffect } from "react";
import { useDrawer } from "../../contexts/DrawerContext";

type DrawerProps = {
  children: React.ReactNode;
};

export default function Drawer({ children }: DrawerProps) {
  const { isOpen, closeDrawer } = useDrawer();
  const drawerClasses = `drawer ${isOpen ? "drawer--open" : "drawer--closed"}`;
  const bodyClasses = "drawer-open";

  // Close on Escape key and manage body scroll/class
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when open
      document.body.style.overflow = "hidden";
      // Add CSS class for styling convenience (optional but useful)
      document.body.classList.add(bodyClasses);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.body.classList.remove(bodyClasses);
    };
  }, [isOpen, closeDrawer]);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeDrawer();
  };

  return (
    <aside className={drawerClasses}>
      <div className="drawer__content">
        <h2>Drawer</h2>
        <nav className="drawer__nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
