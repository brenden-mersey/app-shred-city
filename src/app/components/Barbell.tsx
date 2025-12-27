"use client";

import { PLATE_COLOURS } from "../constants/plates";

type LoadedPlate = {
  weight: number;
  count: number;
};

type BarbellProps = {
  barbellLoadedPlates: LoadedPlate[];
};

export default function Barbell({ barbellLoadedPlates }: BarbellProps) {
  // Sort plates by weight descending
  const sortedWeightedPlates = barbellLoadedPlates.sort(
    (a, b) => b.weight - a.weight
  );

  // Expand array: if count is 3, create 3 instances of that weight
  const expandedPlates = sortedWeightedPlates.flatMap((plate) =>
    Array.from({ length: plate.count }, () => ({ weight: plate.weight }))
  );

  return (
    <div className="barbell">
      <div className="barbell__label text--body text--bold">Barbell</div>
      <div className="barbell__plates">
        {expandedPlates.map((plate, index) => {
          const plateColour = PLATE_COLOURS[plate.weight];
          return (
            <div
              key={index}
              className="barbell__plate"
              data-colour={plateColour}
            >
              {plate.weight}
            </div>
          );
        })}
      </div>
    </div>
  );
}
