import type { EquipmentType } from "@/app/types/workout";

/**
 * Weight unit of measurement
 */
export type WeightUnit = "lbs" | "kg";

// Conversion constants
export const LBS_TO_KG = 0.453592;
export const KG_TO_LBS = 2.20462;

// Standard bar weights
export const BARBELL_WEIGHT_LBS = 45;
export const BARBELL_WEIGHT_KG = 20;

/**
 * Convert weight between units
 */
export function convertWeight(
  weight: number,
  fromUnit: WeightUnit,
  toUnit: WeightUnit
): number {
  if (fromUnit === toUnit) return weight;

  if (fromUnit === "lbs" && toUnit === "kg") {
    return weight * LBS_TO_KG;
  }

  if (fromUnit === "kg" && toUnit === "lbs") {
    return weight * KG_TO_LBS;
  }

  return weight;
}

/**
 * Round weight to appropriate precision for unit
 * - Lbs: round to 0.5 (common plate increments: 2.5, 5, 10, 25, 45)
 * - Kg: round to 0.25 (common plate increments: 1.25, 2.5, 5, 10, 20)
 */
export function roundWeight(weight: number, unit: WeightUnit): number {
  if (unit === "lbs") {
    return Math.round(weight * 2) / 2; // Round to nearest 0.5
  } else {
    return Math.round(weight * 4) / 4; // Round to nearest 0.25
  }
}

/**
 * Get bar weight for equipment type and unit
 * @param customBarWeight - Optional custom bar weight override
 */
export function getBarWeight(
  equipmentType: EquipmentType,
  unit: WeightUnit,
  customBarWeight?: number
): number {
  // If custom bar weight is provided, use it
  if (customBarWeight !== undefined) {
    return customBarWeight;
  }

  // Otherwise use standard bar weights
  switch (equipmentType) {
    case "barbell":
    case "trap-bar":
      return unit === "lbs" ? BARBELL_WEIGHT_LBS : BARBELL_WEIGHT_KG;

    case "landmine":
      return unit === "lbs" ? BARBELL_WEIGHT_LBS : BARBELL_WEIGHT_KG;

    default:
      return 0;
  }
}

/**
 * Calculate total weight with proper unit handling
 * @param customBarWeight - Optional custom bar weight override
 */
export function calculateTotalWeight(
  weightPerSide: number,
  equipmentType: EquipmentType,
  unit: WeightUnit,
  customBarWeight?: number
): number {
  const barWeight = getBarWeight(equipmentType, unit, customBarWeight);

  switch (equipmentType) {
    case "barbell":
    case "trap-bar":
      return weightPerSide * 2 + barWeight;

    case "dumbbell":
      return weightPerSide * 2;

    case "kettlebell":
      return weightPerSide;

    case "landmine":
      return weightPerSide + barWeight;

    case "machine":
    case "cable":
    case "bodyweight":
    case "other":
    default:
      return weightPerSide;
  }
}

/**
 * Check if equipment type uses a bar weight
 */
export function usesBarWeight(equipmentType: EquipmentType): boolean {
  return (
    equipmentType === "barbell" ||
    equipmentType === "trap-bar" ||
    equipmentType === "landmine"
  );
}

/**
 * Format weight for display with unit
 */
export function formatWeight(weight: number, unit: WeightUnit): string {
  const rounded = roundWeight(weight, unit);
  const formatted = rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(2);
  return `${formatted} ${unit}`;
}

/**
 * Display weight in user's preferred unit (with conversion if needed)
 */
export function displayWeight(
  weight: number,
  storedUnit: WeightUnit,
  displayUnit: WeightUnit
): string {
  const converted = convertWeight(weight, storedUnit, displayUnit);
  return formatWeight(converted, displayUnit);
}
