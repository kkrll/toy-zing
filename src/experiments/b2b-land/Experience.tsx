"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    title: "Proactive AI Coach",
    description:
      "Keeps members engaged with timely guidance, motivation and support — inside and outside the gym",
  },
  {
    title: "Adaptive Training Intelligence",
    description:
      "Continuously adapts training plans to each member’s goals, progress, recovery and changing circumstances",
  },
  {
    title: "Automated Progress Tracking",
    description:
      "Tracks strength, body composition and physical progress over time—without manual assessments or additional hardware",
  },
  {
    title: "Nutrition",
    description:
      "Delivers personalized nutrition guidance based on each member’s goals and progress",
  },
  {
    title: "Engagement",
    description:
      "Builds lasting exercise habits through streaks, challenges, strength scores and personalized milestones",
  },
] as const;

export const Experience = () => {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const canScrollPrev = activeIndex > 0;
  const canScrollNext = activeIndex < FEATURES.length - 1;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const syncIndex = () => {
      const scrollerLeft = el.getBoundingClientRect().left;
      const paddingLeft = Number.parseFloat(getComputedStyle(el).paddingLeft);
      const target = scrollerLeft + paddingLeft;

      let closest = 0;
      let closestDist = Infinity;

      for (let i = 0; i < el.children.length; i++) {
        const card = el.children[i] as HTMLElement;
        const dist = Math.abs(card.getBoundingClientRect().left - target);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      }

      setActiveIndex(closest);
    };

    syncIndex();
    el.addEventListener("scroll", syncIndex, { passive: true });
    el.addEventListener("scrollend", syncIndex);
    window.addEventListener("resize", syncIndex);

    return () => {
      el.removeEventListener("scroll", syncIndex);
      el.removeEventListener("scrollend", syncIndex);
      window.removeEventListener("resize", syncIndex);
    };
  }, []);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(FEATURES.length - 1, index));
    setActiveIndex(next);
    const card = scrollerRef.current?.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <section className="bg-theme-bg-200">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-6 overflow-hidden py-16 md:py-32">
        <div className="flex items-start justify-between gap-3 px-4 md:items-center md:gap-4 md:px-14">
          <h2 className="type-heading-h1 min-w-0 flex-1 text-balance">
            What your members experience
          </h2>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Previous feature"
              disabled={!canScrollPrev}
              onClick={() => goTo(activeIndex - 1)}
              className={cn(
                "flex size-10 items-center justify-center rounded-xl type-heading-h3 transition-colors",
                canScrollPrev
                  ? "cursor-pointer bg-theme-bg-200 text-theme-text-secondary hover:text-theme-text-primary"
                  : "cursor-default text-theme-text-disabled/30",
              )}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M14.8686 11.4745L10.3431 16L14.8686 20.5255M10.3431 16H21.6568"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next feature"
              disabled={!canScrollNext}
              onClick={() => goTo(activeIndex + 1)}
              className={cn(
                "flex size-10 items-center justify-center rounded-xl type-heading-h3 transition-colors",
                canScrollNext
                  ? "cursor-pointer bg-theme-bg-200 text-theme-text-secondary hover:text-theme-text-primary"
                  : "cursor-default text-theme-text-disabled/30",
              )}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M17.1314 11.4745L21.6569 16L17.1314 20.5255M21.6569 16H10.3432"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <ul
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-8 pt-2 scroll-px-4 md:gap-6 md:px-14 md:scroll-px-14"
          >
            {FEATURES.map((feature) => (
              <li
                key={feature.title}
                className="flex w-64 shrink-0 snap-start flex-col gap-1 sm:w-80"
              >
                <div className="mb-4 h-72 w-full overflow-hidden rounded-3xl bg-theme-bg-main-section sm:h-96" />
                <h3 className="type-body-lg-semi">{feature.title}</h3>
                <p className="type-body-lg text-theme-text-secondary">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-linear-to-r from-theme-bg-200 to-transparent md:w-14"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-linear-to-l from-theme-bg-200 to-transparent md:w-14"
          />
        </div>

        <button
          type="button"
          className="type-body-lg-semi ml-4 min-w-0 self-start rounded-2xl bg-theme-fg-100 px-4 py-3 text-theme-bg-100 sm:min-w-80 md:ml-14"
        >
          Try now →
        </button>
      </div>
    </section>
  );
};
