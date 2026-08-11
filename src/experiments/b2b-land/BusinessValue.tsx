"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useReducedMotion } from "./scrollAnimation";

/** Shared by both bars — the membership revenue that already exists today */
const BASE = {
  label: "Base membership value",
  swatch: "bg-theme-bg-300",
} as const;

/** Stacked on top of the base in the "With Zing" bar only */
const UPLIFTS = [
  {
    label: "Retention uplift",
    swatch: "bg-theme-text-cadet/50",
  },
  {
    label: "New coaching revenue",
    swatch: "bg-theme-text-cadet/80",
  },
] as const;

type Hovered = "base" | number | null;

/** Heights as % of the chart area */
const TODAY_HEIGHT = 40;
const SEGMENT_HEIGHT = 20;
const FULL_HEIGHT = TODAY_HEIGHT + UPLIFTS.length * SEGMENT_HEIGHT;

export const BusinessValue = () => {
  const reducedMotion = useReducedMotion();
  const [grown, setGrown] = useState(false);
  const [hovered, setHovered] = useState<Hovered>(null);

  useEffect(() => {
    if (reducedMotion) {
      setGrown(true);
      return;
    }

    const id = window.requestAnimationFrame(() => setGrown(true));
    return () => window.cancelAnimationFrame(id);
  }, [reducedMotion]);

  const dimOthers = hovered !== null;
  const baseDimmed = dimOthers && hovered !== "base";

  return (
    <div className="flex flex-col gap-8 rounded-3xl bg-theme-bg-200 md:gap-16 pb-12 md:pb-20">
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
          <h3 className="order-1 type-heading-h2 md:col-start-1 md:row-start-1 ">
            How Zing creates <br />
            business value
          </h3>

          <ol className="order-3 grid grid-cols-1 md:order-none md:col-start-1 md:row-start-2 md:max-w-xs">
            {[BASE, ...UPLIFTS].map((step, index) => {
              const key: Hovered = index === 0 ? "base" : index - 1;
              const isHovered = hovered === key;
              const isDimmed = dimOthers && !isHovered;

              return (
                <li key={step.label} className="h-full">
                  <button
                    type="button"
                    onMouseEnter={() => setHovered(key)}
                    onMouseLeave={() => setHovered(null)}
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
                    opacity: baseDimmed ? 0.5 : 1,
                    background:
                      "linear-gradient(to bottom, var(--ds-theme-bg-300) 0%, var(--ds-theme-bg-300) calc(100% - 32px), var(--ds-theme-bg-400) 100%)",
                  }}
                  aria-label="Today: base membership value"
                  onMouseEnter={() => setHovered("base")}
                  onMouseLeave={() => setHovered(null)}
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
                  aria-label="With Zing: base membership value plus retention uplift and new coaching revenue"
                >
                  {/* Base */}
                  <div
                    className="absolute inset-x-0 bottom-0 w-full transition-opacity duration-300"
                    style={{
                      height: `${(TODAY_HEIGHT / FULL_HEIGHT) * 100}%`,
                      opacity: baseDimmed ? 0.5 : 1,
                      background:
                        "linear-gradient(to bottom, var(--ds-theme-bg-300) 0%, var(--ds-theme-bg-300) calc(100% - 32px), var(--ds-theme-bg-400) 100%)",
                    }}
                    onMouseEnter={() => setHovered("base")}
                    onMouseLeave={() => setHovered(null)}
                  />

                  {UPLIFTS.map((step, index) => {
                    const bottomPct =
                      ((TODAY_HEIGHT + index * SEGMENT_HEIGHT) / FULL_HEIGHT) *
                      100;
                    const heightPct = (SEGMENT_HEIGHT / FULL_HEIGHT) * 100;
                    const isActive = hovered === index;
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
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
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
