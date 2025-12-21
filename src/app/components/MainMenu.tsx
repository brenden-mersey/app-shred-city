"use client";

import { useState } from "react";
import Drawer from "./layout/Drawer";

export default function MainMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="main-menu__toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Open main menu"
        aria-expanded={isOpen}
      >
        <span className="main-menu__toggle-icon" aria-hidden="true">
          ☰
        </span>
      </button>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <nav className="main-menu__nav">
          <div className="main-menu__header">
            <h2 className="main-menu__title">Menu</h2>
            <button
              className="main-menu__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <ul className="main-menu__list">
            <li className="main-menu__item">
              <a
                href="/"
                className="main-menu__link"
                onClick={() => setIsOpen(false)}
              >
                Calculator
              </a>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </nav>
      </Drawer>
    </>
  );
}
