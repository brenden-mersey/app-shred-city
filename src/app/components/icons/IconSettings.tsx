import type { IconProps } from "./IconBase";

export default function IconSettings({
  className,
  height,
  width,
  color,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = false,
}: IconProps) {
  return (
    <svg
      {...(height && { height })}
      {...(width && { width })}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...(ariaLabel && { "aria-label": ariaLabel })}
      aria-hidden={ariaHidden}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gear icon with smooth, rounded design */}
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" />
    </svg>
  );
}
