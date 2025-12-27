"use client";

import { WorkoutSession } from "@/app/types/workout";
import Link from "next/link";

export default function WorkoutsPage() {
  // TODO: Load workouts from storage (localStorage/IndexedDB later)
  const workouts: WorkoutSession[] = [];

  return (
    <main className="main">
      <section className="section">
        <div className="container">
          <h2 className="text text--h2">Workouts</h2>

          {/* Call to action to start new workout */}
          <div className="workouts__actions">
            <Link
              href="/workouts/new"
              className="button button--start-workout button--primary"
            >
              <span className="button__icon">+</span>
              <span className="button__text">Start a New Workout</span>
            </Link>
          </div>

          {/* Archive of previous workouts */}
          <div className="workouts__archive">
            {workouts.length === 0 ? (
              <div className="workouts__empty">
                <p>
                  No workouts yet. Start your first workout to begin tracking!
                </p>
              </div>
            ) : (
              <div className="workouts__list">
                {workouts.map((workout) => (
                  <div key={workout.id} className="workouts__item">
                    {/* Workout card will go here */}
                    <div className="workouts__item-date">
                      {new Date(workout.startTime).toLocaleDateString()}
                    </div>
                    <div className="workouts__item-exercises">
                      {workout.exercises.length} exercise
                      {workout.exercises.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
