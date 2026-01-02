"use client";

import { createContext, useContext, useState } from "react";
import {
  WorkoutSession,
  Exercise,
  Series,
  EquipmentType,
} from "@/app/types/workout";

type WorkoutContextType = {
  // Current workout session
  workout: WorkoutSession;

  // Exercise management
  addExercise: (exercise: Omit<Exercise, "id" | "sets">) => void;
  removeExercise: (exerciseId: string) => void;
  updateExercise: (exerciseId: string, updates: Partial<Exercise>) => void;

  // Set management (within exercises)
  addSet: (
    exerciseId: string,
    set: Omit<
      Exercise["sets"][0],
      "id" | "timestamp" | "setNumber" | "totalWeight"
    >
  ) => void;
  removeSet: (exerciseId: string, setId: string) => void;
  updateSet: (
    exerciseId: string,
    setId: string,
    updates: Partial<Exercise["sets"][0]>
  ) => void;

  // Workout metadata
  updateWorkoutNotes: (notes: string) => void;
  endWorkout: () => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

/**
 * Calculate total weight based on weight per side and equipment type
 * Bar weight defaults to 45lbs for barbell/trap-bar/landmine
 */
function calculateTotalWeight(
  weightPerSide: number,
  equipmentType: EquipmentType,
  barWeight: number = 45
): number {
  switch (equipmentType) {
    case "barbell":
    case "trap-bar":
      return weightPerSide * 2 + barWeight;
    case "dumbbell":
    case "kettlebell":
      return weightPerSide; // Single
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

export function WorkoutProvider({
  children,
  initialWorkout,
}: {
  children: React.ReactNode;
  initialWorkout: WorkoutSession;
}) {
  const [workout, setWorkout] = useState<WorkoutSession>(initialWorkout);

  // Add an exercise to the workout (with a default set)
  const addExercise = (exerciseData: Omit<Exercise, "id" | "sets">) => {
    const exerciseId = crypto.randomUUID();

    // Create a default set for the new exercise
    const defaultSet: Exercise["sets"][0] = {
      id: crypto.randomUUID(),
      weightPerSide: 0,
      totalWeight: calculateTotalWeight(0, exerciseData.equipmentType),
      equipmentType: exerciseData.equipmentType,
      reps: 0,
      setNumber: 1,
      timestamp: new Date(),
    };

    const newExercise: Exercise = {
      ...exerciseData,
      id: exerciseId,
      sets: [defaultSet],
    };

    setWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }));
  };

  // Remove an exercise from the workout
  const removeExercise = (exerciseId: string) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== exerciseId),
    }));
  };

  // Update an exercise (e.g., change notes, equipment type, series)
  const updateExercise = (exerciseId: string, updates: Partial<Exercise>) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, ...updates } : ex
      ),
    }));
  };

  // Add a set to an exercise
  const addSet = (
    exerciseId: string,
    setData: Omit<
      Exercise["sets"][0],
      "id" | "timestamp" | "setNumber" | "totalWeight"
    >
  ) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) => {
        if (ex.id !== exerciseId) return ex;

        const newSetNumber = ex.sets.length + 1;
        const totalWeight = calculateTotalWeight(
          setData.weightPerSide,
          setData.equipmentType
        );

        const newSet: Exercise["sets"][0] = {
          ...setData,
          id: crypto.randomUUID(),
          timestamp: new Date(),
          setNumber: newSetNumber,
          totalWeight,
        };

        return {
          ...ex,
          sets: [...ex.sets, newSet],
        };
      }),
    }));
  };

  // Remove a set from an exercise
  const removeSet = (exerciseId: string, setId: string) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) => {
        if (ex.id !== exerciseId) return ex;

        const updatedSets = ex.sets
          .filter((s) => s.id !== setId)
          .map((set, index) => ({
            ...set,
            setNumber: index + 1, // Re-number sets
          }));

        return {
          ...ex,
          sets: updatedSets,
        };
      }),
    }));
  };

  // Update a set (e.g., change weight, reps)
  const updateSet = (
    exerciseId: string,
    setId: string,
    updates: Partial<Exercise["sets"][0]>
  ) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) => {
        if (ex.id !== exerciseId) return ex;

        return {
          ...ex,
          sets: ex.sets.map((set) => {
            if (set.id !== setId) return set;

            // Recalculate totalWeight if weightPerSide or equipmentType changed
            let totalWeight = set.totalWeight;
            if (
              updates.weightPerSide !== undefined ||
              updates.equipmentType !== undefined
            ) {
              const newWeightPerSide =
                updates.weightPerSide ?? set.weightPerSide;
              const newEquipmentType =
                updates.equipmentType ?? set.equipmentType;
              totalWeight = calculateTotalWeight(
                newWeightPerSide,
                newEquipmentType
              );
            }

            return {
              ...set,
              ...updates,
              totalWeight,
            };
          }),
        };
      }),
    }));
  };

  // Update workout notes
  const updateWorkoutNotes = (notes: string) => {
    setWorkout((prev) => ({
      ...prev,
      notes,
    }));
  };

  // End the workout (set endTime and calculate duration)
  const endWorkout = () => {
    const endTime = new Date();
    const duration = Math.round(
      (endTime.getTime() - workout.startTime.getTime()) / 1000 / 60
    ); // Duration in minutes

    setWorkout((prev) => ({
      ...prev,
      endTime,
      duration,
    }));
  };

  const contextValue: WorkoutContextType = {
    workout,
    addExercise,
    removeExercise,
    updateExercise,
    addSet,
    removeSet,
    updateSet,
    updateWorkoutNotes,
    endWorkout,
  };

  return (
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}
