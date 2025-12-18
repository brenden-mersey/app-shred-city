"use client";

import { PLATE_WEIGHTS } from "../constants/plates";
import { useCalculator } from "../contexts/CalculatorContext";
import Plate from "./Plate";

export default function Calculator() {
  const { isDoubled, setIsDoubled, addPlate, barWeight, loadedPlates, removePlate, clearPlates } = useCalculator();

  const weightPerSide = loadedPlates.reduce((sum, plate) => sum + plate.weight * plate.count, 0);
  const weightWithoutBar = weightPerSide * (isDoubled ? 2 : 1);
  const totalWeight = weightWithoutBar + barWeight;

  return (
    <div className="calculator">
      <h2>Calculator</h2>
      <h3>Total Weight: {totalWeight} lbs</h3>
      <p>Enter your target weight and get the plate breakdown.</p>
      <button className="calculator__button button button--primary" onClick={() => setIsDoubled(!isDoubled)}>
        <span>{isDoubled ? "Both Sides" : "Single Side"}</span>
      </button>
      <div className="calculator__plate-rack plate-rack">
        {PLATE_WEIGHTS.map((weight) => {
          const loaded = loadedPlates.find((p) => p.weight === weight);
          const count = loaded?.count ?? 0;
          return <Plate key={weight} weight={weight} count={count} onAdd={() => addPlate(weight)} onRemove={() => removePlate(weight)} />;
        })}
      </div>
      <button className="calculator__button button button--primary" onClick={clearPlates}>
        Clear Plates
      </button>
    </div>
  );
}
