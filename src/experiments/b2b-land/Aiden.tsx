"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { MockAppUI, type MockScreen } from "./mock-app-ui/MockAppUI";

const CAPABILITIES = [
  {
    title: "Member Intelligence",
    description:
      "See training activity, recovery, body composition, adherence and behavioral trends in one place.",
  },
  {
    title: "Churn Prediction",
    description:
      "Identify members losing momentum before they stop showing up.",
  },
  {
    title: "Program Building",
    description: "Generate and refine personalized programs in seconds.",
  },
  {
    title: "Coach Communication",
    description:
      "Draft personalized follow-ups, motivation and coaching recommendations.",
  },
  {
    title: "Progress Reviews",
    description: "Turn member data into actionable coaching insights.",
  },
] as const;

// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

/** 1-based odd → home (left phone), even → preworkout (right phone) */
const screenForIndex = (index: number): MockScreen =>
  index % 2 === 0 ? "home" : "preworkout";

export const Aiden = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const screen = screenForIndex(activeIndex);

  return (
    <section className="flex flex-col gap-6 rounded-3xl bg-theme-bg-chat px-4 py-8 md:gap-8 md:px-14 md:py-16">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="type-heading-h1 text-balance">
              Back your trAIners up
            </h2>
            <p className="type-body-lg text-theme-text-secondary">
              Coming soon: Aiden — the AI Copilot for Personal Trainers
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="type-heading-h3">Every trainer. Supercharged.</h3>
            <p className="type-body-lg text-theme-text-secondary">
              Multiply every coach’s impact.
            </p>
            <p className="type-body-lg text-theme-text-secondary">
              Enable one trainer to coach 3–5× more members by automating
              planning, analysis and routine communication — while keeping every
              human interaction personal.
            </p>
          </div>
          <ul className="flex flex-col gap-2">
            {CAPABILITIES.map((capability, index) => {
              const isActive = index === activeIndex;

              return (
                <li key={capability.title}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex w-full flex-col gap-1 rounded-2xl border px-4 py-3 text-left transition-colors",
                      isActive
                        ? "bg-theme-bg-200 border-theme-bg-200"
                        : "cursor-pointer border-theme-fg-500/10 hover:bg-theme-bg-200/60",
                    )}
                  >
                    <span className="type-body-lg-semi">
                      {capability.title}
                    </span>
                    <span className="type-body-md text-theme-text-secondary">
                      {capability.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex justify-center lg:sticky lg:top-8 lg:justify-end">
          <MockAppUI screen={screen} />
        </div>
      </div>

      <a
        href={DEMO_CALENDAR_URL}
        className="type-body-lg-semi min-w-80 self-start rounded-2xl bg-theme-fg-100 px-4 py-3 text-theme-bg-100"
      >
        Get Demo →
      </a>
    </section>
  );
};
