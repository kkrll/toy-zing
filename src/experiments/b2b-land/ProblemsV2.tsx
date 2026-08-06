"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import { Problems } from "./Problems";
import styles from "./problems.module.css";
import { useReducedMotion } from "./scrollAnimation";

const CARD_BG_1 = "/img/Member%20page/problems-card-bg.png";
const CARD_BG_2 = "/img/Member%20page/problems-card-bg-2.png";

const COLS = 40;
const ROWS = 8;
/** ~5% — PT strip on the left. */
const PT_COLS = 2;
/** Right half becomes outline at the second beat. */
const TAIL_START_COL = Math.floor(COLS * 0.5);
/** Light diagonal stagger, so the wave front leans rather than falling straight. */
const ROW_LEAN = 0.15;

type CellRole = "pt" | "mid" | "tail";

const cellRole = (col: number): CellRole => {
  if (col < PT_COLS) return "pt";
  if (col >= TAIL_START_COL) return "tail";
  return "mid";
};

/*
 * Each sweep is normalised over the cells it actually touches, not over the whole grid.
 * The outline beat only covers the right half, so measuring it against the full width
 * left its wave finished halfway through the band and the beat visibly stalled for the
 * rest of it — the old code divided every distance by the grid width.
 */
const MAX_SWEEP = COLS - 1 + (ROWS - 1) * ROW_LEAN;
const MAX_PT = PT_COLS - 1 + (ROWS - 1) * ROW_LEAN;
const MAX_TAIL = COLS - 1 - TAIL_START_COL + (ROWS - 1) * ROW_LEAN;

/**
 * Static, and deliberately so: the grid is built once and never re-rendered. Each cell
 * carries only where it sits along the sweep — 0 at the edge a wave starts from, 1 at
 * the far one — and the stylesheet turns that into the cell's own progress through
 * each beat. `--l` sweeps left to right, `--r` right to left.
 */
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const lean = row * ROW_LEAN;
  const role = cellRole(col);

  return {
    role,
    l: (col + lean) / (role === "pt" ? MAX_PT : MAX_SWEEP),
    r: (COLS - 1 - col + lean) / MAX_TAIL,
  };
});

const MESSAGES = [
  {
    title: "Personal training doesn't scale.",
    body: "That leaves most members without guidance, motivation or accountability.",
  },
  {
    title: "50% of new members leave within 6 months",
    body: "Without guidance, motivation fades before habits become routines",
  },
] as const;

/**
 * The four cell states, in the reading order the design lays them out — which on the
 * two-column mobile grid reproduces its 2×2 exactly, coached states down the left and
 * uncoached down the right.
 *
 * `reveal` names the beat that introduces the state. Two of them aren't in the picture
 * yet when the section opens, so showing their key up front gives away the ending; they
 * fade in as their beat starts. The other two are on screen from the first frame.
 */
const LEGEND: {
  label: string;
  swatch: string;
  reveal?: "orchid" | "churned";
}[] = [
  { label: "PT", swatch: "size-5 bg-theme-fg-400" },
  { label: "No coaching", swatch: "size-3.5 bg-theme-bg-300" },
  { label: "PT + Zing AI", swatch: "size-5 bg-orchid-500", reveal: "orchid" },
  {
    label: "Churned",
    swatch: "size-2.5 border border-theme-bg-400 opacity-60",
    reveal: "churned",
  },
];

export const ProblemsV2 = () => {
  const reduced = useReducedMotion();

  if (reduced) return <Problems />;

  /*
   * Deliberately no snap markers, and no `useProximitySnap`. Snapping belongs to the
   * step model in Value and AidenV2, where scroll picks a rest and a transition plays
   * it out; against a scrubbed animation a snap point stops meaning "land on a
   * composed state" and starts meaning "skip the rest of the beat". The pauses that
   * used to justify the markers are now holds in the timeline itself, which read the
   * same way without ever taking the scroll away from you.
   */
  return (
    <section className="flex flex-col max-w-screen-xl mx-auto px-4 md:px-14">
      <div className={styles.runway}>
        <div className="sticky top-0 flex min-h-svh flex-col justify-center gap-8 py-12 md:gap-14">
          <h2 className="type-heading-h1 text-balance">
            95% of your members <br className="hidden sm:block" />
            never receive coaching
          </h2>

          <div className="flex flex-col gap-6 md:gap-8">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {MESSAGES.map((message, index) => (
                <article
                  key={message.title}
                  className={cn(
                    styles.card,
                    index === 0 ? styles.cardOne : styles.cardTwo,
                    "relative flex flex-col gap-1 overflow-hidden rounded-3xl border border-transparent p-6",
                  )}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('${index === 0 ? CARD_BG_1 : CARD_BG_2}')`,
                    }}
                  />
                  {/* Carries the resting border too, so it fades out with the veil
                      instead of needing a second thing to animate. */}
                  <div
                    aria-hidden
                    className={cn(
                      styles.cardVeil,
                      index === 0 ? styles.cardVeilOne : styles.cardVeilTwo,
                      "absolute inset-0 rounded-3xl border border-theme-bg-300 bg-theme-bg-100",
                    )}
                  />
                  <div className="relative flex flex-col gap-1">
                    <p className="type-heading-h3 text-balance">
                      {message.title}
                    </p>
                    <p className="type-body-md text-theme-text-secondary">
                      {message.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex flex-col gap-4 mb-16">
              <div
                className="grid gap-1.5"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                }}
                role="img"
                aria-label="Member coaching coverage: a small share reached by PT alone, most members reached by PT plus Zing AI"
              >
                {CELLS.map(({ role, l, r }, i) => (
                  <div
                    key={i}
                    className={cn(
                      "relative aspect-square rounded-md",
                      role === "pt" && styles.cellPt,
                      role === "mid" && styles.cellMid,
                      role === "tail" && styles.cellTail,
                      // The tail's grey fades to an outline, so it needs its own
                      // layer to fade; the others keep grey underneath throughout.
                      role !== "tail" && "bg-theme-bg-300",
                    )}
                    style={{ "--l": l, "--r": r } as CSSProperties}
                  >
                    {role === "pt" && (
                      <div
                        className={cn(
                          styles.layerPt,
                          "absolute inset-0 rounded-md bg-theme-fg-400",
                        )}
                      />
                    )}
                    {role === "tail" && (
                      <>
                        <div
                          className={cn(
                            styles.layerSolid,
                            "absolute inset-0 rounded-md bg-theme-bg-300",
                          )}
                        />
                        <div
                          className={cn(
                            styles.layerOutline,
                            "absolute inset-0 rounded-md border border-theme-bg-400",
                          )}
                        />
                      </>
                    )}
                    {role !== "pt" && (
                      <div
                        className={cn(
                          styles.layerOrchid,
                          "absolute inset-0 rounded-md bg-orchid-500",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {LEGEND.map(({ label, swatch, reveal }) => (
                  <li
                    key={label}
                    className={cn(
                      "flex items-center justify-center gap-2",
                      reveal === "orchid" && styles.legendOrchid,
                      reveal === "churned" && styles.legendChurned,
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        // Chip sizes carry the design's hierarchy: the two coached
                        // states are the heaviest, churned the faintest and smallest.
                        "shrink-0 rounded-md",
                        swatch,
                        // The orchid state carries the Zing mark, so its key shows the
                        // same mark rather than a bare colour chip.
                        reveal === "orchid" && styles.legendMark,
                      )}
                    />
                    <span className="type-body-md-semi">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                styles.footer,
                "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4",
              )}
            >
              <div
                className={cn(
                  styles.footerBeat,
                  styles.footerLead,
                  "flex flex-col gap-4 px-2 md:px-6",
                )}
              >
                <div>
                  <h3 className="type-heading-h2 text-balance">
                    The future isn’t more coaches.
                  </h3>
                  <h3 className="type-heading-h2 inline-block bg-linear-to-r from-theme-text-primary to-theme-text-orchid to-50% bg-clip-text pb-1 text-transparent mb-4">
                    It’s more coaching.
                  </h3>
                </div>
                <p className="type-body-lg-semi">
                  Zing Coach. Coaching becomes infrastructure
                </p>
              </div>
              <div className="flex flex-col gap-4 px-2 md:px-6 py-1">
                <p
                  className={cn(
                    styles.footerBeat,
                    styles.footerLine1,
                    "type-body-md text-theme-text-secondary",
                  )}
                >
                  Coaching shouldn’t be reserved for the 5% who buy personal
                  training. It should be a seamless part of every member’s
                  journey.
                </p>
                <p
                  className={cn(
                    styles.footerBeat,
                    styles.footerLine2,
                    "type-body-md text-theme-text-secondary",
                  )}
                >
                  Traditional one-to-one coaching was never designed to reach
                  every member. The next generation of gyms won’t scale coaching
                  by hiring more coaches—they’ll scale it by extending every
                  coach’s impact with AI, bringing expert guidance to every
                  member.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
