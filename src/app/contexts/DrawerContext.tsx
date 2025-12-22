"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type DrawerContextType = {
  // Menu drawer state
  menuIsOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  // Calculator drawer state
  calculatorIsOpen: boolean;
  openCalculator: () => void;
  closeCalculator: () => void;
  toggleCalculator: () => void;
  // Helper to close all drawers
  closeAllDrawers: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [calculatorIsOpen, setCalculatorIsOpen] = useState(false);

  // Menu drawer controls
  const openMenu = () => {
    setCalculatorIsOpen(false); // Close calculator when opening menu
    setMenuIsOpen(true);
  };
  const closeMenu = () => setMenuIsOpen(false);
  const toggleMenu = () => {
    if (menuIsOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Calculator drawer controls
  const openCalculator = () => {
    setMenuIsOpen(false); // Close menu when opening calculator
    setCalculatorIsOpen(true);
  };
  const closeCalculator = () => setCalculatorIsOpen(false);
  const toggleCalculator = () => {
    if (calculatorIsOpen) {
      closeCalculator();
    } else {
      openCalculator();
    }
  };

  // Close all drawers
  const closeAllDrawers = () => {
    setMenuIsOpen(false);
    setCalculatorIsOpen(false);
  };

  return (
    <DrawerContext.Provider
      value={{
        menuIsOpen,
        openMenu,
        closeMenu,
        toggleMenu,
        calculatorIsOpen,
        openCalculator,
        closeCalculator,
        toggleCalculator,
        closeAllDrawers,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
}
