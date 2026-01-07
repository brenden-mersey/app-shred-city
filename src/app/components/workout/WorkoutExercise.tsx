"use client";

import type { Exercise, WeightUnit } from "@/app/types/workout";
import { Series } from "@/app/types/workout";
import { SERIES_OPTIONS } from "@/app/constants/workout";
import { useWorkout } from "@/app/contexts/WorkoutContext";
import {
  usesBarWeight,
  BARBELL_WEIGHT_LBS,
  BARBELL_WEIGHT_KG,
} from "@/app/utils/workouts/weights";
import WorkoutSet from "./WorkoutSet";
import IconTrash from "../icons/IconTrash";
import IconCog from "../icons/IconCog";
import Accordion from "../ui/Accordion";
import WeightUnitToggle from "../ui/WeightUnitToggle";

type WorkoutExerciseProps = {
  exerciseProps: Exercise;
};

export default function WorkoutExercise({
  exerciseProps,
}: WorkoutExerciseProps) {
  const {
    addSet,
    removeExercise,
    updateExercise,
    toggleExerciseWeightUnit,
    workout,
  } = useWorkout();
  const blockName = "exercise";
  const blockClasses = [blockName];
  const showWeightPerSide =
    exerciseProps.equipmentType === "barbell" ||
    exerciseProps.equipmentType === "trap-bar";
  const showPreviousValues = workout.hasPreviousData ?? false;

  // Get the unit for this exercise (exercise override or workout default)
  const exerciseUnit: WeightUnit =
    exerciseProps.weightUnit || workout.defaultWeightUnit;
  const weightUnitDisplay = exerciseUnit.toUpperCase();

  // Check if this equipment type uses bar weight
  const showBarWeight = usesBarWeight(exerciseProps.equipmentType);

  // Get default bar weight based on unit
  const defaultBarWeight =
    exerciseUnit === "lbs" ? BARBELL_WEIGHT_LBS : BARBELL_WEIGHT_KG;

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

  const handleRemoveExercise = () => {
    removeExercise(exerciseProps.id);
  };

  const handleToggleUnit = () => {
    toggleExerciseWeightUnit(exerciseProps.id);
  };

  const handleBarWeightChange = (value: number) => {
    updateExercise(exerciseProps.id, { barWeight: value });
  };

  return (
    <Accordion.Root id={`exercise-${exerciseProps.id}`}>
      <div
        className={blockClasses.join(" ")}
        data-series={exerciseProps.series.toLowerCase()}
        data-weight-per-side={showWeightPerSide}
        data-previous-values={showPreviousValues}
      >
        <div className="exercise__header">
          <strong className="exercise__name text text--h3">
            {exerciseProps.name}
            {exerciseProps.notes && false && (
              <span className="exercise__notes text text--rte">
                {exerciseProps.notes}
              </span>
            )}
          </strong>
          <Accordion.Trigger className="exercise__settings-button button button--pill-outline">
            <IconCog width={18} height={18} />
          </Accordion.Trigger>
        </div>

        <Accordion.Content className="exercise__settings-wrapper">
          <div className="exercise__settings">
            <div className="exercise__setting">
              <label className="exercise__setting-label">Series</label>
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

            <div className="exercise__setting">
              <WeightUnitToggle
                unit={exerciseUnit}
                onToggle={handleToggleUnit}
                label="Weight Unit"
              />
            </div>

            {showBarWeight && (
              <div className="exercise__setting">
                <label className="exercise__setting-label">
                  Bar Weight ({weightUnitDisplay})
                </label>
                <input
                  type="number"
                  className="exercise__bar-weight-input"
                  value={exerciseProps.barWeight ?? defaultBarWeight}
                  onChange={(e) =>
                    handleBarWeightChange(parseFloat(e.target.value) || 0)
                  }
                  min={0}
                  step={exerciseUnit === "lbs" ? 0.5 : 0.25}
                />
              </div>
            )}
          </div>
        </Accordion.Content>

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
                {weightUnitDisplay}/Side
              </div>
            )}
            <div className="exercise__set-legend-item set-table__item weight">
              {showWeightPerSide
                ? `${weightUnitDisplay} (Total)`
                : weightUnitDisplay}
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
                displayUnit={exerciseUnit}
              />
            ))}
          </div>
        </div>
        <div className="exercise__controls">
          <button
            className="exercise__button-remove-exercise button button--pill-circle button--error"
            onClick={handleRemoveExercise}
          >
            <IconTrash />
          </button>
          <button
            className="exercise__button-add-set button button--pill button--highlight-green button--add-set"
            onClick={handleAddSet}
          >
            Add Set
          </button>
        </div>
      </div>
    </Accordion.Root>
  );
}
