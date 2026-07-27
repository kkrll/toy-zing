"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const VALUE_CHAIN = [
  {
    label: "More members coached",
    color: "bg-blue-200",
  },
  {
    label: "More consistent training habits",
    color: "bg-green-200",
  },
  {
    label: "Higher retention",
    color: "bg-marsala-200",
  },
  {
    label: "Higher lifetime value",
    color: "bg-orchid-200",
  },
  {
    label: "More revenue from your existing member base",
    color: "bg-orange-200",
  },
] as const;

/** Heights as % of the chart area */
const TODAY_HEIGHT = 40;
const SEGMENT_HEIGHT = 12;

export const BusinessValue = () => {
  const [autoActive, setAutoActive] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeCount =
    hoveredIndex !== null ? hoveredIndex + 1 : autoActive;

  useEffect(() => {
    if (hoveredIndex !== null) return;

    const id = window.setInterval(() => {
      setAutoActive((n) => (n >= VALUE_CHAIN.length ? 0 : n + 1));
    }, 2000);

    return () => window.clearInterval(id);
  }, [hoveredIndex]);

  return (
      <div className="grid grid-cols-2 gap-16 items-start">
        <div className="flex flex-col gap-6">
          <h3 className="type-heading-h3">How Zing creates business value</h3>

          <ol className="flex flex-col gap-2">
            {VALUE_CHAIN.map((step, index) => {
              const isActive = index < activeCount;

              return (
                <li key={step.label}>
                  <button
                    type="button"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl border px-2 py-2 text-left transition-colors duration-300",
                      isActive
                        ? "border-theme-fg-100 text-theme-text-primary"
                        : "border-theme-bg-300 text-theme-text-disabled",
                    )}
                  >
                    <span
                      className={cn(
                        "size-5 shrink-0 rounded-md transition-colors duration-300",
                        isActive ? step.color : "bg-theme-bg-300",
                      )}
                      aria-hidden
                    />
                    <span className="type-body-lg">{step.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <figure className="flex flex-col gap-4 pt-2">
          <div
            className="relative mb-10 flex h-72 items-stretch justify-center gap-16 border-b border-theme-bg-300"
            aria-label="Member LTV comparison: Today vs With Zing"
          >
            {/* Today */}
            <div className="relative w-44">
              <div
                className="absolute inset-x-0 bottom-0 rounded-t-lg bg-theme-bg-300"
                style={{ height: `${TODAY_HEIGHT}%` }}
                aria-label="Today: membership base"
              />
              <span className="type-body-md text-theme-text-secondary absolute -bottom-8 inset-x-0 text-center whitespace-nowrap">
                Today
              </span>
            </div>

            {/* With Zing */}
            <div className="relative w-44">
              <div
                className="absolute inset-x-0 bottom-0 flex flex-col-reverse overflow-hidden rounded-t-lg transition-[height] duration-500 ease-out"
                style={{
                  height: `${TODAY_HEIGHT + activeCount * SEGMENT_HEIGHT}%`,
                }}
                aria-label="With Zing: membership base plus value uplift"
              >
                <div
                  className="w-full bg-theme-bg-300"
                  style={{ flex: TODAY_HEIGHT }}
                />
                {VALUE_CHAIN.map((step, index) =>
                  index < activeCount ? (
                    <div
                      key={step.label}
                      className={cn("w-full", step.color)}
                      style={{ flex: SEGMENT_HEIGHT }}
                    />
                  ) : null,
                )}
              </div>
              <span className="type-body-md-semi absolute -bottom-8 inset-x-0 text-center whitespace-nowrap">
                With Zing
              </span>
            </div>
          </div>
        </figure>
      </div>
  );
};
