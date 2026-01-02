"use client";

import { useEffect } from "react";
import { useDrawer } from "../../contexts/DrawerContext";
import Calculator from "../Calculator";
import ButtonClose from "../ui/ButtonClose";

type DrawerProps = {
  children?: React.ReactNode;
};

export default function DrawerCalculator({ children }: DrawerProps) {
  const { calculatorIsOpen, closeCalculator, closeAllDrawers } = useDrawer();
  const drawerClass = "drawer-calculator";
  const classes = `${drawerClass} ${
    calculatorIsOpen ? `${drawerClass}--open` : `${drawerClass}--closed`
  }`;

  // Close on Escape key, manage body scroll/class, and handle clicks on pushed content
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllDrawers();
    };

    const handleContentClick = (e: MouseEvent) => {
      // Close drawer when clicking on pushed content (header, main, footer)
      // But exclude the burger button and drawer itself
      const target = e.target as HTMLElement;
      const burgerButton = target.closest(".header__button-calculator");
      const drawerElement = target.closest(`.${drawerClass}`);

      if (
        !burgerButton &&
        !drawerElement &&
        (target.closest("header") ||
          target.closest("main") ||
          target.closest("footer"))
      ) {
        closeCalculator();
      }
    };

    if (calculatorIsOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleContentClick);
      // Prevent body scroll when open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleContentClick);
      document.body.style.overflow = "";
    };
  }, [calculatorIsOpen, closeCalculator, closeAllDrawers]);

  return (
    <aside className={classes}>
      <div className={`${drawerClass}__header`}>
        <div className="header__container container container--flex">
          <ButtonClose
            ariaLabel="Close Calculator"
            blockName={drawerClass}
            handleClick={closeCalculator}
          />
        </div>
      </div>
      <div className={`${drawerClass}__main`}>
        <Calculator />
      </div>
    </aside>
  );
}
