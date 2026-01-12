"use client";

import { ReactNode } from "react";

type RadioOption<T extends string = string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

type RadioGroupProps<T extends string = string> = {
  /** The name attribute for the radio group (for form submission) */
  name: string;
  /** Array of radio options */
  options: RadioOption<T>[] | T[];
  /** Currently selected value */
  value: T;
  /** Callback when selection changes */
  onChange: (value: T) => void;
  /** Optional label for the radio group */
  label?: string;
  /** Additional CSS class for the wrapper */
  className?: string;
  /** Display style: 'text' | 'pills' | 'cards' | 'list' */
  variant?: "text" | "pills" | "cards" | "list";
  /** Size: 'sm' | 'md' | 'lg' */
  size?: "sm" | "md" | "lg";
  /** ARIA label for accessibility */
  "aria-label"?: string;
};

/**
 * RadioGroup Component
 * A custom, accessible radio button group with multiple display variants
 *
 * @example
 * // Minimal text-only variant (like iOS style)
 * <RadioGroup
 *   name="view"
 *   options={["Day", "Week", "Month", "Year"]}
 *   value={view}
 *   onChange={setView}
 *   variant="text"
 * />
 *
 * @example
 * // Simple usage with string array (pills variant)
 * <RadioGroup
 *   name="series"
 *   options={["A", "B", "C", "D", "E"]}
 *   value={selectedSeries}
 *   onChange={setSelectedSeries}
 * />
 *
 * @example
 * // With custom labels
 * <RadioGroup
 *   name="difficulty"
 *   options={[
 *     { value: "easy", label: "Easy 😊" },
 *     { value: "medium", label: "Medium 💪" },
 *     { value: "hard", label: "Hard 🔥" },
 *   ]}
 *   value={difficulty}
 *   onChange={setDifficulty}
 *   variant="cards"
 * />
 */
export default function RadioGroup<T extends string = string>({
  name,
  options,
  value,
  onChange,
  label,
  className = "",
  variant = "pills",
  size = "md",
  "aria-label": ariaLabel,
}: RadioGroupProps<T>) {
  // Normalize options to RadioOption format
  const normalizedOptions: RadioOption<T>[] = options.map((option) =>
    typeof option === "string" ? { value: option as T, label: option } : option
  );

  const blockName = "radio-group";
  const wrapperClasses = [
    blockName,
    `${blockName}--${variant}`,
    `${blockName}--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (newValue: T) => {
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <div className={wrapperClasses}>
      {label && (
        <div className={`${blockName}__label`} id={`${name}-label`}>
          {label}
        </div>
      )}
      <div
        className={`${blockName}__options`}
        role="radiogroup"
        aria-labelledby={label ? `${name}-label` : undefined}
        aria-label={!label ? ariaLabel || name : undefined}
      >
        {normalizedOptions.map((option) => {
          const isChecked = option.value === value;
          const isDisabled = option.disabled || false;
          const optionId = `${name}-${option.value}`;

          return (
            <label
              key={option.value}
              className={`${blockName}__option ${
                isChecked ? `${blockName}__option--checked` : ""
              } ${isDisabled ? `${blockName}__option--disabled` : ""}`.trim()}
              htmlFor={optionId}
            >
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => handleChange(option.value)}
                className={`${blockName}__input`}
              />
              <span className={`${blockName}__option-label`}>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
