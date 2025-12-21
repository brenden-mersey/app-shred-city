"use client";

import { useEffect } from "react";
import { useDrawer } from "../../contexts/DrawerContext";

type DrawerProps = {
  children?: React.ReactNode;
};

export default function Drawer({ children }: DrawerProps) {
  const { isOpen, closeDrawer } = useDrawer();
  const drawerClasses = `drawer ${isOpen ? "drawer--open" : "drawer--closed"}`;
  const bodyClasses = "drawer-open";

  // Close on Escape key, manage body scroll/class, and handle clicks on pushed content
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };

    const handleContentClick = (e: MouseEvent) => {
      // Close drawer when clicking on pushed content (header, main, footer)
      // But exclude the burger button and drawer itself
      const target = e.target as HTMLElement;
      const burgerButton = target.closest(".header__button-burger");
      const drawerElement = target.closest(".drawer");

      if (
        !burgerButton &&
        !drawerElement &&
        (target.closest("header") ||
          target.closest("main") ||
          target.closest("footer"))
      ) {
        closeDrawer();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleContentClick);
      // Prevent body scroll when open
      document.body.style.overflow = "hidden";
      // Add CSS class to trigger transforms on header, main, footer
      document.body.classList.add(bodyClasses);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleContentClick);
      document.body.style.overflow = "";
      document.body.classList.remove(bodyClasses);
    };
  }, [isOpen, closeDrawer, bodyClasses]);

  return (
    <aside className={drawerClasses}>
      <div className="drawer__content">
        <span className="drawer__content-welcome">John Doe</span>
        <nav className="drawer__nav">
          <div className="drawer__nav-item">Workouts</div>
          <div className="drawer__nav-item">Account</div>
          <div className="drawer__nav-item">Contact</div>
          <div className="drawer__nav-item">Logout</div>
        </nav>
      </div>
    </aside>
  );
}
