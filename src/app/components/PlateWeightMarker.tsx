type PlateWeightMarkerProps = {
  weight: number;
  side: "left" | "right";
};

export default function PlateWeightMarker({
  weight,
  side,
}: PlateWeightMarkerProps) {
  return (
    <div className={`plate__weight-marker ${side}`}>
      <span className="plate__weight-marker-weight">{weight}</span>
      <span className="plate__weight-marker-unit">LB</span>
    </div>
  );
}
