"use client";

import { cn } from "@/lib/utils";
import { useRef, type CSSProperties } from "react";
import { Problems } from "./Problems";
import styles from "./problems.module.css";
import { useReducedMotion } from "./scrollAnimation";

const CARD_BG_1 = "/img/Member%20page/problems-card-bg.png";
const CARD_BG_2 = "/img/Member%20page/problems-card-bg-2.png";

type CellRole = "pt" | "mid" | "tail";

const WILL = "/img/Member%20page/will-orr.jpeg";

type GridSpec = {
  cols: number;
  rows: number;
  /** ~5% of the width — the PT strip on the left. */
  ptCols: number;
  /** Diagonal stagger per row, so the wave front leans rather than falling straight. */
  rowLean: number;
};

/**
 * Static, and deliberately so: a grid is built once and never re-rendered. Each cell
 * carries only where it sits along the sweep — 0 at the edge a wave starts from, 1 at
 * the far one — and the stylesheet turns that into the cell's own progress through
 * each beat. `--l` sweeps left to right, `--r` right to left.
 */
const buildCells = ({ cols, rows, ptCols, rowLean }: GridSpec) => {
  /** Right half becomes outline at the second beat. */
  const tailStartCol = Math.floor(cols * 0.5);

  /*
   * Each sweep is normalised over the cells it actually touches, not over the whole
   * grid. The outline beat only covers the right half, so measuring it against the full
   * width left its wave finished halfway through the band and the beat visibly stalled
   * for the rest of it — the old code divided every distance by the grid width.
   */
  const maxSweep = cols - 1 + (rows - 1) * rowLean;
  const maxTail = cols - 1 - tailStartCol + (rows - 1) * rowLean;
  // A one-column PT strip has no horizontal extent, so its sweep is the lean alone —
  // the fill travels down the column instead of across it.
  const maxPt = ptCols - 1 + (rows - 1) * rowLean || 1;

  return Array.from({ length: cols * rows }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const lean = row * rowLean;
    const role: CellRole =
      col < ptCols ? "pt" : col >= tailStartCol ? "tail" : "mid";

    return {
      role,
      l: (col + lean) / (role === "pt" ? maxPt : maxSweep),
      r: (cols - 1 - col + lean) / maxTail,
    };
  });
};

/** Wide and shallow — 320 cells, two PT columns. */
const DESKTOP_CELLS = buildCells({
  cols: 40,
  rows: 8,
  ptCols: 2,
  rowLean: 0.15,
});

/*
 * Half the width, same depth: 160 cells, and one PT column of 20 is the same 5% two of
 * 40 were. The lean is halved because it's counted in cells and the grid is half as
 * wide — 0.08 across 8 rows tilts the wave front by the same fraction of the sweep the
 * desktop's 0.15 does, so the stagger reads the same rather than doubling.
 */
const MOBILE_CELLS = buildCells({
  cols: 20,
  rows: 8,
  ptCols: 1,
  rowLean: 0.08,
});

/**
 * `rest` is where the card's own beat is done and the card is still lit: after the
 * sweep completes (18%, 54%) and before the handover at the tail of the hold (21%,
 * 57%). Centred in that window, so a click lands on a composed grid *and* on the card
 * that explains it — see the handover note in the stylesheet.
 */
const MESSAGES = [
  {
    title: "Personal training doesn't scale.",
    body: "That leaves most members without guidance, motivation or accountability.",
    rest: 0,
  },
  {
    title: "50% of new members leave within 6 months",
    body: "Without guidance, motivation fades before habits become routines",
    rest: 0.555,
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
  { label: "PT + Zing AI", swatch: "size-5 bg-orchid-500", reveal: "orchid" },
  { label: "No coaching", swatch: "size-5 bg-theme-bg-300" },
  {
    label: "Churned",
    swatch: "size-3.5 border border-theme-bg-400 opacity-60",
    reveal: "churned",
  },
];

/**
 * One layout of the coverage grid. Both layouts are in the DOM and CSS picks which is
 * shown: the cell maths depends on the column count, so a breakpoint that changed the
 * shape in JS would have to re-run it on resize — and the hidden copy costs nothing to
 * keep, since `display: none` takes it out of layout, paint and the a11y tree alike.
 */
const CoverageGrid = ({
  cells,
  cols,
  radius,
  className,
}: {
  cells: ReturnType<typeof buildCells>;
  cols: number;
  radius: string;
  className: string;
}) => (
  <div
    className={className}
    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    role="img"
    aria-label="Member coaching coverage: a small share reached by PT alone, most members reached by PT plus Zing AI"
  >
    {cells.map(({ role, l, r }, i) => (
      <div
        key={i}
        className={cn(
          "relative aspect-square",
          radius,
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
              "absolute inset-0 bg-theme-fg-400",
              radius,
            )}
          />
        )}
        {role === "tail" && (
          <>
            <div
              className={cn(
                styles.layerSolid,
                "absolute inset-0 bg-theme-bg-300",
                radius,
              )}
            />
            <div
              className={cn(
                styles.layerOutline,
                "absolute inset-0 border border-theme-bg-400",
                radius,
              )}
            />
          </>
        )}
        {role !== "pt" && (
          <div
            className={cn(
              styles.layerOrchid,
              "absolute inset-0 bg-orchid-500",
              radius,
            )}
          />
        )}
      </div>
    ))}
  </div>
);

export const ProblemsV2 = () => {
  const reduced = useReducedMotion();
  const runwayRef = useRef<HTMLDivElement>(null);

  if (reduced) return <Problems />;

  /*
   * Scrolls to a progress value on the runway's own timeline. `contain` runs from the
   * moment the runway's top meets the top of the viewport to the moment its bottom
   * meets the bottom — exactly the span the sticky child is pinned for — so progress
   * maps onto scroll position linearly, and the same numbers the keyframes use address
   * the page. Measured per click rather than cached: the runway is svh-sized, so a
   * mobile URL bar collapsing moves it.
   */
  const scrollToRest = (progress: number) => {
    const runway = runwayRef.current;
    if (!runway) return;

    const { top, height } = runway.getBoundingClientRect();
    const travel = height - window.innerHeight;
    if (travel <= 0) return;

    window.scrollTo({
      top: window.scrollY + top + progress * travel,
      behavior: "smooth",
    });
  };

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
      <div ref={runwayRef} className={styles.runway}>
        <div
          className={cn(
            styles.stage,
            // `justify-center` only centres while the stage is shorter than the
            // viewport; past that the box grows and the content sits at its top padding
            // edge, so the top padding is what keeps the heading clear of the fixed nav.
            "sticky top-0 flex min-h-svh flex-col justify-center gap-8 pt-24 pb-12 md:gap-14",
          )}
        >
          <h2 className="type-heading-h1 text-balance">
            95% of your members never receive coaching
          </h2>

          <div className="flex flex-col gap-6 md:gap-8">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {MESSAGES.map((message, index) => (
                <button
                  key={message.title}
                  type="button"
                  onClick={() => scrollToRest(message.rest)}
                  className={cn(
                    styles.card,
                    index === 0 ? styles.cardOne : styles.cardTwo,
                    "relative flex cursor-pointer flex-col gap-1 overflow-hidden rounded-3xl border border-transparent p-6 text-left",
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
                      "absolute inset-0 rounded-[22px] border border-theme-bg-300 bg-theme-bg-100",
                    )}
                  />
                  <div className="relative flex flex-col gap-1">
                    <p className="type-body-lg-semi text-balance md:type-heading-h3">
                      {message.title}
                    </p>
                    <p className="type-body-md text-theme-text-secondary">
                      {message.body}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 mb-16">
              <CoverageGrid
                cells={MOBILE_CELLS}
                cols={20}
                radius="rounded-sm"
                className="grid gap-1 md:hidden"
              />
              <CoverageGrid
                cells={DESKTOP_CELLS}
                cols={40}
                radius="rounded-md"
                className="hidden gap-1.5 md:grid"
              />

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {LEGEND.map(({ label, swatch, reveal }) => (
                  <li
                    key={label}
                    className={cn(
                      "flex items-center gap-2",
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
                "grid grid-cols-1 gap-6 md:grid-cols-[2fr_3fr] md:gap-4",
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
                  <h3 className="type-heading-h1 text-balance">
                    The future isn’t more coaches.
                  </h3>
                  <h3 className="type-heading-h1 inline-block bg-linear-to-r from-theme-text-primary to-theme-text-orchid to-50% bg-clip-text pb-1 text-transparent mb-4">
                    It’s more coaching.
                  </h3>
                </div>
                <p className="type-body-lg-semi">
                  Zing Coach. Coaching becomes infrastructure
                </p>
              </div>
              <div className="flex flex-col gap-4 px-2 md:px-6 py-1">
                <div
                  className={cn(
                    styles.footerBeat,
                    styles.footerQuote,
                    "p-2 rounded-3xl bg-theme-bg-200 flex gap-4",
                  )}
                >
                  <img
                    src={WILL}
                    className="h-24 rounded-2xl border-4 border-theme-bg-100/25"
                    alt="Will Orr"
                  />
                  <figure className="flex flex-col justify-center gap-3 md:col-span-2 ">
                    <blockquote className="type-body-lg-semi text-balance max-w-[320px]">
                      “The highest rate of churn occurs before habits have
                      formed…”
                    </blockquote>
                    <figcaption className="type-body-md text-theme-text-secondary">
                      Will Orr, CEO The Gym Group
                    </figcaption>
                  </figure>
                </div>
                <p
                  className={cn(
                    styles.footerBeat,
                    styles.footerLine1,
                    "type-body-md text-theme-text-secondary px-3 text-pretty",
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
                    "type-body-md text-theme-text-secondary px-3 text-pretty",
                  )}
                >
                  Traditional one-to-one coaching was never designed to reach
                  every member. The next generation of gyms won’t scale coaching
                  by hiring more coaches—they’ll scale it by extending every
                  coach’s impact with AI, bringing expert guidance to every
                  member.
                </p>
              </div>

              {/* Full width under both columns — it's the section's last word, not part
                  of either argument. Same voice as the quote in the V1 section. */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
