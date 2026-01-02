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
};

/**
 * Exercise library - common strength training exercises
 * This is a basic starter set. Can be expanded later.
 */
export const EXERCISE_LIBRARY: ExerciseTemplate[] = [
  // Compound - Lower Body
  {
    id: "squat",
    name: "Barbell Back Squat",
    category: "Compound",
    muscleGroups: ["Quadriceps", "Glutes", "Hamstrings"],
    defaultEquipment: "barbell",
    instructions: "Place barbell on upper back, descend until thighs are parallel to floor, drive up through heels",
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    category: "Compound",
    muscleGroups: ["Hamstrings", "Glutes", "Back"],
    defaultEquipment: "barbell",
    instructions: "Stand with feet hip-width, grip bar just outside legs, lift by driving hips forward",
  },
  {
    id: "rdl",
    name: "Romanian Deadlift",
    category: "Compound",
    muscleGroups: ["Hamstrings", "Glutes"],
    defaultEquipment: "barbell",
  },
  {
    id: "leg-press",
    name: "Leg Press",
    category: "Compound",
    muscleGroups: ["Quadriceps", "Glutes"],
    defaultEquipment: "machine",
  },
  {
    id: "lunges",
    name: "Walking Lunges",
    category: "Compound",
    muscleGroups: ["Quadriceps", "Glutes"],
    defaultEquipment: "dumbbell",
  },

  // Compound - Upper Body Push
  {
    id: "bench-press",
    name: "Barbell Bench Press",
    category: "Compound",
    muscleGroups: ["Chest", "Triceps", "Shoulders"],
    defaultEquipment: "barbell",
    instructions: "Lower bar to chest, pause briefly, press up until arms are fully extended",
  },
  {
    id: "overhead-press",
    name: "Overhead Press",
    category: "Compound",
    muscleGroups: ["Shoulders", "Triceps"],
    defaultEquipment: "barbell",
  },
  {
    id: "incline-bench",
    name: "Incline Bench Press",
    category: "Compound",
    muscleGroups: ["Chest", "Shoulders", "Triceps"],
    defaultEquipment: "barbell",
  },
  {
    id: "dumbbell-press",
    name: "Dumbbell Bench Press",
    category: "Compound",
    muscleGroups: ["Chest", "Triceps"],
    defaultEquipment: "dumbbell",
  },
  {
    id: "dips",
    name: "Dips",
    category: "Compound",
    muscleGroups: ["Triceps", "Chest"],
    defaultEquipment: "bodyweight",
  },

  // Compound - Upper Body Pull
  {
    id: "barbell-row",
    name: "Barbell Row",
    category: "Compound",
    muscleGroups: ["Back", "Biceps"],
    defaultEquipment: "barbell",
  },
  {
    id: "pull-ups",
    name: "Pull-ups",
    category: "Compound",
    muscleGroups: ["Back", "Biceps"],
    defaultEquipment: "bodyweight",
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    category: "Compound",
    muscleGroups: ["Back", "Biceps"],
    defaultEquipment: "cable",
  },
  {
    id: "t-bar-row",
    name: "T-Bar Row",
    category: "Compound",
    muscleGroups: ["Back", "Biceps"],
    defaultEquipment: "landmine",
  },

  // Isolation
  {
    id: "bicep-curl",
    name: "Bicep Curl",
    category: "Isolation",
    muscleGroups: ["Biceps"],
    defaultEquipment: "dumbbell",
  },
  {
    id: "tricep-extension",
    name: "Tricep Extension",
    category: "Isolation",
    muscleGroups: ["Triceps"],
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

