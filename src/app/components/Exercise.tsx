import type { Exercise } from "@/app/types/workout";

type ExerciseProps = {
  exerciseProps: Exercise;
};

export default function Exercise({ exerciseProps }: ExerciseProps) {
  return (
    <div className="exercise">
      <div className="exercise__header">
        <div className="exercise__name">{exerciseProps.name}</div>
      </div>
    </div>
  );
}
