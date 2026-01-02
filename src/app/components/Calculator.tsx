"use client";

import { useRef } from "react";
import { PLATE_WEIGHTS } from "../constants/plates";
import { useCalculator } from "../contexts/CalculatorContext";
import Plate from "./Plate";
import Toggle from "./Toggle";
import Barbell from "./Barbell";

export default function Calculator() {
  const {
    isDoubled,
    setIsDoubled,
    addPlate,
    barWeight,
    loadedPlates,
    removePlate,
    clearPlates,
    includeBarWeight,
    setIncludeBarWeight,
  } = useCalculator();

  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const weightPerSide = loadedPlates.reduce(
    (sum, plate) => sum + plate.weight * plate.count,
    0
  );
  const weightWithoutBar = weightPerSide * (isDoubled ? 2 : 1);
  const totalWeight = weightWithoutBar + (includeBarWeight ? barWeight : 0);

  const handleClear = () => {
    clearPlates();
    // Remove focus/hover state on mobile after a short delay
    setTimeout(() => {
      clearButtonRef.current?.blur();
    }, 100);
  };

  return (
    <div className="calculator">
      <div className="calculator__total-weight">
        <span className="calculator__total-weight-value">{totalWeight}</span>
        <span className="calculator__total-weight-unit">lbs</span>
      </div>

      <Barbell barbellLoadedPlates={loadedPlates} />

      <div className="calculator__plate-grid plate-grid">
        {PLATE_WEIGHTS.map((weight) => {
          const loaded = loadedPlates.find((p) => p.weight === weight);
          const count = loaded?.count ?? 0;
          return (
            <Plate
              key={weight}
              weight={weight}
              count={count}
              onAdd={() => addPlate(weight)}
              onRemove={() => removePlate(weight)}
            />
          );
        })}
      </div>

      <div className="calculator__toggles">
        <div className="calculator__toggles-item">
          <Toggle
            isEnabled={isDoubled}
            setIsEnabled={setIsDoubled}
            label="Total Weight (Both Sides)"
          />
        </div>
        <div className="calculator__toggles-item">
          <Toggle
            isEnabled={includeBarWeight}
            setIsEnabled={setIncludeBarWeight}
            label="Bar Weight (45lbs)"
          />
        </div>
      </div>

      <button
        ref={clearButtonRef}
        className="calculator__button-clear button button--pill button--danger"
        onClick={handleClear}
      >
        Clear
      </button>
    </div>
  );
}
