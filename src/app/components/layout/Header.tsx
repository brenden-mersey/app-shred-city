"use client";

import { useDrawer } from "../../contexts/DrawerContext";

export default function Header() {
  const { toggleDrawer, isOpen } = useDrawer();

  const burgerStrokes = [];
  for (let i = 0; i < 3; i++) {
    burgerStrokes.push(
      <span key={i} className="header__button-burger-stroke"></span>
    );
  }

  return (
    <header className="header">
      <div className="header__container container container--flex">
        <h1 className="header__title">SC</h1>
        <button
          className="header__button-burger button"
          onClick={toggleDrawer}
          aria-label="Open main menu"
          aria-expanded={isOpen}
        >
          {burgerStrokes}
        </button>
      </div>
    </header>
  );
}
