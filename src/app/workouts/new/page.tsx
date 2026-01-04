"use client";

import { WorkoutSession } from "@/app/types/workout";
import { WorkoutProvider } from "@/app/contexts/WorkoutContext";
import Workout from "@/app/components/workout/Workout";

// Helper function to create a new empty workout
function createNewWorkout(hasPreviousData: boolean = false): WorkoutSession {
  return {
    id: crypto.randomUUID(),
    date: new Date(),
    exercises: [],
    startTime: new Date(),
    hasPreviousData,
  };
}

export default function NewWorkoutPage() {
  const initialWorkout = createNewWorkout();

  return (
    <WorkoutProvider initialWorkout={initialWorkout}>
      <main className="main">
        <section className="section">
          <div className="container">
            <Workout />
          </div>
        </section>
      </main>
    </WorkoutProvider>
  );
}
