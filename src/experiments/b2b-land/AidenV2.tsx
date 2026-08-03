"use client";

import { cn } from "@/lib/utils";
import { clamp01, useScrollStep, useTween } from "./scrollSteps";

const CAPABILITIES = [
  {
    title: "Member Intelligence",
    description:
      "See training activity, recovery, body composition, adherence and behavioral trends in one place.",
    task: "Reviewing 1,248 member profiles",
    result: "Insights ready",
    image: "/images/b2b-land/muscle.webp",
  },
  {
    title: "Churn Prediction",
    description:
      "Identify members losing momentum before they stop showing up.",
    task: "Scoring engagement across 12 weeks",
    result: "18 at risk",
    image: "/images/b2b-land/1.webp",
  },
  {
    title: "Program Building",
    description: "Generate and refine personalized programs in seconds.",
    task: "Adapting next block to recovery data",
    result: "42 plans built",
    image: "/images/b2b-land/exercises.webp",
  },
  {
    title: "Coach Communication",
    description:
      "Draft personalized follow-ups, motivation and coaching recommendations.",
    task: "Drafting a check-in for Marta K.",
    result: "Ready to send",
    image: "/images/b2b-land/2.webp",
  },
  {
    title: "Progress Reviews",
    description: "Turn member data into actionable coaching insights.",
    task: "Summarising 30 days of progress",
    result: "Review ready",
    image: "/images/b2b-land/bench.webp",
  },
] as const;

// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

/** Scroll runway height. Roughly a third of a viewport of travel per card. */
const RUNWAY = "300vh";

/**
 * How far down the runway each card takes over, with the exit thresholds sitting
 * below the entry ones so a scroll that stops on a boundary can't flutter.
 */
const CARD_ENTER = [0, 0.1, 0.28, 0.46, 0.64];
const CARD_EXIT = [0, 0.05, 0.22, 0.4, 0.58];

/** Time to advance one card; the tween runs on its own clock, not the scrollbar. */
const CARD_MS = 620;

/** Stack geometry — how far each card behind the front one drops and shrinks. */
const DEPTH_OFFSET = 44;
const DEPTH_SCALE = 0.08;
const VISIBLE_DEPTH = 2;

/** How far the leaving card travels up as it dissolves. */
const EXIT_LIFT = 56;

const SparkIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    <path d="M8 0.5 9.4 5.1 14 6.5 9.4 7.9 8 12.5 6.6 7.9 2 6.5 6.6 5.1z" />
    <path d="M13 10.5 13.7 12.3 15.5 13 13.7 13.7 13 15.5 12.3 13.7 10.5 13 12.3 12.3z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} aria-hidden>
    <circle cx="8" cy="8" r="8" fill="currentColor" />
    <path
      d="M4.5 8.3 6.9 10.6 11.5 5.6"
      fill="none"
      stroke="var(--color-white-100, #fff)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Position of a card relative to the front of the stack: 0 is front, positive is
 * queued behind, negative is on its way out.
 */
const stackStyle = (slot: number) => {
  const depth = Math.max(0, slot);
  const gone = Math.max(0, -slot);

  return {
    opacity: clamp01(1 - gone) * clamp01(1 + VISIBLE_DEPTH - depth),
    transform: `translateY(${depth * DEPTH_OFFSET - gone * EXIT_LIFT}px) scale(${
      1 - depth * DEPTH_SCALE + gone * 0.04
    })`,
  };
};

export const AidenV2 = () => {
  const { runwayRef, step } = useScrollStep({
    enter: CARD_ENTER,
    exit: CARD_EXIT,
  });
  const position = useTween(step, CARD_MS);
  const active = Math.round(position);

  const scrollToCard = (index: number) => {
    const runway = runwayRef.current;
    if (!runway) return;

    const rect = runway.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    if (travel <= 0) return;

    window.scrollTo({
      top: window.scrollY + rect.top + travel * (CARD_ENTER[index] + 0.02),
      behavior: "smooth",
    });
  };

  return (
    <section className="flex flex-col gap-6 rounded-3xl bg-theme-bg-chat px-4 py-8 md:gap-8 md:px-14 md:py-16">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="type-heading-h1 text-balance">Back your trAIners up</h2>
          <p className="type-body-lg text-theme-text-secondary">
            Coming soon: Aiden — the AI Copilot for Personal Trainers
          </p>
        </div>

        <div className="flex max-w-2xl flex-col gap-3">
          <h3 className="type-heading-h3">Every trainer. Supercharged.</h3>
          <p className="type-body-lg text-theme-text-secondary">
            Enable one trainer to coach 3–5× more members by automating planning,
            analysis and routine communication — while keeping every human
            interaction personal.
          </p>
        </div>
      </div>

      <div ref={runwayRef} style={{ height: RUNWAY }}>
        <div className="sticky top-0 flex h-svh flex-col justify-center">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
            <div className="flex flex-col gap-6">
              {/* Stacked in one cell so swapping copy can't shift the layout. */}
              <div className="grid">
                {CAPABILITIES.map((capability, index) => {
                  const fade = clamp01(1 - Math.abs(index - position) * 2);

                  return (
                    <div
                      key={capability.title}
                      aria-hidden={fade === 0}
                      className="col-start-1 row-start-1 flex flex-col gap-3"
                      style={{
                        opacity: fade,
                        transform: `translateY(${(1 - fade) * 10}px)`,
                      }}
                    >
                      <h4 className="type-heading-h2 text-balance">
                        {capability.title}
                      </h4>
                      <p className="type-body-lg text-theme-text-secondary">
                        {capability.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-1.5">
                {CAPABILITIES.map((capability, index) => (
                  <button
                    key={capability.title}
                    type="button"
                    onClick={() => scrollToCard(index)}
                    aria-label={capability.title}
                    aria-current={index === active}
                    className={cn(
                      "h-1 cursor-pointer rounded-full transition-all",
                      index === active
                        ? "w-10 bg-orchid-500"
                        : "w-5 bg-theme-fg-500/25 hover:bg-theme-fg-500/50",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Extra room below so the queued cards aren't clipped. */}
            <div className="relative aspect-[16/10] w-full">
              {CAPABILITIES.map((capability, index) => (
                <article
                  key={capability.title}
                  className="absolute inset-0 overflow-hidden rounded-4xl bg-theme-bg-300 shadow-2xl"
                  style={{
                    zIndex: CAPABILITIES.length - index,
                    ...stackStyle(index - position),
                  }}
                >
                  <img
                    src={capability.image}
                    alt=""
                    className="absolute inset-0 size-full scale-150 object-cover blur-3xl saturate-150"
                  />
                  <div className="absolute inset-0 bg-theme-bg-orchid-100/25" />

                  <div className="absolute inset-0 flex items-center justify-center p-5">
                    <div className="w-full max-w-sm rounded-2xl bg-theme-bg-100/90 p-3 shadow-lg backdrop-blur-md">
                      <div className="flex items-center gap-2 px-1 pb-2">
                        <SparkIcon className="size-4 text-theme-text-orchid" />
                        <span className="type-body-md-semi">
                          Aiden working…
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl bg-theme-bg-green-100 px-3 py-2">
                        <CheckIcon className="size-4 shrink-0 text-theme-text-green" />
                        <span className="type-body-sm min-w-0 flex-1 truncate text-theme-text-secondary">
                          {capability.task}
                        </span>
                        <span className="type-body-sm shrink-0 text-theme-text-secondary">
                          {capability.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href={DEMO_CALENDAR_URL}
        className="type-body-lg-semi min-w-80 self-start rounded-2xl bg-theme-fg-100 px-4 py-3 text-theme-bg-100"
      >
        Get Demo →
      </a>
    </section>
  );
};
