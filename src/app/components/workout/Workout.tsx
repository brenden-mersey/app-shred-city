"use client";

import { WorkoutSession } from "@/app/types/workout";
import Exercise from "@/app/components/Exercise";

type WorkoutProps = {
  workout: WorkoutSession;
};

export default function Workout({ workout }: WorkoutProps) {
  return (
    <div className="workout">
      <div className="workout__header">
        <div className="workout__meta">
          {workout.startTime && (
            <div className="workout__date">
              {new Date(workout.startTime).toLocaleDateString()}
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
          workout.exercises.map((exercise) => (
            <Exercise key={exercise.id} exerciseProps={exercise} />
          ))
        )}
      </div>
    </div>
  );
}

// "use client";

// import { WorkoutSession } from "@/app/types/workout";

// type WorkoutProps = {
//   workout: WorkoutSession;
// };

// export default function Workout({ workout }: WorkoutProps) {
//   return (
//     <div className="workout">
//       <div className="workout__header">
//         <h2 className="text text--h2">Workout</h2>
//         <div className="workout__meta">
//           {workout.startTime && (
//             <div className="workout__date">
//               {new Date(workout.startTime).toLocaleDateString()}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="workout__exercises">
//         {workout.exercises.length === 0 ? (
//           <div className="workout__empty">
//             <p>No exercises added yet. Add an exercise to get started.</p>
//           </div>
//         ) : (
//           workout.exercises.map((exerciseInstance) => (
//             <div key={exerciseInstance.id} className="workout__exercise">
//               <div className="workout__exercise-name">
//                 {exerciseInstance.exercise.name}
//               </div>
//               {/* Exercise sets will go here */}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
