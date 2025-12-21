import type { Metadata } from "next";
import Calculator from "./components/Calculator";

export const metadata: Metadata = {
  title: "Barbell Plate Calculator",
  description:
    "Calculate barbell plate loading instantly. Enter your target weight and get a per-side plate breakdown. Configure your bar weight and available plates for accurate results.",
  openGraph: {
    title: "Shred City - Barbell Plate Calculator",
    description:
      "Calculate barbell plate loading instantly. Enter your target weight and get a per-side plate breakdown.",
  },
};

export default function Home() {
  return (
    <main className="main">
      <section className="section">
        <div className="container">
          <Calculator />
        </div>
      </section>
    </main>
  );
}
