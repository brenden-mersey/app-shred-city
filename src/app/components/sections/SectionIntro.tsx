"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { getUserFirstName } from "@/app/utils/user";
import Link from "next/link";

export default function SectionIntro() {
  const sectionName = "intro";
  const sectionClasses = `section section--${sectionName} ${sectionName}`;
  const { user, loading } = useAuth();

  const userName = getUserFirstName(user);
  const greeting = loading
    ? "Shred City"
    : userName
    ? `Shred City, ${userName}`
    : "Shred City";

  return (
    <section className={sectionClasses}>
      <div className={`${sectionName}__container container container--grid`}>
        <h2 className={`${sectionName}__title text text--h2`}>
          Welcome to {greeting}.
        </h2>
        <div className={`${sectionName}__content text text--rte`}>
          <p>
            Shred City is a platform for strength trainers to track their
            progress and improve their lifts.
          </p>
          <p>
            We offer a variety of tools to help you track your progress and
            improve your lifts. Including one of the fastest and most intuitive
            plate calculators on the internet.
          </p>
        </div>
        <Link
          href="/workouts/new"
          className="intro__button button button--start-workout button--pill button--highlight-green"
        >
          <span className="button__text">Start a Workout</span>
        </Link>
      </div>
    </section>
  );
}
