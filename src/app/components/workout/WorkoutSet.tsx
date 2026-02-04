"use client";

import { useState, useEffect } from "react";
import { Set as SetType, EquipmentType, WeightUnit } from "@/app/types/workout";
import { useWorkout } from "@/app/contexts/WorkoutContext";
import ButtonClose from "../ui/ButtonClose";

type WorkoutSetProps = {
  set: SetType;
  index: number;
  exerciseId: string;
  displayUnit: WeightUnit;
  barWeight: number;
};

/**
 * Calculate weight per side from total weight (reverse of calculateTotalWeight)
 */
function calculateWeightPerSide(totalWeight: number, equipmentType: EquipmentType, barWeight: number = 45): number {
  switch (equipmentType) {
    case "barbell":
    case "trap-bar":
      return (totalWeight - barWeight) / 2;
    case "dumbbell":
      return totalWeight / 2; // Pair
    case "kettlebell":
      return totalWeight; // Single
    case "landmine":
      return totalWeight - barWeight;
    case "machine":
    case "cable":
    case "bodyweight":
    case "other":
      return totalWeight;
    default:
      return totalWeight;
  }
}

/**
 * Calculate total weight from weight per side (matches context function)
 */
function calculateTotalWeight(weightPerSide: number, equipmentType: EquipmentType, barWeight: number = 45): number {
  switch (equipmentType) {
    case "barbell":
    case "trap-bar":
      return weightPerSide * 2 + barWeight;
    case "dumbbell":
    case "kettlebell":
      return weightPerSide; // Matches context logic
    case "landmine":
      return weightPerSide + barWeight;
    case "machine":
    case "cable":
    case "bodyweight":
    case "other":
      return weightPerSide;
    default:
      return weightPerSide;
  }
}

export default function WorkoutSet({ set, index, exerciseId, displayUnit, barWeight }: WorkoutSetProps) {
  const { updateSet, removeSet, workout } = useWorkout();
  const showWeightPerSide = set.equipmentType === "barbell" || set.equipmentType === "trap-bar";
  const showPreviousValues = workout.hasPreviousData ?? false;
  const setNumber = index + 1;

  // Determine step size based on unit (lbs: 0.5, kg: 0.25)
  const weightStep = displayUnit === "lbs" ? 0.5 : 0.25;

  // Local state for inputs (controlled components)
  const [totalWeight, setTotalWeight] = useState(set.totalWeight || 0);
  const [weightPerSide, setWeightPerSide] = useState(set.weightPerSide || 0);
  const [reps, setReps] = useState(set.reps || 0);

  // Sync with set data when it changes (e.g. after bar weight or unit change in exercise settings)
  useEffect(() => {
    setTotalWeight(set.totalWeight ?? 0);
    setWeightPerSide(set.weightPerSide ?? 0);
    setReps(set.reps ?? 0);
  }, [set.id, set.totalWeight, set.weightPerSide, set.reps]);

  const handleTotalWeightChange = (value: number) => {
    setTotalWeight(value);
    // Calculate weight per side from total weight
    const calculatedWeightPerSide = calculateWeightPerSide(value, set.equipmentType, barWeight);
    setWeightPerSide(calculatedWeightPerSide);

    // Update the set in context
    updateSet(exerciseId, set.id, {
      totalWeight: value,
      weightPerSide: calculatedWeightPerSide,
    });
  };

  const handleWeightPerSideChange = (value: number) => {
    setWeightPerSide(value);

    // Only calculate total weight for barbell/trap-bar (where it's meaningful)
    if (showWeightPerSide) {
      const calculatedTotalWeight = calculateTotalWeight(value, set.equipmentType, barWeight);
      setTotalWeight(calculatedTotalWeight);

      // Update the set in context
      updateSet(exerciseId, set.id, {
        weightPerSide: value,
        totalWeight: calculatedTotalWeight,
      });
    } else {
      // For non-barbell exercises, weightPerSide IS the weight (no total needed)
      // Still update totalWeight for data consistency, but it equals weightPerSide
      updateSet(exerciseId, set.id, {
        weightPerSide: value,
        totalWeight: value, // For non-barbell, totalWeight = weightPerSide
      });
    }
  };

  const handleRepsChange = (value: number) => {
    setReps(value);
    updateSet(exerciseId, set.id, {
      reps: value,
    });
  };

  const handleRemoveSet = () => {
    removeSet(exerciseId, set.id);
  };

  return (
    <div className="set set-table">
      <div className="set-table__item set-count">
        <span className="set__count-value">{setNumber}</span>
      </div>
      {showPreviousValues && (
        <div className="set-table__item previous-weight">
          <span className="set__previous-weight-value">{set.previousWeight ?? "--"}</span>
        </div>
      )}
      {showWeightPerSide && (
        <div className="set-table__item weight-per-side">
          <input type="number" name="weight-per-side" min={0} step={weightStep} value={weightPerSide || ""} onChange={(e) => handleWeightPerSideChange(parseFloat(e.target.value) || 0)} />
        </div>
      )}
      <div className="set-table__item weight">
        <input
          type="number"
          name="weight"
          min={0}
          step={weightStep}
          value={showWeightPerSide ? totalWeight || "" : weightPerSide || ""}
          onChange={(e) => {
            const value = parseFloat(e.target.value) || 0;
            if (showWeightPerSide) {
              handleTotalWeightChange(value);
            } else {
              // For non-barbell exercises, weight input directly updates weightPerSide
              handleWeightPerSideChange(value);
            }
          }}
        />
      </div>
      <div className="set-table__item reps">
        <input type="number" min={0} name="reps" value={reps || ""} onChange={(e) => handleRepsChange(parseInt(e.target.value) || 0)} />
      </div>
      <div className="set-table__item remove-set">
        <ButtonClose ariaLabel="Remove Set" blockName="set" handleClick={handleRemoveSet} />
      </div>
    </div>
  );
}
