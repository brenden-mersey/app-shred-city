"use client";

import type { Exercise } from "@/app/types/workout";
import { Series } from "@/app/types/workout";
import { SERIES_OPTIONS } from "@/app/constants/workout";
import { useWorkout } from "@/app/contexts/WorkoutContext";
import WorkoutSet from "./WorkoutSet";

type WorkoutExerciseProps = {
  exerciseProps: Exercise;
};

export default function WorkoutExercise({
  exerciseProps,
}: WorkoutExerciseProps) {
  const { addSet, updateExercise, workout } = useWorkout();
  const blockName = "exercise";
  const blockClasses = [blockName];
  const showWeightPerSide =
    exerciseProps.equipmentType === "barbell" ||
    exerciseProps.equipmentType === "trap-bar";
  const showPreviousValues = workout.hasPreviousData ?? false;
  const weightUnitOfMeasurement = "Lbs";

  if (showPreviousValues) {
    blockClasses.push(`${blockName}--with-previous-values`);
  }

  if (showWeightPerSide) {
    blockClasses.push(`${blockName}--with-weight-per-side`);
  }

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
    <div
      className={blockClasses.join(" ")}
      data-series={exerciseProps.series.toLowerCase()}
      data-weight-per-side={showWeightPerSide}
      data-previous-values={showPreviousValues}
    >
      <div className="exercise__header">
        <strong className="exercise__name text text--h3">
          {exerciseProps.name}
        </strong>
        <select
          className="exercise__series-select select select--pill-outline"
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
        <div className="exercise__set-legend set-table">
          <div className="exercise__set-legend-item set-table__item set-count">
            Set
          </div>
          {showPreviousValues && (
            <div className="exercise__set-legend-item set-table__item previous-weight">
              Previous
            </div>
          )}
          {showWeightPerSide && (
            <div className="exercise__set-legend-item set-table__item weight-per-side">
              {weightUnitOfMeasurement}/Side
            </div>
          )}
          <div className="exercise__set-legend-item set-table__item weight">
            {showWeightPerSide
              ? `${weightUnitOfMeasurement} (Total)`
              : weightUnitOfMeasurement}
          </div>
          <div className="exercise__set-legend-item set-table__item reps">
            Reps
          </div>
          <div className="exercise__set-legend-item set-table__item remove-set"></div>
        </div>
        <div className="exercise__set-list">
          {exerciseProps.sets.map((set, index) => (
            <WorkoutSet
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
