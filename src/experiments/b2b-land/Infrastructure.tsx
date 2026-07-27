"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const GRID_SIZE = 15;
const ACTIVE_SIZE = 13;
const PT_WEDGE_ROWS = 4;
const CELL_STEP_MS = 28;
const ZING_EXTRA_DELAY_MS = 2000;

type CellTone = "pt" | "zing" | "empty";

const cellTone = (row: number, col: number): CellTone => {
  if (row >= ACTIVE_SIZE || col >= ACTIVE_SIZE) return "empty";
  // Blue PT wedge in the top-left: 4, 3, 2, 1 across the first rows
  if (row < PT_WEDGE_ROWS && col < PT_WEDGE_ROWS - row) return "pt";
  return "zing";
};

const TONE_CLASS: Record<Exclude<CellTone, "empty">, string> = {
  pt: "bg-blue-500",
  zing: "bg-orchid-500",
};

const CELLS: CellTone[] = Array.from(
  { length: GRID_SIZE * GRID_SIZE },
  (_, i) => {
    const row = Math.floor(i / GRID_SIZE);
    const col = i % GRID_SIZE;
    return cellTone(row, col);
  },
);

const PT_COUNT = CELLS.filter((t) => t === "pt").length;

/** Fill order delay: PT first, then 2s pause, then PT+AI. */
const CELL_DELAYS = (() => {
  let ptIndex = 0;
  let zingIndex = 0;
  return CELLS.map((tone) => {
    if (tone === "empty") return 0;
    if (tone === "pt") return ptIndex++ * CELL_STEP_MS;
    return (
      PT_COUNT * CELL_STEP_MS +
      ZING_EXTRA_DELAY_MS +
      zingIndex++ * CELL_STEP_MS
    );
  });
})();

export const Infrastructure = () => {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setStarted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <section className="bg-theme-bg-100 rounded-3xl px-6 py-8 md:px-14 md:py-16 flex flex-col md:flex-row gap-12">
      <div className="flex flex-col gap-4 flex-1">
        <div>
          <h2 className="type-heading-h2">The future isn’t more coaches.</h2>
          <h2 className="type-heading-h2 text-theme-text-blue">
            It’s more coaching.
          </h2>
        </div>
        <p className="type-body-lg text-theme-text-secondary max-w-xl">
          Coaching shouldn’t be reserved for the 5% who buy personal training.
          It should be a seamless part of every member’s journey.
        </p>

        <p className="type-body-lg text-theme-text-secondary max-w-xl">
          Traditional one-to-one coaching was never designed to reach every
          member. The next generation of gyms won’t scale coaching by hiring
          more coaches—they’ll scale it by extending every coach’s impact with
          AI, bringing expert guidance to every member.
        </p>

        <p className="type-body-lg-semi">
          ZING COACH. Coaching becomes infrastructure
        </p>
      </div>
      <div className="flex flex-col gap-4 h-full w-[320px]">
        <div
          className="grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
          role="img"
          aria-label="Member coaching coverage: a small share reached by PT alone, most members reached by PT plus Zing AI"
        >
          {CELLS.map((tone, i) => {
            const filled = started && tone !== "empty";

            return (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-md bg-theme-bg-300 transition-[background-color,transform,opacity] duration-200 ease-out",
                  filled && TONE_CLASS[tone],
                  filled
                    ? "scale-100 opacity-100"
                    : tone !== "empty" && "scale-75 opacity-60",
                )}
                style={{ transitionDelay: `${CELL_DELAYS[i]}ms` }}
              />
            );
          })}
        </div>

        <ul className="flex flex-wrap gap-6 justify-between">
          <li className="flex items-center gap-2">
            <span className="size-3.5 rounded-sm bg-blue-500" aria-hidden />
            <span className="type-body-md-semi">PT</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="size-3.5 rounded-sm bg-orchid-500" aria-hidden />
            <span className="type-body-md-semi">PT + Zing AI</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="size-3.5 rounded-sm bg-theme-bg-300" aria-hidden />
            <span className="type-body-md-semi">No coaching</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
