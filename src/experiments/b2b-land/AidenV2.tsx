"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import { Aiden } from "./Aiden";
import styles from "./aiden.module.css";
import {
  scrollToMarker,
  useProximitySnap,
  useReducedMotion,
  useScrollPhase,
} from "./scrollAnimation";

const CAPABILITIES = [
  {
    title: "Member Intelligence",
    description:
      "See training activity, recovery, body composition, adherence and behavioral trends in one place.",
    ui: "/img/Member%20page/desktop.png",
    result: "Insights ready",
    image: "/img/Member%20page/card-bg-1.png",
  },
  {
    title: "Churn Prediction",
    description:
      "Identify members losing momentum before they stop showing up.",
    ui: "/img/Member%20page/p-feature-1.png",
    result: "18 at risk",
    image: "/img/Member%20page/card-bg-2.png",
  },
  {
    title: "Program Building",
    description: "Generate and refine personalized programs in seconds.",
    ui: "/img/Member%20page/desktop.png",
    result: "42 plans built",
    image: "/img/Member%20page/card-bg-4.png",
  },
  {
    title: "Coach Communication",
    description:
      "Draft personalized follow-ups, motivation and coaching recommendations.",
    ui: "/img/Member%20page/p-feature-1.png",
    result: "Ready to send",
    image: "/img/Member%20page/card-bg-0.png",
  },
  {
    title: "Progress Reviews",
    description: "Turn member data into actionable coaching insights.",
    ui: "/img/Member%20page/desktop.png",
    result: "Review ready",
    image: "/img/Member%20page/card-bg-4.png",
  },
] as const;

// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

/*
 * Fire before the midpoint between snaps so the advance starts as soon as you've clearly
 * left the previous rest — waiting for true halfway made phase 1 feel late, then the UI
 * beat piled on immediately. Offsets still sit between `--start` / `--gap` markers.
 */
const STEPS = [0.13, 0.34, 0.55, 0.76] as const;

/** Feeds `--index` to the shared slot calc and snap offset. */
const indexVar = (index: number) => ({ "--index": index }) as CSSProperties;

export const AidenV2 = () => {
  const reduced = useReducedMotion();
  const { runwayRef, step } = useScrollPhase(STEPS);
  useProximitySnap(!reduced);

  if (reduced) return <Aiden />;

  return (
    // Runway is only a scroll spacer — the painted card stays fit-content inside.
    <div
      ref={runwayRef}
      className={styles.runway}
      style={{ "--step": step } as CSSProperties}
    >
      {CAPABILITIES.map((capability, index) => (
        <div
          key={capability.title}
          className={styles.snap}
          data-card={index}
          style={indexVar(index)}
        />
      ))}

      <section className="sticky top-20 flex flex-col gap-8 md:top-16 md:gap-24 md:py-16">
        <div className="sticky top-20 mx-auto flex max-w-screen-xl flex-col gap-8 px-4 md:top-24 md:gap-12 md:px-14 md:py-24">
          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="type-heading-h1 text-balance">
              Back your trAIners up
            </h2>
            <p className="type-body-md text-theme-text-secondary mb-2">
              Coming soon: Aiden — the AI Copilot for Personal Trainers
            </p>
            <p className="type-body-lg">
              Enable one trainer to coach 3–5× more members by automating
              planning, analysis and routine communication, while keeping every
              human interaction personal.
            </p>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-14">
            <div className="relative aspect-3/2 w-full">
              {CAPABILITIES.map((capability, index) => (
                <article
                  key={capability.title}
                  className={cn(
                    styles.advance,
                    styles.card,
                    "absolute inset-0 overflow-hidden rounded-4xl bg-theme-bg-300 ",
                  )}
                  style={{
                    ...indexVar(index),
                    zIndex: CAPABILITIES.length - index,
                  }}
                >
                  <img
                    src={capability.image}
                    alt=""
                    className="absolute inset-0 size-full scale-150 object-cover"
                  />
                  <img
                    src={capability.ui}
                    alt=""
                    className={cn(
                      styles.ui,
                      step === index && styles.uiIn,
                      "absolute left-1/2 -translate-x-1/2 bottom-0 w-[85%] object-cover",
                    )}
                  />
                </article>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              {/* Stacked in one cell so swapping copy can't shift the layout. */}

              <div className="grid">
                {CAPABILITIES.map((capability, index) => (
                  <div
                    key={capability.title}
                    className={cn(
                      styles.advance,
                      styles.caption,
                      "col-start-1 row-start-1 flex flex-col gap-3 pl-2",
                    )}
                    style={indexVar(index)}
                  >
                    <h4 className="type-heading-h3 text-balance">
                      {capability.title}
                    </h4>
                    <p className="type-body-lg text-theme-text-secondary text-balance">
                      {capability.description}
                    </p>
                  </div>
                ))}
                <a
                  href={DEMO_CALENDAR_URL}
                  className="type-body-lg-semi w-60 mt-6 self-start rounded-2xl bg-theme-fg-100 px-4 py-3 text-theme-bg-100"
                >
                  Get Demo →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
