"use client";

import { useMenu } from "../contexts/DrawerContext";

export default function MainMenu() {
  const { closeMenu } = useMenu();

  return (
    <nav className="main-menu__nav">
      <div className="main-menu__header">
        <h2 className="main-menu__title">Menu</h2>
        <button
          className="main-menu__close"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          ×
        </button>
      </div>

      <ul className="main-menu__list">
        <li className="main-menu__item">
          <a href="/" className="main-menu__link" onClick={closeMenu}>
            Calculator
          </a>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </nav>
  );
}
