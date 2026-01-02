"use client";

import type { Exercise } from "@/app/types/workout";
import { useWorkout } from "@/app/contexts/WorkoutContext";
import Set from "./workout/Set";

type ExerciseProps = {
  exerciseProps: Exercise;
};

export default function Exercise({ exerciseProps }: ExerciseProps) {
  const { addSet } = useWorkout();
  const showWeightPerSide =
    exerciseProps.equipmentType === "barbell" ||
    exerciseProps.equipmentType === "trap-bar";
  const weightUnitOfMeasurement = "Lbs";

  const handleAddSet = () => {
    addSet(exerciseProps.id, {
      weightPerSide: 0,
      equipmentType: exerciseProps.equipmentType,
      reps: 0,
    });
  };

  return (
    <div className="exercise">
      <strong className="exercise__name text text--h3">
        {exerciseProps.name}
      </strong>
      <div className="exercise__sets">
        <div
          className={`exercise__set-legend set-table ${
            showWeightPerSide ? "set-table--with-weight-per-side" : ""
          }`}
        >
          <div className="exercise__set-legend-item set-table__item count">
            Set
          </div>
          <div className="exercise__set-legend-item set-table__item previous-weight">
            Prev {weightUnitOfMeasurement}
          </div>
          {showWeightPerSide && (
            <div className="exercise__set-legend-item set-table__item weight-per-side">
              {weightUnitOfMeasurement}/Side
            </div>
          )}
          <div className="exercise__set-legend-item set-table__item weight">
            {weightUnitOfMeasurement}
          </div>
          <div className="exercise__set-legend-item set-table__item reps">
            Reps
          </div>
        </div>
        <div className="exercise__set-list">
          {exerciseProps.sets.map((set, index) => (
            <Set
              key={set.id}
              set={set}
              index={index}
              exerciseId={exerciseProps.id}
            />
          ))}
        </div>
      </div>
      <button
        className="exercise__button-add-set button button--pill button--highlight-green"
        onClick={handleAddSet}
      >
        Add Set
      </button>
    </div>
  );
}
