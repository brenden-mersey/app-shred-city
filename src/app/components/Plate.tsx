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
    <div className="plate">
      <button
        className="plate__button button"
        onClick={onAdd}
        data-weight={weight}
        data-colour={plateColour}
      >
        <div className="plate__weight-marker">
          <span className="plate__weight">{weight}</span>
          <span className="plate__unit">LB</span>
        </div>
      </button>

      {count > 0 && <span className="plate__count">×{count}</span>}

      <div className="plate__controls">
        <button onClick={onAdd}>+</button>
        <button onClick={onRemove} disabled={count === 0}>
          -
        </button>
      </div>
    </div>
  );
}
