"use client";
import PlateWeightMarker from "./PlateWeightMarker";
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
        className="plate__button-add button"
        onClick={onAdd}
        data-weight={weight}
        data-colour={plateColour}
      >
        <div className="plate__circle-container">
          <span className="plate__circle-big"></span>
          <span className="plate__circle-small"></span>
          <span className="plate__circle-hole"></span>
        </div>
        <div className="plate__content-container">
          <PlateWeightMarker weight={weight} side="left" />
          <PlateWeightMarker weight={weight} side="right" />
        </div>
      </button>

      {count > 0 && <span className="plate__count">×{count}</span>}

      <button
        className="plate__button-remove button"
        onClick={onRemove}
        disabled={count === 0}
      >
        <span className="plate-cell__remove-icon">-</span>
      </button>
    </div>
  );
}
