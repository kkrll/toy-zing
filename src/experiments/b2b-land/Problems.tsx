"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export const Problems = () => {
  const [active, setActive] = useState<"coached" | "uncoached">("uncoached");
  return (
    <section className="bg-theme-bg-100 rounded-3xl px-14 py-16 flex flex-col gap-6">
      <h2 className="type-heading-h2">
        95% of your members never receive coaching
      </h2>
      <div className="bg-theme-bg-200 p-1 rounded-3xl">
        <div className="relative h-full w-full overflow-hidden flex bg-theme-bg-200 rounded-[20px]">
          <div
            className="pointer-events-none absolute h-full inset-y-0 left-0 right-1/2 flex text-theme-bg-cadet-100 transition-transform duration-300 ease-in-out"
            style={{
              transform: active === "coached" ? "translateX(100%)" : "none",
            }}
          >
            <svg
              className="relative z-10 -mr-px h-full shrink-0 transition-[width] duration-300 ease-in-out"
              style={{ width: active === "coached" ? 20 : 0 }}
              viewBox="0 0 34 100"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M0.398857 5.73093C-0.875711 3.07558 1.05954 0 4.00495 0H34V50V100H4.00495C1.05954 100 -0.875713 96.9244 0.398854 94.2691L17.4938 58.6546C20.1198 53.1837 20.1198 46.8163 17.4938 41.3454L0.398857 5.73093Z"
                fill="currentColor"
              />
            </svg>
            <div className="h-full w-full bg-theme-bg-cadet-100" />
            <svg
              className="relative z-10 -ml-px h-full shrink-0 transition-[width] duration-300 ease-in-out"
              style={{ width: active === "uncoached" ? 20 : 0 }}
              viewBox="0 0 34 100"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M0 0H9.48306C11.0214 0 12.4235 0.882214 13.0892 2.26908L31.8458 41.3454C34.4718 46.8163 34.4718 53.1837 31.8458 58.6546L13.0892 97.7309C12.4235 99.1178 11.0214 100 9.48306 100H0V50V0Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <button
            type="button"
            onClick={() => setActive("uncoached")}
            className={cn(
              "relative z-10 flex-1 rounded-l-[20px] pl-4 pr-8 py-4 text-left",
              active === "uncoached" ? "" : "text-theme-text-secondary",
            )}
          >
            <p className="type-body-lg-semi">
              Personal training doesn't scale.
            </p>
            <p className="type-body-md opacity-50">
              That leaves most members without guidance, motivation or
              accountability.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setActive("coached")}
            className={cn(
              "relative z-10 flex-1 rounded-r-[20px] pl-8 pr-4 py-4 text-left",
              active === "coached" ? "" : "text-theme-text-secondary",
            )}
          >
            <p className="type-body-lg-semi">
              50% of new members leave within 6 months
            </p>
            <p className="type-body-md opacity-75">
              Without guidance, motivation fades before habits become routines
            </p>
          </button>
        </div>
      </div>

      {/* Visual: bar — 5% green, 95% red */}
      <div aria-label="5% coached, 95% without coaching">
        <div>
          <span>5%</span>
          <span>95%</span>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="type-body-lg text-theme-text-secondary italic">
          The problem isn't retention.
        </p>
        <p className="type-body-lg text-theme-text-secondary italic">
          It’s coaching at scale.
        </p>

        <blockquote className="flex flex-col gap-2">
          <p className="type-body-lg">
            The highest rate of churn occurs before habits have formed…
          </p>
          <footer className="type-body-md text-theme-text-secondary">
            — Will Orr, CEO The Gym Group
          </footer>
        </blockquote>
      </div>
    </section>
  );
};
