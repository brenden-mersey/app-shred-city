"use client";

import { useState } from "react";
import { useWorkout } from "@/app/contexts/WorkoutContext";
import {
  EXERCISE_LIBRARY,
  type ExerciseTemplate,
} from "@/app/constants/exercises";
import { SERIES_OPTIONS } from "@/app/constants/workout";
import { Series } from "@/app/types/workout";

export default function WorkoutAddExercise() {
  const { addExercise } = useWorkout();
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
  const [selectedSeries, setSelectedSeries] = useState<Series | "">("");

  const handleAdd = () => {
    if (!selectedExerciseId) return;

    const exerciseTemplate = EXERCISE_LIBRARY.find(
      (ex) => ex.id === selectedExerciseId
    );

    if (!exerciseTemplate) return;

    // Convert ExerciseTemplate to Exercise format for the workout
    addExercise({
      name: exerciseTemplate.name,
      category: exerciseTemplate.category,
      muscleGroups: exerciseTemplate.muscleGroups,
      defaultEquipment: exerciseTemplate.defaultEquipment,
      equipmentType: exerciseTemplate.defaultEquipment,
      series: (selectedSeries || "A") as Series, // Use selected series or default to "A"
      instructions: exerciseTemplate.instructions,
      notes: exerciseTemplate.notes,
    });

    // Reset selections
    setSelectedExerciseId("");
    setSelectedSeries("");
  };

  return (
    <div className="workout__add-exercise">
      <div className="workout__add-exercise-options">
        <select
          className="workout__add-exercise-select select select--pill"
          value={selectedExerciseId}
          onChange={(e) => setSelectedExerciseId(e.target.value)}
        >
          <option value="">Select exercise...</option>
          {EXERCISE_LIBRARY.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <select
          className="workout__add-exercise-series select select--pill"
          value={selectedSeries}
          onChange={(e) => setSelectedSeries(e.target.value as Series | "")}
        >
          <option value="">Select series...</option>
          {SERIES_OPTIONS.map((series) => (
            <option key={series} value={series}>
              {series}
            </option>
          ))}
        </select>
      </div>
      <button
        className="workout__button-add-exercise button button--pill"
        onClick={handleAdd}
        disabled={!selectedExerciseId}
      >
        Add Exercise
      </button>
    </div>
  );
}
