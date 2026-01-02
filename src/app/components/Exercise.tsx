"use client";

import type { Exercise } from "@/app/types/workout";
import { Series } from "@/app/types/workout";
import { useWorkout } from "@/app/contexts/WorkoutContext";
import Set from "./workout/Set";

type ExerciseProps = {
  exerciseProps: Exercise;
};

const SERIES_OPTIONS: Series[] = ["A", "B", "C", "D", "E"];

export default function Exercise({ exerciseProps }: ExerciseProps) {
  const { addSet, updateExercise } = useWorkout();
  const showWeightPerSide =
    exerciseProps.equipmentType === "barbell" ||
    exerciseProps.equipmentType === "trap-bar";
  const weightUnitOfMeasurement = "Lbs";

  const handleAddSet = () => {
    // Get the last set's values to use as defaults
    const lastSet = exerciseProps.sets[exerciseProps.sets.length - 1];
    const defaultWeightPerSide = lastSet?.weightPerSide || 0;
    const defaultReps = lastSet?.reps || 0;

    addSet(exerciseProps.id, {
      weightPerSide: defaultWeightPerSide,
      equipmentType: exerciseProps.equipmentType,
      reps: defaultReps,
    });
  };

  const handleSeriesChange = (newSeries: Series) => {
    updateExercise(exerciseProps.id, { series: newSeries });
  };

  return (
    <div className="exercise">
      <div className="exercise__header">
        <strong className="exercise__name text text--h3">
          {exerciseProps.name}
        </strong>
        <select
          className="exercise__series-select"
          value={exerciseProps.series}
          onChange={(e) => handleSeriesChange(e.target.value as Series)}
          aria-label="Exercise series"
        >
          {SERIES_OPTIONS.map((series) => (
            <option key={series} value={series}>
              {series}
            </option>
          ))}
        </select>
      </div>
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
            {showWeightPerSide ? "Lbs (Total)" : weightUnitOfMeasurement}
          </div>
          <div className="exercise__set-legend-item set-table__item reps">
            Reps
          </div>
          <div className="exercise__set-legend-item set-table__item remove"></div>
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
        className="exercise__button-add-set button button--pill button--highlight-green button--add-set"
        onClick={handleAddSet}
      >
        Add Set
      </button>
    </div>
  );
}
