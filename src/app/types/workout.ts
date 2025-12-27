/**
 * Series marker for grouping exercises within a workout
 * Used for visual organization (e.g., A series, B series, etc.)
 */
export type Series = "A" | "B" | "C" | "D" | "E";

/**
 * Equipment types supported in workouts
 */
export type EquipmentType =
  | "barbell"
  | "dumbbell"
  | "kettlebell"
  | "trap-bar"
  | "landmine"
  | "machine"
  | "cable"
  | "bodyweight"
  | "other";

/**
 * Weight per-side in pounds or kilograms
 * This is the numeric weight loaded on one side of the bar (for barbell/trap-bar)
 * or the weight of a single dumbbell/kettlebell
 *
 * Note: Display formats like "45+25" (showing plate breakdown) are presentation-only.
 * The stored value is numeric for calculations and comparisons.
 */
export type WeightPerSide = number;

/**
 * Individual set performed during an exercise
 *
 * Note: totalWeight is automatically calculated from weightPerSide and equipmentType
 * when a set is created/updated. It's stored in the data structure for:
 * - Total tonnage calculations (sets × reps × totalWeight)
 * - Historical comparisons (e.g., "last time you did 140lb")
 * - Progress tracking and analytics
 *
 * Calculation logic:
 * - Barbell/trap-bar: (weight per side × 2) + bar weight
 * - Dumbbell: weight per side × 2 (pair)
 * - Kettlebell: weight per side (single)
 * - Landmine: weight per side + bar weight
 * - Machine/cable: as specified by weightPerSide
 *
 * This field is read-only from the user's perspective (calculated automatically).
 */
export type Set = {
  /** Unique identifier for the set */
  id: string;
  /** Weight per-side in pounds/kilograms (numeric value) */
  weightPerSide: WeightPerSide;
  /** Total weight in pounds/kilograms (automatically calculated, stored for calculations) */
  totalWeight: number;
  /** Equipment type used for this set */
  equipmentType: EquipmentType;
  /** Number of reps performed */
  reps: number;
  /** Set number within the exercise (1, 2, 3, etc.) */
  setNumber: number;
  /** Timestamp when the set was performed */
  timestamp: Date;
};

/**
 * Exercise within a workout
 * This represents a specific exercise being performed in a workout session
 */
export type Exercise = {
  /** Unique identifier for this exercise */
  id: string;
  /** Exercise name */
  name: string;
  /** Category (e.g., "Compound", "Isolation", "Accessory") */
  category: string;
  /** Primary muscle groups targeted */
  muscleGroups: string[];
  /** Default equipment type for this exercise */
  defaultEquipment: EquipmentType;
  /** Equipment type used for this instance (may differ from default) */
  equipmentType: EquipmentType;
  /** Series marker for grouping (A, B, C, D, or E) */
  series: Series;
  /** Sets performed for this exercise */
  sets: Set[];
  /** Instructions or notes */
  instructions?: string;
  /** Notes specific to this exercise instance */
  notes?: string;
};

/**
 * Workout session
 */
export type WorkoutSession = {
  /** Unique identifier */
  id: string;
  /** Date when the workout started */
  date: Date;
  /** Template name if created from a template */
  templateName?: string;
  /** Exercises performed in this workout */
  exercises: Exercise[];
  /** Duration in minutes */
  duration?: number;
  /** Workout notes */
  notes?: string;
  /** Timestamp when workout started */
  startTime: Date;
  /** Timestamp when workout ended */
  endTime?: Date;
};
