"use client";

import { useCalculator } from "../contexts/CalculatorContext";

export default function Calculator() {
  const { isDoubled, setIsDoubled } = useCalculator();

  return (
    <div className="calculator">
      <h2>Calculator</h2>
      <p>Enter your target weight and get the plate breakdown.</p>
      <button onClick={() => setIsDoubled(!isDoubled)}>
        <span>Barbell (both sides)</span>
      </button>
    </div>
  );
}
