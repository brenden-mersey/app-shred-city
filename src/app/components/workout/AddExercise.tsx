"use client";

import { useState } from "react";
import { useWorkout } from "@/app/contexts/WorkoutContext";
import {
  EXERCISE_LIBRARY,
  type ExerciseTemplate,
} from "@/app/constants/exercises";
import { Series } from "@/app/types/workout";

export default function AddExercise() {
  const { addExercise } = useWorkout();
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");

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
      series: "A", // Default to series A, can be changed later
      instructions: exerciseTemplate.instructions,
    });

    // Reset selection
    setSelectedExerciseId("");
  };

  return (
    <div className="add-exercise">
      <select
        className="add-exercise__select"
        value={selectedExerciseId}
        onChange={(e) => setSelectedExerciseId(e.target.value)}
      >
        <option value="">Select an exercise...</option>
        {EXERCISE_LIBRARY.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.name}
          </option>
        ))}
      </select>
      <button
        className="add-exercise__button button button--pill"
        onClick={handleAdd}
        disabled={!selectedExerciseId}
      >
        Add Exercise
      </button>
    </div>
  );
}
