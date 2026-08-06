"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const GRID_SIZE = 15;
const PT_WEDGE_ROWS = 4;
/** Soft leading edge of the fill wave, as a fraction of the diagonal. */
const WAVE = 0.1;

type CellTone = "pt" | "zing";

const cellTone = (row: number, col: number): CellTone => {
  // PT wedge in the top-left: 4, 3, 2, 1 across the first rows
  if (row < PT_WEDGE_ROWS && col < PT_WEDGE_ROWS - row) return "pt";
  return "zing";
};

const TONE_CLASS: Record<CellTone, string> = {
  pt: "bg-theme-fg-400",
  zing: "bg-orchid-500",
};

const CELLS = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
  const row = Math.floor(i / GRID_SIZE);
  const col = i % GRID_SIZE;
  return {
    tone: cellTone(row, col),
    // Manhattan distance from top-left → diagonal front toward bottom-right
    dist: row + col,
  };
});

const MAX_DIST = (GRID_SIZE - 1) * 2;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const Infrastructure = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;

    const update = () => {
      ticking = false;

      if (reduced.matches) {
        setProgress(1);
        return;
      }

      const rect = section.getBoundingClientRect();
      // Fill while the section travels through the middle of the viewport.
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.2;
      const next =
        Math.round(clamp01((start - rect.top) / (start - end)) * 80) / 80;
      setProgress((prev) => (prev === next ? prev : next));
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    reduced.addEventListener("change", update);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      reduced.removeEventListener("change", update);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center gap-8 rounded-4xl bg-linear-to-br from-theme-bg-100 to-space-cadet-100 p-4 sm:p-8 md:flex-row md:gap-12 md:px-14 md:py-16 md:pl-14"
    >
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h2 className="type-heading-h1 text-balance">
            The future isn’t more coaches.
          </h2>
          <h2 className="type-heading-h1 inline-block bg-linear-to-r from-theme-text-primary to-theme-text-orchid to-50% bg-clip-text pb-1 text-transparent">
            It’s more coaching.
          </h2>
        </div>
        <p className="type-body-lg max-w-xl text-theme-text-secondary">
          Coaching shouldn’t be reserved for the 5% who buy personal training.
          It should be a seamless part of every member’s journey.
        </p>

        <p className="type-body-lg max-w-xl text-theme-text-secondary">
          Traditional one-to-one coaching was never designed to reach every
          member. The next generation of gyms won’t scale coaching by hiring
          more coaches—they’ll scale it by extending every coach’s impact with
          AI, bringing expert guidance to every member.
        </p>

        <p className="type-body-lg-semi">
          ZING COACH. Coaching becomes infrastructure
        </p>
      </div>
      <div className="flex h-full w-full max-w-md flex-col gap-4  md:w-[480px] md:max-w-none">
        <div
          className="grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
          role="img"
          aria-label="Member coaching coverage: a small share reached by PT alone, most members reached by PT plus Zing AI"
        >
          {CELLS.map(({ tone, dist }, i) => {
            const threshold = dist / MAX_DIST;
            const local = clamp01((progress - threshold + WAVE) / WAVE);
            const filled = local > 0;

            return (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-md bg-theme-fg-100/10",
                  filled && TONE_CLASS[tone],
                )}
                style={{
                  opacity: 0.6 + local * 0.4,
                  transform: `scale(${0.75 + local * 0.25})`,
                }}
              />
            );
          })}
        </div>

        <ul className="flex flex-wrap gap-6 justify-between">
          <li className="flex items-center gap-2">
            <span className="size-3.5 rounded-sm bg-theme-fg-300" aria-hidden />
            <span className="type-body-md-semi">PT</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="size-3.5 rounded-sm bg-orchid-500" aria-hidden />
            <span className="type-body-md-semi">PT + Zing AI</span>
          </li>
          <li className="flex items-center gap-2">
            <span
              className="size-3.5 rounded-sm bg-theme-fg-100/10"
              aria-hidden
            />
            <span className="type-body-md-semi">No coaching</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
