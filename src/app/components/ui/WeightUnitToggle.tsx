"use client";

import type { WeightUnit } from "@/app/types/workout";

type WeightUnitToggleProps = {
  unit: WeightUnit;
  onToggle: () => void;
  label?: string;
};

export default function WeightUnitToggle({
  unit,
  onToggle,
  label = "Weight Unit",
}: WeightUnitToggleProps) {
  return (
    <div className="weight-unit-toggle">
      {label && <label className="weight-unit-toggle__label">{label}</label>}
      <div className="weight-unit-toggle__options">
        <button
          type="button"
          className={`weight-unit-toggle__option ${
            unit === "lbs" ? "weight-unit-toggle__option--active" : ""
          }`}
          onClick={() => unit !== "lbs" && onToggle()}
          aria-pressed={unit === "lbs"}
        >
          LBS
        </button>
        <button
          type="button"
          className={`weight-unit-toggle__option ${
            unit === "kg" ? "weight-unit-toggle__option--active" : ""
          }`}
          onClick={() => unit !== "kg" && onToggle()}
          aria-pressed={unit === "kg"}
        >
          KG
        </button>
      </div>
    </div>
  );
}
