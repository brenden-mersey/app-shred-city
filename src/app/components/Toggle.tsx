export default function Toggle({
  isEnabled,
  setIsEnabled,
  label,
}: {
  isEnabled: boolean;
  setIsEnabled: (isEnabled: boolean) => void;
  label: string;
}) {
  return (
    <label className="toggle">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={isEnabled}
        onChange={(e) => setIsEnabled(e.target.checked)}
      />
      <span className="toggle__slider"></span>
    </label>
  );
}
