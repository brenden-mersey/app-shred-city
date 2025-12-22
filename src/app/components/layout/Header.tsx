"use client";

import { useDrawer } from "../../contexts/DrawerContext";
import IconCalculator from "../icons/iconCalculator";

export default function Header() {
  const { toggleMenu, menuIsOpen, toggleCalculator, calculatorIsOpen } =
    useDrawer();

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
          className="header__button-calculator button"
          onClick={toggleCalculator}
          aria-label="Toggle calculator"
          aria-expanded={calculatorIsOpen}
        >
          <IconCalculator className="header__button-calculator-icon" />
        </button>
        <button
          className="header__button-burger button"
          onClick={toggleMenu}
          aria-label="Open main menu"
          aria-expanded={menuIsOpen}
        >
          {burgerStrokes}
        </button>
      </div>
    </header>
  );
}
