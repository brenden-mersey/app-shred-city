"use client";

import { useWorkout } from "@/app/contexts/WorkoutContext";
import Exercise from "@/app/components/Exercise";
import AddExercise from "./AddExercise";

export default function Workout() {
  const { workout } = useWorkout();
  return (
    <div className="workout">
      <div className="workout__header">
        <h1 className="workout__title text text--h2">Workout</h1>
        <div className="workout__meta">
          {workout.startTime && (
            <div className="workout__date">
              {new Date(workout.startTime).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
        </div>
      </div>
      <div className="workout__body">
        <AddExercise />
        {workout.exercises.length === 0 ? (
          <div className="workout__empty text--body text--rte">
            <p>No exercises added yet. Add an exercise to get started.</p>
          </div>
        ) : (
          <div className="workout__exercises">
            {workout.exercises.map((exercise) => (
              <Exercise key={exercise.id} exerciseProps={exercise} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
