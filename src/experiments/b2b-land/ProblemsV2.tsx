"use client";

import type { CSSProperties } from "react";
import { ProblemsFlowV2 } from "./ProblemsFlowV2";
import { range, smoothstep, useScrollStep, useTween } from "./scrollSteps";

/**
 * Scroll runway height. The section stays pinned for this long — 200vh leaves
 * one viewport of travel, since the first of it is spent pinning.
 */
const RUNWAY = "200vh";

/**
 * Every visual is a function of one timeline position, so a state is just the
 * point on that timeline the section rests at.
 */
const STATE_AT = [0, 0.36, 0.92];

/**
 * How far down the runway each state takes over, with the exit thresholds sitting
 * below the entry ones so a scroll that stops on a boundary can't flutter. State 1
 * is driven by visibility instead, so its thresholds are inert.
 */
const STATE_ENTER = [0, 0, 0.28];
const STATE_EXIT = [0, 0, 0.2];

/**
 * Phase 1 fires once the section's top passes this far up the viewport, well
 * before it pins — the empty frame should never be somewhere you can come to rest.
 */
const ENTRY_FRACTION = 0.55;

/** Time to travel the whole timeline; shorter hops take proportionally less. */
const TRAVEL_MS = 3200;

/** Beats of the timeline, expressed as fractions of it. */
const BEATS = {
  phase1: [0.02, 0.3],
  introIn: [0.12, 0.28],
  introOut: [0.4, 0.5],
  shift: [0.44, 0.7],
  phase2: [0.56, 0.84],
  churnIn: [0.72, 0.88],
} as const;

/** Share of the row taken by the chart box — keep in step with `md:w-[56%]`. */
const BOX_WIDTH = 56;

const lift = (opacity: number) => `translateY(${(1 - opacity) * 12}px)`;

export const ProblemsV2 = () => {
  const { runwayRef, step } = useScrollStep({
    enter: STATE_ENTER,
    exit: STATE_EXIT,
    entryFloor: 1,
    entryFraction: ENTRY_FRACTION,
  });
  const timeline = useTween(STATE_AT[step], TRAVEL_MS);

  const phase1 = range(timeline, BEATS.phase1);
  const phase2 = range(timeline, BEATS.phase2);

  // Drives the box sliding right-to-left and the flow panning across together.
  const shift = smoothstep(range(timeline, BEATS.shift));

  const introOpacity =
    smoothstep(range(timeline, BEATS.introIn)) *
    (1 - smoothstep(range(timeline, BEATS.introOut)));
  const churnOpacity = smoothstep(range(timeline, BEATS.churnIn));

  return (
    <section className="flex flex-col">
      <div ref={runwayRef} style={{ height: RUNWAY }}>
        <div className="sticky top-0 flex h-svh flex-col justify-center gap-12">
          <h2 className="type-heading-h1 text-balance px-4 text-center md:px-14">
            95% of your members <br className="hidden sm:block" />
            never receive coaching
          </h2>

          <div className="relative flex flex-col gap-8 px-4 md:block md:px-14">
            <div
              className="overflow-hidden rounded-3xl bg-theme-bg-200 p-6 md:ml-[var(--box-shift)] md:w-[56%] md:p-8"
              style={
                {
                  "--box-shift": `${(1 - shift) * (100 - BOX_WIDTH)}%`,
                } as CSSProperties
              }
            >
              <ProblemsFlowV2 phase1={phase1} phase2={phase2} pan={shift} />
            </div>

            {/* Stacked in one grid cell on mobile so the hidden copy costs no height. */}
            <div className="grid md:contents">
              <div
                className="pointer-events-none col-start-1 row-start-1 text-theme-text-orchid md:absolute md:inset-y-0 md:left-14 md:flex md:w-[40%] md:flex-col md:justify-center md:pr-10"
                style={{ opacity: introOpacity, transform: lift(introOpacity) }}
              >
                <p className="type-heading-h3 text-balance pb-2">
                  Personal training doesn&apos;t scale.
                </p>
                <p className="type-body-lg-semi opacity-50">
                  That leaves most members without guidance, motivation or
                  accountability.
                </p>
              </div>

              <div
                className="pointer-events-none col-start-1 row-start-1 text-theme-text-orchid md:absolute md:inset-y-0 md:right-14 md:flex md:w-[40%] md:flex-col md:justify-center md:pl-10"
                style={{ opacity: churnOpacity, transform: lift(churnOpacity) }}
              >
                <p className="type-heading-h3 text-balance pb-2">
                  50% of new members leave within 6 months
                </p>
                <p className="type-body-lg-semi opacity-50">
                  Without guidance, motivation fades before habits become
                  routines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
