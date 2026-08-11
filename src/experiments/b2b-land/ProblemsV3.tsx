"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Problems } from "./Problems";
import styles from "./problemsV3.module.css";
import { useReducedMotion } from "./scrollAnimation";

const CARD_BG_1 = "/img/Member%20page/problems-card-bg.png";
const CARD_BG_2 = "/img/Member%20page/problems-card-bg-2.png";
const WILL = "/img/Member%20page/will-orr.jpeg";

/**
 * One cell size for the whole section, in px, with the column counts derived from it.
 *
 * The design draws both grids at the same cell — act one's 14 columns and act two's 34
 * are just what that cell happens to fit into each container at the artboard's width. So
 * the cell is the constant here and the counts are measured, rather than the counts being
 * fixed and the cells coming out a different size in each grid.
 */
const CELL = { wide: { size: 19, gap: 6 }, narrow: { size: 12, gap: 4 } };

/** Act one is a portrait block: the top rows are PT, and the rule splits it in half. */
const ACT_ONE_ROWS = 18;
const ACT_ONE_PT_ROWS = 3;

const ACT_TWO_ROWS = 4;
/** The design's 3 of 34 — kept as a share so it survives any column count. */
const ACT_TWO_PT_SHARE = 3 / 34;

/** Tracks the breakpoint the cell size switches on, so both grids change together. */
const useCellMetrics = () => {
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return wide ? CELL.wide : CELL.narrow;
};

/**
 * How many whole cells fit the measured element. Observed rather than computed from the
 * viewport, because the two grids sit in containers of very different widths and only the
 * cell is shared between them.
 */
const useColumns = (
  ref: React.RefObject<HTMLElement | null>,
  size: number,
  gap: number,
  // Seeded with the design's own count so the section renders a full grid on the server
  // and on the first paint; the observer corrects it to the real width immediately after.
  fallback: number,
) => {
  const [cols, setCols] = useState(fallback);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setCols(Math.max(1, Math.floor((width + gap) / (size + gap))));
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, size, gap]);

  return cols;
};

type ActOneRole = "pt" | "grey" | "churn";

/**
 * Each cell carries only where it sits along its own sweep — `--l` across the PT band,
 * `--d` down the churn band — and the stylesheet turns that into the cell's progress
 * through the beat. Both bands are normalised over the cells they actually touch rather
 * than over the whole grid, so neither wave finishes early and stalls for the rest of its
 * beat.
 *
 * Rebuilt when the column count changes, which is a resize and nothing else — never a
 * scroll frame.
 */
const buildActOne = (cols: number) => {
  const churnRow = ACT_ONE_ROWS / 2;
  // The PT band leans as it crosses; the churn band leans as it climbs.
  const ptLean = 0.15;
  const churnLean = 0.06;
  const maxPt = cols - 1 + (ACT_ONE_PT_ROWS - 1) * ptLean;
  const maxChurn = ACT_ONE_ROWS - 1 - churnRow + (cols - 1) * churnLean;

  return Array.from({ length: cols * ACT_ONE_ROWS }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const role: ActOneRole =
      row < ACT_ONE_PT_ROWS ? "pt" : row >= churnRow ? "churn" : "grey";

    return {
      role,
      l: (col + row * ptLean) / maxPt,
      // Measured up from the last row and in from the last column, so the band empties
      // from the bottom-right corner towards the rule rather than draining away from it.
      d:
        (ACT_ONE_ROWS - 1 - row + (cols - 1 - col) * churnLean) / maxChurn,
    };
  });
};

/**
 * Act two's cells carry `--gx` as well: their position across the full width of the grid,
 * which is what samples the gradient the design masks the whole block out of.
 */
const buildActTwo = (cols: number) => {
  const ptCols = Math.max(1, Math.round(cols * ACT_TWO_PT_SHARE));
  const rowLean = 0.2;
  // The sweep spans every column, PT included: they end up on the gradient too, so
  // starting it after them would leave the left edge already tinted before the beat.
  const maxSweep = cols - 1 + (ACT_TWO_ROWS - 1) * rowLean;

  return Array.from({ length: cols * ACT_TWO_ROWS }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;

    return {
      pt: col < ptCols,
      l: (col + row * rowLean) / maxSweep,
      gx: cols > 1 ? col / (cols - 1) : 0,
    };
  });
};

/**
 * `rest` is where the card's own beat is done and the card is still lit: after the sweep
 * completes and before the handover at the tail of the hold. Centred in that window, so
 * a click lands on a composed grid *and* on the card that explains it.
 */
const MESSAGES = [
  {
    title: "Personal training doesn't scale.",
    body: "That leaves most members without guidance, motivation or accountability.",
    rest: 0.16,
  },
  {
    title: "50% of new members leave within 6 months",
    body: "Without guidance, motivation fades before habits become routines",
    rest: 0.45,
  },
] as const;

/** One cell of act one. Grey underneath throughout; each band fades its own layer over. */
const ActOneCell = ({
  role,
  l,
  d,
  radius,
}: {
  role: ActOneRole;
  l: number;
  d: number;
  radius: string;
}) => (
  <div
    className={cn(
      "relative aspect-square",
      radius,
      role === "pt" && styles.cellPt,
      role === "churn" && styles.cellChurn,
      // The churn band's grey fades out to leave an outline, so it needs its own layer to
      // fade; the others keep grey underneath the whole way.
      role !== "churn" && "bg-theme-bg-300",
    )}
    style={{ "--l": l, "--d": d } as CSSProperties}
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
    {role === "churn" && (
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
  </div>
);

const LegendItem = ({
  label,
  swatch,
  mark,
}: {
  label: string;
  swatch: string;
  mark?: boolean;
}) => (
  <li className="flex items-center gap-2">
    <span
      aria-hidden
      className={cn("shrink-0 rounded-sm", swatch, mark && styles.legendMark)}
    />
    <span className="type-body-md-semi">{label}</span>
  </li>
);

export const ProblemsV3 = () => {
  const reduced = useReducedMotion();
  const runwayRef = useRef<HTMLDivElement>(null);
  const actOneRef = useRef<HTMLDivElement>(null);
  const actTwoRef = useRef<HTMLDivElement>(null);

  const { size, gap } = useCellMetrics();
  const actOneCols = useColumns(actOneRef, size, gap, 14);
  const actTwoCols = useColumns(actTwoRef, size, gap, 34);

  if (reduced) return <Problems />;

  /*
   * Scrolls to a progress value on the runway's own timeline. `contain` runs from the
   * moment the runway's top meets the top of the viewport to the moment its bottom meets
   * the bottom — exactly the span the sticky child is pinned for — so progress maps onto
   * scroll position linearly, and the same numbers the keyframes use address the page.
   * Measured per click rather than cached: the runway is svh-sized, so a mobile URL bar
   * collapsing moves it.
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

  // Fixed px columns rather than fractions: a fraction would divide each container's own
  // width and hand the two grids cells that differ by a pixel or two.
  // `cols` is 0 until the observer has measured, and `repeat(0, …)` is invalid.
  const gridStyle = (cols: number): CSSProperties => ({
    gridTemplateColumns: `repeat(${Math.max(1, cols)}, ${size}px)`,
    gap: `${gap}px`,
  });

  const radius = size >= 16 ? "rounded-[4px]" : "rounded-[3px]";

  const actOneCells = buildActOne(actOneCols);
  const splitAt = (ACT_ONE_ROWS / 2) * actOneCols;

  return (
    <section className="mx-auto flex max-w-screen-xl flex-col px-4 md:px-14">
      <div ref={runwayRef} className={styles.runway}>
        {/* Exactly one viewport, and it clips — act two waits below the fold inside it
            rather than hanging off the bottom of a taller pinned box. */}
        <div className={cn(styles.stage, "sticky top-0 h-svh")}>
          <div
            className={cn(styles.track, "flex flex-col pt-24 pb-12")}
            style={
              {
                "--cell-size": `${size}px`,
                "--cell-gap": `${gap}px`,
              } as CSSProperties
            }
          >
            {/* ── Act one ───────────────────────────────────────────────────── */}
            <div className="grid min-h-[calc(100svh-9rem)] grid-cols-1 content-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
              <div className="flex flex-col max-w-lg gap-8 md:gap-10">
                <h2 className="type-heading-h1 text-balance">
                  95% of your members never receive coaching
                </h2>

                <div className="flex flex-col gap-2">
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

                  {/* The third beat is a quote rather than a claim, so it arrives as a
                      card in the same stack instead of being argued for by the grid. */}
                  <figure
                    className={cn(
                      styles.quoteCard,
                      "flex gap-4 rounded-3xl bg-theme-bg-200 p-2",
                    )}
                  >
                    <img
                      src={WILL}
                      className="h-28 rounded-2xl border-4 border-theme-bg-100/25"
                      alt="Will Orr"
                    />
                    <div className="flex flex-col justify-center gap-2 pr-2">
                      <blockquote className="type-body-lg-semi text-balance">
                        “The highest rate of churn occurs before habits have
                        formed…”
                      </blockquote>
                      <figcaption className="type-body-md text-theme-text-secondary">
                        Will Orr, CEO The Gym Group
                      </figcaption>
                    </div>
                  </figure>
                </div>
              </div>

              <div className="flex flex-col gap-4 md:w-[clamp(240px,30vw,460px)]">
                {/* The grid is one continuous block; the rule is an overlay rather than a
                    row of its own, so claiming the midpoint costs no gap in the picture.
                    With uniform rows the midpoint gap sits at exactly 50% of the height. */}
                {/* The wrapper is what gets measured — full container width. The halves
                    are inline grids so they hug their fixed-px tracks and the rule spans
                    exactly the cells rather than the slack beside them.

                    Two grids rather than one with an overlaid rule: the seam between them
                    has to open as the rule draws, and a row inside a single grid would
                    carry the row gap on both sides of it even when closed. */}
                <div
                  ref={actOneRef}
                  role="img"
                  aria-label="Member coaching coverage: a small band reached by personal training, and half of the remainder churning without it"
                >
                  <div className="inline-flex flex-col">
                    <div className="grid" style={gridStyle(actOneCols)}>
                      {actOneCells.slice(0, splitAt).map((cell, i) => (
                        <ActOneCell key={i} {...cell} radius={radius} />
                      ))}
                    </div>

                    {/* The seam: one row gap at rest, opening by a cell as the rule
                        draws across it. */}
                    <div aria-hidden className={styles.split}>
                      <div
                        className={cn(
                          styles.rule,
                          "absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-theme-bg-400",
                        )}
                      />
                    </div>

                    <div className="grid" style={gridStyle(actOneCols)}>
                      {actOneCells.slice(splitAt).map((cell, i) => (
                        <ActOneCell key={i} {...cell} radius={radius} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Both legends occupy the same cell of a one-cell grid, so the swap
                    crossfades in place instead of reflowing the column under it. */}
                <div className="grid">
                  <ul
                    className={cn(
                      styles.legendA,
                      "col-start-1 row-start-1 flex flex-wrap gap-x-6 gap-y-2",
                    )}
                  >
                    <LegendItem
                      label="5% get a PT"
                      swatch="size-4 bg-theme-fg-400"
                    />
                    <LegendItem
                      label="No coaching for 95%"
                      swatch="size-4 bg-theme-bg-300"
                    />
                  </ul>
                  <ul
                    className={cn(
                      styles.legendB,
                      "col-start-1 row-start-1 flex flex-wrap gap-x-6 gap-y-2",
                    )}
                  >
                    <LegendItem
                      label="50% churn rate"
                      swatch="size-3 border border-theme-bg-400 opacity-60"
                    />
                  </ul>
                </div>
              </div>
            </div>

            {/* ── Act two ───────────────────────────────────────────────────── */}
            <div
              className={cn(
                styles.actTwoGate,
                // Sized to its content — the track travels by act one's height, so act
                // two arrives at the top of the frame rather than needing to fill it.
                "flex flex-col gap-10 md:gap-14 pb-16",
              )}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
                <div className={cn(styles.actTwoBeat, styles.actTwoLead)}>
                  <div className="h-full flex flex-col justify-between">
                    <h3 className="type-heading-h1 text-balance">
                      The future isn’t more coaches.
                    </h3>
                    <h3 className="type-heading-h1 inline-block bg-linear-to-r from-theme-text-primary to-theme-text-orchid to-50% bg-clip-text pb-6 text-transparent">
                      It’s more coaching.
                    </h3>

                    <p
                      className={cn(
                        styles.actTwoBeat,
                        styles.actTwoLabel,
                        "type-body-lg-semi",
                      )}
                    >
                      Zing Coach. Coaching becomes infrastructure
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    styles.actTwoBeat,
                    styles.actTwoCopy,
                    "flex flex-col gap-4 md:pt-4",
                  )}
                >
                  <p className="type-body-md text-pretty text-theme-text-secondary">
                    Coaching shouldn’t be reserved for the 5% who buy personal
                    training. It should be a seamless part of every member’s
                    journey.
                  </p>
                  <p className="type-body-md text-pretty text-theme-text-secondary">
                    Traditional one-to-one coaching was never designed to reach
                    every member. The next generation of gyms won’t scale
                    coaching by hiring more coaches—they’ll scale it by
                    extending every coach’s impact with AI, bringing expert
                    guidance to every member.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div
                  ref={actTwoRef}
                  className={cn(styles.actTwoBeat, styles.actTwoGrid)}
                >
                  <div
                    className="grid"
                    style={gridStyle(actTwoCols)}
                    role="img"
                    aria-label="Every member reached: a few by PT alone, the rest by PT plus Zing AI"
                  >
                    {buildActTwo(actTwoCols).map(({ pt, l, gx }, i) => (
                      <div
                        key={i}
                        className={cn(
                          "relative aspect-square",
                          radius,
                          pt ? "bg-theme-fg-400" : "bg-theme-bg-300",
                          styles.cellOrchid,
                        )}
                        style={{ "--l": l, "--gx": gx } as CSSProperties}
                      >
                        {/* Every cell takes the gradient, PT columns included — the
                            design masks the whole block out of one ramp. */}
                        <div
                          className={cn(
                            styles.layerOrchid,
                            "absolute inset-0",
                            radius,
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <ul
                  className={cn(styles.actTwoBeat, styles.actTwoLegend, "flex")}
                >
                  <LegendItem
                    label="Zing + Coach allows you to reach every member"
                    swatch="size-5 bg-orchid-500"
                    mark
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
