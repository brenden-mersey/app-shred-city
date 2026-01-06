"use client";

import { useEffect } from "react";
import { useDrawer } from "../../contexts/DrawerContext";
import { useAuth } from "../../contexts/AuthContext";

type DrawerProps = {
  children?: React.ReactNode;
};

export default function DrawerMenu({ children }: DrawerProps) {
  const { menuIsOpen, closeMenu, closeAllDrawers } = useDrawer();
  const { user, signOut } = useAuth();
  const drawerClass = "drawer-menu";
  const classes = `${drawerClass} ${
    menuIsOpen ? `${drawerClass}--open` : `${drawerClass}--closed`
  }`;
  const bodyClasses = `${drawerClass}--open`;

  // Close on Escape key, manage body scroll/class, and handle clicks on pushed content
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllDrawers();
    };

    const handleContentClick = (e: MouseEvent) => {
      // Close drawer when clicking on pushed content (header, main, footer)
      // But exclude the burger button and drawer itself
      const target = e.target as HTMLElement;
      const burgerButton = target.closest(".header__button-burger");
      const drawerElement = target.closest(`.${drawerClass}`);

      if (
        !burgerButton &&
        !drawerElement &&
        (target.closest("header") ||
          target.closest("main") ||
          target.closest("footer"))
      ) {
        closeMenu();
      }
    };

    if (menuIsOpen) {
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
  }, [menuIsOpen, closeMenu, closeAllDrawers, bodyClasses]);

  const handleLogout = async () => {
    await signOut();
    closeMenu();
    window.location.href = "/login";
  };

  return (
    <aside className={classes}>
      <div className={`${drawerClass}__content`}>
        {user ? (
          <>
            <span className={`${drawerClass}__content-welcome`}>
              {user.email}
            </span>
            <nav className={`${drawerClass}__nav`}>
              <div className={`${drawerClass}__nav-item`}>Workouts</div>
              <div className={`${drawerClass}__nav-item`}>Account</div>
              <div className={`${drawerClass}__nav-item`}>Contact</div>
              <div
                className={`${drawerClass}__nav-item`}
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Logout
              </div>
            </nav>
          </>
        ) : (
          <span className={`${drawerClass}__content-welcome`}>
            Not logged in
          </span>
        )}
      </div>
    </aside>
  );
}
