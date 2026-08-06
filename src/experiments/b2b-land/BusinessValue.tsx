"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
  {
    label: "More revenue from your existing member base",
    tint: CADET,
    swatch: "bg-theme-text-cadet",
  },
] as const;

/** Heights as % of the chart area */
const TODAY_HEIGHT = 40;
const SEGMENT_HEIGHT = 12;

export const BusinessValue = () => {
  const [autoActive, setAutoActive] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeCount = hoveredIndex !== null ? hoveredIndex + 1 : autoActive;

  useEffect(() => {
    if (hoveredIndex !== null) return;

    const id = window.setInterval(() => {
      setAutoActive((n) => (n >= VALUE_CHAIN.length ? 0 : n + 1));
    }, 2000);

    return () => window.clearInterval(id);
  }, [hoveredIndex]);

  return (
    <div className="flex flex-col gap-8 rounded-3xl bg-theme-bg-200 md:gap-16">
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <h3 className="type-heading-h2 md: pt-24">
            How Zing creates <br />
            business value
          </h3>

          <figure className="flex flex-col gap-4 overflow-x-auto pt-2">
            <div
              className="relative flex h-56 min-w-72 items-stretch justify-center gap-8 sm:h-72 sm:gap-16"
              aria-label="Member LTV comparison: Today vs With Zing"
            >
              {/* Today */}
              <div className="relative w-28 sm:w-44">
                <div
                  className="absolute inset-x-0 bottom-0 overflow-hidden rounded-t-lg"
                  style={{
                    height: `${TODAY_HEIGHT}%`,
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
              <div className="relative w-28 sm:w-44">
                <div
                  className="absolute inset-x-0 bottom-0 flex flex-col-reverse overflow-hidden rounded-t-lg transition-[height] duration-500 ease-out"
                  style={{
                    height: `${TODAY_HEIGHT + activeCount * SEGMENT_HEIGHT}%`,
                  }}
                  aria-label="With Zing: membership base plus value uplift"
                >
                  <div
                    className="w-full"
                    style={{
                      flex: TODAY_HEIGHT,
                      background:
                        "linear-gradient(to bottom, var(--ds-theme-bg-300) 0%, var(--ds-theme-bg-300) calc(100% - 32px), var(--ds-theme-bg-400) 100%)",
                    }}
                  />
                  {VALUE_CHAIN.map((step, index) =>
                    index < activeCount ? (
                      <div
                        key={step.label}
                        className={cn("w-full", step.swatch)}
                        style={{ flex: SEGMENT_HEIGHT }}
                      />
                    ) : null,
                  )}
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
        <ol className="grid grid-cols-1 md:grid-cols-5 rounded-b-2xl overflow-hidden">
          {VALUE_CHAIN.map((step, index) => {
            const isActive = index < activeCount;

            return (
              <li key={step.label} className="h-full">
                <button
                  type="button"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "flex md:flex-col w-full h-full justify-center items-center gap-3 px-4 md:px-0 py-4 md:pt-0 text-left transition-colors duration-300",
                    isActive
                      ? "text-theme-text-primary"
                      : "text-theme-text-disabled",
                  )}
                  style={{
                    background: isActive
                      ? `var(--ds-theme-bg-100)`
                      : "color-mix(in oklab, var(--ds-theme-bg-300) 30%, transparent)",
                  }}
                >
                  <span
                    className={cn(
                      "size-8 md:w-full md:h-1 shrink-0 rounded-md md:rounded-none transition-colors duration-300",
                      isActive ? step.swatch : "bg-theme-bg-300",
                    )}
                    aria-hidden
                  />
                  <div className="flex items-center type-body-md md:px-2 h-full text-balance text-center">
                    {step.label}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
