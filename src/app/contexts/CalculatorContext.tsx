"use client";

import { createContext, useContext, useState } from "react";

type LoadedPlate = {
  weight: number;
  count: number;
};

type CalculatorContextType = {
  // Toggle
  isDoubled: boolean;
  setIsDoubled: (isDoubled: boolean) => void;

  // Toggle
  includeBarWeight: boolean;
  setIncludeBarWeight: (includeBarWeight: boolean) => void;

  // Bar
  barWeight: number;
  setBarWeight: (barWeight: number) => void;

  // Loaded Plate(s)
  loadedPlates: LoadedPlate[];
  addPlate: (weight: number) => void;
  removePlate: (weight: number) => void;
  clearPlates: () => void;
};

const CalculatorContext = createContext<CalculatorContextType | undefined>(
  undefined
);

const findExistingPlateObject = (
  platesArray: LoadedPlate[],
  weight: number
) => {
  return platesArray.find((plate) => plate.weight === weight) ?? null;
};

export function CalculatorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // States
  const [isDoubled, setIsDoubled] = useState(true);
  const [includeBarWeight, setIncludeBarWeight] = useState(true);
  const [barWeight, setBarWeight] = useState(45);
  const [loadedPlates, setLoadedPlates] = useState<LoadedPlate[]>([]);

  // Controller(s)
  // - Add a plate
  const addPlate = (weight: number) => {
    setLoadedPlates((platesArray) => {
      const existingPlate = findExistingPlateObject(platesArray, weight);
      if (existingPlate) {
        return platesArray.map((plate) =>
          plate.weight === weight ? { ...plate, count: plate.count + 1 } : plate
        );
      } else {
        return [...platesArray, { weight, count: 1 }];
      }
    });
  };

  // - Remove a plate
  const removePlate = (weight: number) => {
    setLoadedPlates((platesArray) => {
      const existingPlate = findExistingPlateObject(platesArray, weight);
      // If the plate doesn't exist, return the original array
      if (!existingPlate) return platesArray;
      if (existingPlate.count === 1) {
        // Remove entirely
        return platesArray.filter((p) => p.weight !== weight);
      } else {
        // Decrement count
        return platesArray.map((p) =>
          p.weight === weight ? { ...p, count: p.count - 1 } : p
        );
      }
    });
  };

  // - Clear all plates
  const clearPlates = () => {
    setLoadedPlates([]);
  };

  // Context(s) to share
  const contextValue: CalculatorContextType = {
    isDoubled,
    setIsDoubled,
    barWeight,
    setBarWeight,
    loadedPlates,
    addPlate,
    removePlate,
    clearPlates,
    includeBarWeight,
    setIncludeBarWeight,
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
}
