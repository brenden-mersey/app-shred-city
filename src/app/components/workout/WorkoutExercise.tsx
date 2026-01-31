"use client";

import { useState, useEffect } from "react";
import type { Exercise, WeightUnit } from "@/app/types/workout";
import { Series } from "@/app/types/workout";
import { SERIES_OPTIONS, BAR_WEIGHT_OPTIONS_LBS, BAR_WEIGHT_OPTIONS_KG } from "@/app/constants/workout";
import { useWorkout } from "@/app/contexts/WorkoutContext";
import { usesBarWeight, BARBELL_WEIGHT_LBS, BARBELL_WEIGHT_KG } from "@/app/utils/workouts/weights";
import WorkoutSet from "./WorkoutSet";
import IconTrash from "../icons/IconTrash";
import IconCog from "../icons/IconCog";
import Accordion from "../ui/Accordion";
import RadioGroup from "../ui/RadioGroup";

type WorkoutExerciseProps = {
  exerciseProps: Exercise;
};

export default function WorkoutExercise({ exerciseProps }: WorkoutExerciseProps) {
  const { addSet, removeExercise, updateExercise, toggleExerciseWeightUnit, workout } = useWorkout();
  const blockName = "exercise";
  const blockClasses = [blockName];
  const showWeightPerSide = exerciseProps.equipmentType === "barbell" || exerciseProps.equipmentType === "trap-bar";
  const showPreviousValues = workout.hasPreviousData ?? false;

  // Get the unit for this exercise (exercise override or workout default)
  const exerciseUnit: WeightUnit = exerciseProps.weightUnit || workout.defaultWeightUnit;
  const weightUnitDisplay = exerciseUnit.toUpperCase();

  const [draftSeries, setDraftSeries] = useState<Series>(exerciseProps.series);
  const [draftWeightUnit, setDraftWeightUnit] = useState<WeightUnit>(exerciseProps.weightUnit || workout.defaultWeightUnit);
  const [draftBarWeight, setDraftBarWeight] = useState<number>(() => exerciseProps.barWeight ?? (exerciseUnit === "lbs" ? BARBELL_WEIGHT_LBS : BARBELL_WEIGHT_KG));

  // Sync draft when saved values change (e.g. after save or when exercise updates)
  useEffect(() => {
    setDraftSeries(exerciseProps.series);
    setDraftWeightUnit(exerciseProps.weightUnit || workout.defaultWeightUnit);
    const unit = exerciseProps.weightUnit || workout.defaultWeightUnit;
    const defaultBar = unit === "lbs" ? BARBELL_WEIGHT_LBS : BARBELL_WEIGHT_KG;
    setDraftBarWeight(exerciseProps.barWeight ?? defaultBar);
  }, [exerciseProps.series, exerciseProps.weightUnit, exerciseProps.barWeight, workout.defaultWeightUnit]);

  // Check if this equipment type uses bar weight
  const showBarWeight = usesBarWeight(exerciseProps.equipmentType);

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

  const handleRemoveExercise = () => {
    if (window.confirm("Remove this exercise? This cannot be undone.")) {
      removeExercise(exerciseProps.id);
    }
  };

  const handleSaveSettings = () => {
    // Apply series always
    updateExercise(exerciseProps.id, { series: draftSeries });

    // If unit is changing, toggle first so barWeight is interpreted in the NEW unit
    if (draftWeightUnit !== exerciseUnit) {
      toggleExerciseWeightUnit(exerciseProps.id);
    }

    // Apply bar weight after potential unit toggle
    updateExercise(exerciseProps.id, { barWeight: draftBarWeight });
  };

  const barWeightOptions = draftWeightUnit === "lbs" ? BAR_WEIGHT_OPTIONS_LBS : BAR_WEIGHT_OPTIONS_KG;
  const defaultBar = draftWeightUnit === "lbs" ? BARBELL_WEIGHT_LBS : BARBELL_WEIGHT_KG;
  const selectedBarWeight = barWeightOptions.includes(draftBarWeight) ? draftBarWeight : defaultBar;

  const savedBarWeight = exerciseProps.barWeight ?? (exerciseUnit === "lbs" ? BARBELL_WEIGHT_LBS : BARBELL_WEIGHT_KG);
  const hasSettingsChanged = draftSeries !== exerciseProps.series || draftWeightUnit !== exerciseUnit || (showBarWeight && draftBarWeight !== savedBarWeight);

  return (
    <Accordion.Root id={`exercise-${exerciseProps.id}`}>
      <div className={blockClasses.join(" ")} data-series={exerciseProps.series.toLowerCase()} data-weight-per-side={showWeightPerSide} data-previous-values={showPreviousValues}>
        <div className="exercise__header">
          <strong className="exercise__name text text--h3">
            {exerciseProps.name}
            {exerciseProps.notes && false && <span className="exercise__notes text text--rte">{exerciseProps.notes}</span>}
          </strong>
          <Accordion.Trigger className="exercise__button-settings button">
            <IconCog height={18} />
          </Accordion.Trigger>
        </div>

        <Accordion.Content className="exercise__settings-wrapper">
          <div className="exercise__settings">
            <div className="exercise__setting">
              <RadioGroup name={`series-${exerciseProps.id}`} label="Series" options={SERIES_OPTIONS} value={draftSeries} onChange={setDraftSeries} variant="text" size="sm" />
            </div>

            <div className="exercise__setting">
              <RadioGroup name={`weight-unit-${exerciseProps.id}`} label="Weight Unit" options={["lbs", "kg"]} value={draftWeightUnit} onChange={setDraftWeightUnit} variant="text" size="sm" />
            </div>

            {showBarWeight && (
              <div className="exercise__setting">
                <RadioGroup
                  name={`bar-weight-${exerciseProps.id}`}
                  label={`Bar Weight (${draftWeightUnit.toUpperCase()})`}
                  options={barWeightOptions.map((w) => String(w))}
                  value={String(selectedBarWeight)}
                  onChange={(val) => setDraftBarWeight(parseFloat(val))}
                  variant="text"
                  size="sm"
                />
              </div>
            )}

            <div className="exercise__setting">
              <button type="button" className="exercise__button-save-settings button button--pill" onClick={handleSaveSettings} disabled={!hasSettingsChanged}>
                Save changes
              </button>
            </div>
          </div>
        </Accordion.Content>

        <div className="exercise__sets">
          <div className="exercise__set-legend set-table">
            <div className="exercise__set-legend-item set-table__item set-count">Set</div>
            {showPreviousValues && <div className="exercise__set-legend-item set-table__item previous-weight">Previous</div>}
            {showWeightPerSide && <div className="exercise__set-legend-item set-table__item weight-per-side">{weightUnitDisplay}/Side</div>}
            <div className="exercise__set-legend-item set-table__item weight">{showWeightPerSide ? `${weightUnitDisplay} (Total)` : weightUnitDisplay}</div>
            <div className="exercise__set-legend-item set-table__item reps">Reps</div>
            <div className="exercise__set-legend-item set-table__item remove-set"></div>
          </div>
          <div className="exercise__set-list">
            {exerciseProps.sets.map((set, index) => (
              <WorkoutSet key={set.id} set={set} index={index} exerciseId={exerciseProps.id} displayUnit={exerciseUnit} barWeight={exerciseProps.barWeight ?? (exerciseUnit === "lbs" ? BARBELL_WEIGHT_LBS : BARBELL_WEIGHT_KG)} />
            ))}
          </div>
        </div>
        <div className="exercise__controls">
          <button className="exercise__button-remove-exercise button" onClick={handleRemoveExercise}>
            <IconTrash height={18} />
          </button>
          <button className="exercise__button-add-set button button--pill button--add-set" onClick={handleAddSet}>
            Add Set
          </button>
        </div>
      </div>
    </Accordion.Root>
  );
}
