// Base props that all icons can use
export type IconProps = {
  className?: string;
  size?: number; // Optional - use CSS for sizing if not provided
  color?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
};

// Base SVG props - extend this in your icon components
export const iconBaseProps = {
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
};
