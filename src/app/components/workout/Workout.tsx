"use client";

import { SERIES_OPTIONS } from "@/app/constants/workout";
import { useWorkout } from "@/app/contexts/WorkoutContext";
import WorkoutExercise from "./WorkoutExercise";
import WorkoutAddExercise from "./WorkoutAddExercise";

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
        {workout.exercises.length === 0 ? (
          <div className="workout__empty text--body text--rte">
            <p>No exercises added yet. Add an exercise to get started.</p>
          </div>
        ) : (
          <div className="workout__exercises">
            {SERIES_OPTIONS.map((series) => {
              const exercisesInSeries = workout.exercises.filter(
                (ex) => ex.series === series
              );

              if (exercisesInSeries.length === 0) return null;

              return (
                <div
                  key={series}
                  className="workout__series"
                  data-series={series.toLowerCase()}
                >
                  <div className="workout__series-header">
                    <h2 className="workout__series-title text text--h3">
                      <span className="workout__series-title-letter">
                        {series}
                      </span>
                      <span className="workout__series-title-letter-separator">
                        /
                      </span>
                      <span className="workout__series-title-letter-separator">
                        Series
                      </span>
                    </h2>
                  </div>
                  <div className="workout__series-exercises">
                    {exercisesInSeries.map((exercise) => (
                      <WorkoutExercise
                        key={exercise.id}
                        exerciseProps={exercise}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="workout__footer">
        <WorkoutAddExercise />
      </div>
    </div>
  );
}
