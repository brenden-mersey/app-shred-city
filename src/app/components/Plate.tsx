"use client";

import { PLATE_COLOURS } from "../constants/plates";

type PlateProps = {
  weight: number;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
};

export default function Plate({ weight, count, onAdd, onRemove }: PlateProps) {
  const plateColour = PLATE_COLOURS[weight];
  return (
    <div className={`plate plate--${plateColour}`}>
      <button className="plate__button-add button" onClick={onAdd}>
        <span className="plate__button-add-circle-big"></span>
        <span className="plate__button-add-circle-small"></span>
        <span className="plate__button-add-circle-hole"></span>
        <div className="plate__button-add-content">
          <span className="plate__button-weight">{weight}</span>
          <span className="plate__button-unit">lbs</span>
        </div>
      </button>

      {count > 0 && <span className="plate__count">×{count}</span>}

      <button className="plate__button-remove button" onClick={onRemove} disabled={count === 0}>
        <span className="plate__button-icon">-</span>
      </button>
    </div>
  );
}
