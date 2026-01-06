// Base props that all icons can use
export type IconProps = {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
};

// Base SVG props - extend this in your icon components
export const iconBaseProps = {
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
};
