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
      <section className="section section--intro intro">
        <div className="intro__container container container--grid">
          <h2 className="intro__title text text--h2">Welcome to Shred City</h2>
          <div className="intro__content text text--rte">
            <p>
              Shred City is a platform for strength trainers to track their
              progress and improve their lifts.
            </p>
            <p>
              We offer a variety of tools to help you track your progress and
              improve your lifts. Including one of the fastest and most
              intuitive plate calculators on the internet.
            </p>
          </div>
          <a
            href="/workouts/new"
            className="intro__button button button--start-workout button--pill button--highlight-green"
          >
            <span className="button__text">Start a Workout</span>
          </a>
        </div>
      </section>
    </main>
  );
}
