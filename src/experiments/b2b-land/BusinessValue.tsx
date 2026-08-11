"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useReducedMotion } from "./scrollAnimation";

const CADET = "var(--ds-theme-text-cadet)";

const VALUE_CHAIN = [
  {
    label: "More members coached",
    tint: `color-mix(in oklab, ${CADET} 20%, transparent)`,
    swatch: "bg-theme-text-cadet/20",
  },
  {
    label: "More consistent training habits",
    tint: `color-mix(in oklab, ${CADET} 40%, transparent)`,
    swatch: "bg-theme-text-cadet/40",
  },
  {
    label: "Higher retention",
    tint: `color-mix(in oklab, ${CADET} 60%, transparent)`,
    swatch: "bg-theme-text-cadet/60",
  },
  {
    label: "Higher lifetime value",
    tint: `color-mix(in oklab, ${CADET} 80%, transparent)`,
    swatch: "bg-theme-text-cadet/80",
  },
] as const;

/** Heights as % of the chart area */
const TODAY_HEIGHT = 40;
const SEGMENT_HEIGHT = 12;
const FULL_HEIGHT = TODAY_HEIGHT + VALUE_CHAIN.length * SEGMENT_HEIGHT;

export const BusinessValue = () => {
  const reducedMotion = useReducedMotion();
  const [grown, setGrown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setGrown(true);
      return;
    }

    const id = window.requestAnimationFrame(() => setGrown(true));
    return () => window.cancelAnimationFrame(id);
  }, [reducedMotion]);

  const dimOthers = hoveredIndex !== null;

  return (
    <div className="flex flex-col gap-8 rounded-3xl bg-theme-bg-200 md:gap-16 pb-12 md:pb-20">
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <h3 className="order-1 type-heading-h2 md:col-start-1 md:row-start-1 ">
            How Zing creates <br />
            business value
          </h3>

          <ol className="order-3 grid grid-cols-1 md:order-none md:col-start-1 md:row-start-2 md:max-w-xs">
            {VALUE_CHAIN.map((step, index) => {
              const isHovered = hoveredIndex === index;
              const isDimmed = dimOthers && !isHovered;

              return (
                <li key={step.label} className="h-full">
                  <button
                    type="button"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={cn(
                      "flex w-full h-full items-center px-2 py-2 gap-2 text-left rounded-xl transition-[colors,opacity] duration-300",
                      isHovered ? "cursor-pointer" : "",
                      isDimmed ? "opacity-55" : "",
                    )}
                    style={{
                      background: isHovered ? "var(--ds-theme-bg-100)" : "",
                    }}
                  >
                    <span
                      className={cn(
                        "size-4 shrink-0 rounded-md transition-colors duration-300",
                        step.swatch,
                      )}
                      aria-hidden
                    />
                    <div className="flex items-center type-body-md h-full text-balance text-center">
                      {step.label}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>

          <figure className="order-2 flex flex-col justify-end gap-4 overflow-x-auto pt-2 border-b border-b-theme-bg-300 md:order-none md:col-start-2 md:row-start-1 md:row-span-2">
            <div
              className="relative flex h-56 min-w-72 items-stretch justify-center gap-4 md:gap-8 sm:h-72 sm:gap-16"
              aria-label="Member LTV comparison: Today vs With Zing"
            >
              {/* Today */}
              <div className="relative w-48 sm:w-64">
                <div
                  className="absolute inset-x-0 bottom-0 overflow-hidden rounded-t-lg transition-opacity duration-300"
                  style={{
                    height: `${TODAY_HEIGHT}%`,
                    opacity: dimOthers ? 0.5 : 1,
                    background:
                      "linear-gradient(to bottom, var(--ds-theme-bg-300) 0%, var(--ds-theme-bg-300) calc(100% - 32px), var(--ds-theme-bg-400) 100%)",
                  }}
                  aria-label="Today: membership base"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-repeat mix-blend-overlay"
                    style={{ backgroundImage: "url('/noise-light.png')" }}
                  />
                </div>
                <span className="type-body-md absolute inset-x-0 bottom-4 z-10 text-center text-theme-text-secondary whitespace-nowrap">
                  Revenue Today
                </span>
              </div>

              {/* With Zing */}
              <div className="relative w-48 sm:w-64">
                <div
                  className="absolute inset-x-0 bottom-0 overflow-hidden rounded-t-lg"
                  style={{ height: `${FULL_HEIGHT}%` }}
                  aria-label="With Zing: membership base plus value uplift"
                >
                  {/* Base */}
                  <div
                    className="absolute inset-x-0 bottom-0 w-full transition-opacity duration-300"
                    style={{
                      height: `${(TODAY_HEIGHT / FULL_HEIGHT) * 100}%`,
                      opacity: dimOthers ? 0.5 : 1,
                      background:
                        "linear-gradient(to bottom, var(--ds-theme-bg-300) 0%, var(--ds-theme-bg-300) calc(100% - 32px), var(--ds-theme-bg-400) 100%)",
                    }}
                  />

                  {VALUE_CHAIN.map((step, index) => {
                    const bottomPct =
                      ((TODAY_HEIGHT + index * SEGMENT_HEIGHT) / FULL_HEIGHT) *
                      100;
                    const heightPct = (SEGMENT_HEIGHT / FULL_HEIGHT) * 100;
                    const isActive = hoveredIndex === index;
                    const isDimmed = dimOthers && !isActive;

                    return (
                      <div
                        key={step.label}
                        className={cn(
                          "absolute inset-x-0 w-full origin-bottom transition-colors duration-300",
                          isActive ? "bg-theme-text-cadet" : step.swatch,
                        )}
                        style={{
                          bottom: `${bottomPct}%`,
                          height: grown ? `${heightPct}%` : 0,
                          opacity: isDimmed ? 0.5 : 1,
                          transition: `height 500ms ease-out ${
                            grown ? index * 120 : 0
                          }ms, opacity 300ms ease-out, background-color 300ms ease-out`,
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      />
                    );
                  })}

                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-repeat mix-blend-overlay"
                    style={{ backgroundImage: "url('/noise-light.png')" }}
                  />
                </div>
                <span className="type-body-md-semi absolute inset-x-0 bottom-4 z-10 text-center whitespace-nowrap">
                  Revenue With Zing
                </span>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </div>
  );
};
