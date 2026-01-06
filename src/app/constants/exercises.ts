import { EquipmentType } from "@/app/types/workout";

/**
 * Exercise template/definition
 * This represents an exercise from the library that can be added to a workout
 */
export type ExerciseTemplate = {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  defaultEquipment: EquipmentType;
  instructions?: string;
  notes?: string;
};

/**
 * Exercise library - common strength training exercises
 * This is a basic starter set. Can be expanded later.
 */
export const EXERCISE_LIBRARY: ExerciseTemplate[] = [
  {
    id: "back-squat",
    name: "Back Squat",
    category: "Compound",
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
    defaultEquipment: "barbell",
    instructions:
      "Place barbell on upper back, descend until thighs are parallel to floor, drive up through heels",
  },
  {
    id: "goblet-squat-dumbbell",
    name: "Goblet Squat (Dumbbell)",
    category: "Compound",
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
    defaultEquipment: "dumbbell",
    instructions:
      "Place dumbbells at sides, descend until thighs are parallel to floor, drive up through heels",
  },
  {
    id: "goblet-squat-kettlebell",
    name: "Goblet Squat (Kettlebell)",
    category: "Compound",
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
    defaultEquipment: "kettlebell",
    instructions:
      "Place barbell on upper back, descend until thighs are parallel to floor, drive up through heels",
  },
  {
    id: "bench-press",
    name: "Bench Press (Barbell)",
    category: "Compound",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    defaultEquipment: "barbell",
    instructions:
      "Lower bar to chest, pause briefly, press up until arms are fully extended",
  },
  {
    id: "bench-press-incline",
    name: "Bench Press (Barbell, Incline)",
    category: "Compound",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    defaultEquipment: "barbell",
    instructions:
      "Lower bar to chest, pause briefly, press up until arms are fully extended",
  },
  {
    id: "bench-press-decline",
    name: "Bench Press (Barbell, Decline)",
    category: "Compound",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    defaultEquipment: "barbell",
    instructions:
      "Lower bar to chest, pause briefly, press up until arms are fully extended",
  },
  {
    id: "bench-press-dumbbell",
    name: "Bench Press (Dumbbell)",
    category: "Compound",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    defaultEquipment: "dumbbell",
    instructions:
      "Lower dumbbells to chest, pause briefly, press up until arms are fully extended",
  },
  {
    id: "bench-press-dumbbell-incline",
    name: "Bench Press (Dumbbell, Incline)",
    category: "Compound",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    defaultEquipment: "dumbbell",
    instructions:
      "Lower dumbbells to chest, pause briefly, press up until arms are fully extended",
  },
  {
    id: "bench-press-dumbbell-decline",
    name: "Bench Press (Dumbbell, Decline)",
    category: "Compound",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    defaultEquipment: "dumbbell",
    instructions:
      "Lower dumbbells to chest, pause briefly, press up until arms are fully extended",
  },
  {
    id: "barbell-row",
    name: "Barbell Row",
    category: "Compound",
    muscleGroups: ["Back", "Biceps"],
    defaultEquipment: "barbell",
  },
  {
    id: "bicep-curl",
    name: "Bicep Curl",
    category: "Isolation",
    muscleGroups: ["Biceps"],
    defaultEquipment: "dumbbell",
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    category: "Compound",
    muscleGroups: ["Hamstrings", "Glutes", "Back"],
    defaultEquipment: "barbell",
    instructions:
      "Stand with feet hip-width, grip bar just outside legs, lift by driving hips forward",
  },
  {
    id: "dips",
    name: "Dips",
    category: "Compound",
    muscleGroups: ["Triceps", "Chest"],
    defaultEquipment: "bodyweight",
  },
  {
    id: "dumbbell-press",
    name: "Dumbbell Bench Press",
    category: "Compound",
    muscleGroups: ["Chest", "Triceps"],
    defaultEquipment: "dumbbell",
  },
  {
    id: "incline-bench",
    name: "Incline Bench Press",
    category: "Compound",
    muscleGroups: ["Chest", "Shoulders", "Triceps"],
    defaultEquipment: "barbell",
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    category: "Compound",
    muscleGroups: ["Back", "Biceps"],
    defaultEquipment: "cable",
  },
  {
    id: "lateral-raise",
    name: "Lateral Raise",
    category: "Isolation",
    muscleGroups: ["Shoulders"],
    defaultEquipment: "dumbbell",
  },
  {
    id: "leg-curl",
    name: "Leg Curl",
    category: "Isolation",
    muscleGroups: ["Hamstrings"],
    defaultEquipment: "machine",
  },
  {
    id: "leg-extension",
    name: "Leg Extension",
    category: "Isolation",
    muscleGroups: ["Quadriceps"],
    defaultEquipment: "machine",
  },
  {
    id: "leg-press",
    name: "Leg Press",
    category: "Compound",
    muscleGroups: ["Quadriceps", "Glutes"],
    defaultEquipment: "machine",
  },
  {
    id: "overhead-press",
    name: "Overhead Press",
    category: "Compound",
    muscleGroups: ["Shoulders", "Triceps"],
    defaultEquipment: "barbell",
  },
  {
    id: "pull-ups-pronated-grip",
    name: "Pull-ups (Pronated Grip)",
    notes:
      "Grip slightly wider than shoulder-width for a stronger grip. Palms should be facing away from the body.",
    category: "Compound",
    muscleGroups: ["Back", "Biceps"],
    defaultEquipment: "bodyweight",
  },
  {
    id: "pull-ups-supinated-grip",
    name: "Pull-ups (Supinated Grip)",
    notes:
      "Supinated grip is the grip where the palms are facing towards from the body.",
    category: "Compound",
    muscleGroups: ["Back", "Biceps"],
    defaultEquipment: "bodyweight",
  },
  {
    id: "pull-ups-neutral-grip",
    name: "Pull-ups (Neutral Grip)",
    notes: "Neutral grip is the grip where the palms are facing each other.",
    category: "Compound",
    muscleGroups: ["Back", "Biceps"],
    defaultEquipment: "bodyweight",
  },
  {
    id: "rdl",
    name: "Romanian Deadlift",
    category: "Compound",
    muscleGroups: ["Hamstrings", "Glutes"],
    defaultEquipment: "barbell",
  },
  {
    id: "t-bar-row",
    name: "T-Bar Row",
    category: "Compound",
    muscleGroups: ["Back", "Biceps"],
    defaultEquipment: "landmine",
  },
  {
    id: "tricep-extension",
    name: "Tricep Extension",
    category: "Isolation",
    muscleGroups: ["Triceps"],
    defaultEquipment: "cable",
  },
  {
    id: "lunges",
    name: "Walking Lunges",
    category: "Compound",
    muscleGroups: ["Quadriceps", "Glutes"],
    defaultEquipment: "dumbbell",
  },
];

/**
 * Helper function to find an exercise by ID
 */
export function findExerciseById(id: string): ExerciseTemplate | undefined {
  return EXERCISE_LIBRARY.find((exercise) => exercise.id === id);
}

/**
 * Helper function to get exercises by category
 */
export function getExercisesByCategory(category: string): ExerciseTemplate[] {
  return EXERCISE_LIBRARY.filter((exercise) => exercise.category === category);
}
