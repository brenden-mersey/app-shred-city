"use client";

import { useDrawer } from "../../contexts/DrawerContext";
import { useAuth } from "../../contexts/AuthContext";
import { getUserDisplayName } from "../../utils/user";
import IconCalculator from "../icons/iconCalculator";
import Link from "next/link";

export default function Header() {
  const { toggleMenu, menuIsOpen, toggleCalculator, calculatorIsOpen } = useDrawer();
  const { user, loading } = useAuth();

  const displayName = getUserDisplayName(user, "Account");

  const burgerStrokes = [];
  for (let i = 0; i < 3; i++) {
    burgerStrokes.push(<span key={i} className="header__button-burger-stroke"></span>);
  }

  return (
    <header className="header">
      <div className="header__container container container--flex">
        <h1 className="header__title">
          <Link href="/">SC</Link>
        </h1>
        {!loading &&
          (user ? (
            <button type="button" className="header__button-auth button" onClick={toggleMenu} aria-label="Open account menu" aria-expanded={menuIsOpen}>
              {displayName}
            </button>
          ) : (
            <Link className="header__button-auth button" href="/login">
              Log in
            </Link>
          ))}
        <button className="header__button-calculator button" onClick={toggleCalculator} aria-label="Toggle calculator" aria-expanded={calculatorIsOpen}>
          <IconCalculator className="header__button-calculator-icon" />
        </button>
        <button className="header__button-burger button" onClick={toggleMenu} aria-label="Open main menu" aria-expanded={menuIsOpen}>
          {burgerStrokes}
        </button>
      </div>
    </header>
  );
}
