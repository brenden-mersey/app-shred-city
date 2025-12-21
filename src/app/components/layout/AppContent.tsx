"use client";

import { useDrawer } from "../../contexts/DrawerContext";

type AppContentProps = {
  children: React.ReactNode;
};

export default function AppContent({ children }: AppContentProps) {
  const { isOpen, closeDrawer } = useDrawer();

  // Close drawer when clicking on the pushed content
  const handleContentClick = () => {
    if (isOpen) {
      closeDrawer();
    }
  };

  return (
    <div
      className={`app-content ${isOpen ? "app-content--pushed" : ""}`}
      onClick={handleContentClick}
    >
      {children}
    </div>
  );
}

