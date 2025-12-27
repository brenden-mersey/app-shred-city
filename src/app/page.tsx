import type { Metadata } from "next";

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
          <h2 className="text text--h2">Welcome to Shred City</h2>
          <div className="text text--rte">
            <p>
              Shred City is a platform for strength trainers to track their
              progress and improve their lifts.
            </p>
            <p>
              We offer a variety of tools to help you track your progress and
              improve your lifts.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <a
            href="/workouts/new"
            className="button button--start-workout button--primary"
          >
            <span className="button__icon">+</span>
            <span className="button__text">Start a New Workout</span>
          </a>
        </div>
      </section>
    </main>
  );
}
