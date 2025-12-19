"use client";

import { PLATE_WEIGHTS } from "../constants/plates";
import { useCalculator } from "../contexts/CalculatorContext";
import Plate from "./Plate";
import Toggle from "./Toggle";

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

  const weightPerSide = loadedPlates.reduce(
    (sum, plate) => sum + plate.weight * plate.count,
    0
  );
  const weightWithoutBar = weightPerSide * (isDoubled ? 2 : 1);
  const totalWeight = weightWithoutBar + (includeBarWeight ? barWeight : 0);

  return (
    <div className="calculator">
      <div className="calculator__total-weight">
        <span className="calculator__total-weight-value">{totalWeight}</span>
        <span className="calculator__total-weight-unit">lbs</span>
      </div>

      <div className="calculator__plate-rack plate-rack">
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
        <Toggle
          isEnabled={isDoubled}
          setIsEnabled={setIsDoubled}
          label="Total Weight (Both Sides)"
        />
        <Toggle
          isEnabled={includeBarWeight}
          setIsEnabled={setIncludeBarWeight}
          label="Include Bar Weight (45lbs)"
        />
      </div>

      <button
        className="calculator__button-clear button button--pill button--danger"
        onClick={clearPlates}
      >
        Clear Plates
      </button>
    </div>
  );
}
