import { Series } from "@/app/types/workout";

/**
 * Available series options for grouping exercises in workouts
 */
export const SERIES_OPTIONS: Series[] = ["A", "B", "C", "D", "E"];

/**
 * Five most common bar weights (lbs) for radio selection.
 * Order: standard Olympic, women's, then lighter/heavier.
 * Default for the app is 45 (see BARBELL_WEIGHT_LBS in utils/workouts/weights).
 */
export const BAR_WEIGHT_OPTIONS_LBS: readonly number[] = [15, 25, 35, 45, 55];

/**
 * Five most common bar weights (kg) for radio selection.
 * Order: standard Olympic, women's, then lighter/heavier.
 * Default for the app is 20 (see BARBELL_WEIGHT_KG in utils/workouts/weights).
 */
export const BAR_WEIGHT_OPTIONS_KG: readonly number[] = [10, 15, 17.5, 20, 25];
