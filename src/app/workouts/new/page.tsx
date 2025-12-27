"use client";

import { useState } from "react";
import { WorkoutSession } from "@/app/types/workout";
import Workout from "@/app/components/workout/Workout";

// Temporary: Helper function to create a new empty workout
function createNewWorkout(): WorkoutSession {
  return {
    id: crypto.randomUUID(),
    date: new Date(),
    exercises: [],
    startTime: new Date(),
  };
}

export default function NewWorkoutPage() {
  const [workout] = useState<WorkoutSession>(createNewWorkout);

  return (
    <main className="main">
      <section className="section">
        <div className="container">
          <Workout workout={workout} />
        </div>
      </section>
    </main>
  );
}
