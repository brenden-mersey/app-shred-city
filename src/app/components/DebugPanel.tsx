"use client";

import { useCalculator } from "../contexts/CalculatorContext";

type DebugPanelProps = {
  data: Record<string, unknown>;
};

export default function DebugPanel({ data }: DebugPanelProps) {
  const { isDoubled, barWeight, loadedPlates } = useCalculator();
  return <pre>{JSON.stringify({ ...data, isDoubled, barWeight, loadedPlates }, null, 2)}</pre>;
}
