"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./scrollAnimation";

const STATS = [
  { value: "42%", label: "3-months coaching retention" },
  { value: "7.5M+", label: "workouts completed" },
  { value: "850k", label: "users coached" },
] as const;

const LOGO_BASE = "/img/Member%20page/logos";

const TRUST_ITEMS = {
  awards: [
    {
      name: "TechRadar",
      detail: "Best Fitness App 2025",
      logo: `${LOGO_BASE}/logo-techradar.svg`,
    },
    {
      name: "Athletech News",
      detail: "Top innovator, Global ranking 2026",
      logo: `${LOGO_BASE}/logo-atn.svg`,
    },
    {
      name: "Globee® Awards for Technology",
      detail: "Best Fitness&Training Technology 2025",
      logo: `${LOGO_BASE}/logo-globee.png`,
    },
  ],
  partners: [
    {
      name: "PSG",
      detail: "Elite sports partner",
      logo: `${LOGO_BASE}/logo-psg.svg`,
    },
    {
      name: "Les Mills",
      detail: "Content partner",
      logo: `${LOGO_BASE}/logo-les-mills.svg`,
    },
    {
      name: "New York Sports Club",
      detail: "Fitness chain partner",
      logo: `${LOGO_BASE}/logo-nysc.svg`,
    },
  ],
} as const;

// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

const HERO_VIDEO =
  "/img/Member%20page/NYSC_Landing_video_03_ZingVision-comp.mp4";

/**
 * Whether the trust strip should pan itself: below md, where it is a scroll container at
 * all, and only for visitors who haven't asked for less motion.
 *
 * Seeded off so the first paint is the plain carousel and the pan is strictly something
 * layered on after mount — nothing about the strip depends on it having run.
 */
const useCanPan = () => {
  const [narrow, setNarrow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return narrow && !reduced;
};

/**
 * Pans the trust strip sideways from the page's own vertical scroll, and hands it back
 * the moment the visitor moves it themselves.
 *
 * Six items in a phone viewport is a row with roughly 550px hidden off the right edge,
 * and nothing on screen says so — a mobile scrollbar doesn't exist until you scroll, so
 * an overflowing row reads as a row that ends. Tying the offset to page scroll means the
 * strip is already drifting as it comes into view, which says "there is more this way"
 * without an arrow or a painted scrollbar to keep in sync.
 *
 * It is a hint, not a mode: the first time the visitor moves the strip the hook detaches
 * for good and it is an ordinary carousel from then on.
 *
 * Release is keyed to the strip's scroll position rather than to a touch, because a
 * finger landing on the strip is not an attempt to move it — most often it is the start
 * of a vertical page scroll that happens to begin there, and releasing on `touchstart`
 * would cancel the pan for anyone who scrolls with their thumb mid-screen. Comparing
 * against the last offset written asks the only question that matters — did this scroll
 * come from us? — and so catches drags, wheels and keyboard alike while ignoring taps.
 */
const useScrollPan = (active: boolean) => {
  const ref = useRef<HTMLUListElement>(null);
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const strip = ref.current;
    if (!strip || !active || engaged) return;

    let frame = 0;
    let written = strip.scrollLeft;

    const sync = () => {
      frame = 0;

      const overflow = strip.scrollWidth - strip.clientWidth;
      if (overflow <= 0) return;

      const { top, height } = strip.getBoundingClientRect();
      /*
       * Anchored to the page rather than to the viewport, so the strip is at its left
       * edge with the page at rest and fully panned as it leaves the top.
       *
       * The obvious mapping — the strip's pass across the viewport, 0 at the bottom edge
       * and 1 at the top — is wrong here for a reason particular to a hero: the strip
       * sits under a 75svh block, so it is already a fifth of the way into the viewport
       * before anyone has scrolled, and that mapping would open the page with the first
       * logo three-quarters cut off. Measuring from the top of the document instead
       * guarantees the first frame is 0.
       *
       * `top + scrollY` is the strip's document offset, re-read every frame rather than
       * cached: the hero is svh-sized, so a mobile URL bar collapsing moves it.
       */
      const travel = top + window.scrollY + height;
      const progress = travel > 0 ? window.scrollY / travel : 0;

      strip.scrollLeft = Math.min(1, Math.max(0, progress)) * overflow;
      // Read back rather than reusing the target: the browser rounds and clamps, and the
      // comparison in `release` has to be against what actually landed.
      written = strip.scrollLeft;
    };

    // One rect read per frame, and only while the page is actually moving.
    const schedule = () => {
      frame ||= requestAnimationFrame(sync);
    };

    const release = () => {
      if (Math.abs(strip.scrollLeft - written) > 1) setEngaged(true);
    };

    sync();
    strip.addEventListener("scroll", release, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      strip.removeEventListener("scroll", release);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [active, engaged]);

  return { ref, panning: active && !engaged };
};

const TrustItem = ({
  item,
  snapping,
}: {
  item: { name: string; detail: string; logo: string };
  snapping: boolean;
}) => (
  <li
    className={cn(
      "group flex w-36 shrink-0 flex-col items-center text-center md:w-auto md:flex-1 md:snap-align-none",
      snapping && "snap-start",
    )}
  >
    <img
      src={item.logo}
      alt=""
      className="mb-2 h-8 w-auto object-contain opacity-40 grayscale transition-opacity duration-200 group-hover:opacity-100"
    />
    <span className="type-body-sm-medium lg:type-body-md-semi pb-1">
      {item.name}
    </span>
    <span className="type-body-caption text-theme-text-secondary">
      {item.detail}
    </span>
  </li>
);

export const HeroV2 = () => {
  const canPan = useCanPan();
  const { ref: stripRef, panning } = useScrollPan(canPan);
  // Snapping belongs to whoever is driving. It is off while the page drives the strip,
  // and on everywhere the page doesn't: desktop, reduced motion, and after the handover.
  const snapping = !panning;

  return (
    <section className="flex flex-col md:gap-12">
      <div className="relative isolate flex md:h-[70svh] flex-col gap-6 overflow-hidden bg-theme-bg-100 pt-40 md:justify-end md:gap-6 md:pb-24">
        {/* Video under multiply. Mobile: in-flow. Desktop: right rail. */}
        <div
          aria-hidden="true"
          className="relative z-0 order-2 mx-auto hidden aspect-3/4 min-h-[400px] w-full max-w-xs overflow-hidden md:pointer-events-none md:absolute md:bottom-0 md:right-0 md:top-auto md:order-none md:mx-0 md:flex md:h-full md:max-h-full md:aspect-auto md:max-w-none md:w-1/2 md:items-end md:justify-center md:pt-30"
        >
          <video
            autoPlay
            className="mx-auto h-auto max-h-full w-auto max-w-[480px] object-contain object-bottom md:mx-0"
            loop
            muted
            playsInline
            src={HERO_VIDEO}
          />
        </div>

        {/* Multiply above video, below copy */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full bg-theme-bg-chat object-cover object-center mix-blend-multiply md:object-right-bottom"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] bg-repeat opacity-100 mix-blend-overlay"
          style={{ backgroundImage: "url('/noise-light.png')" }}
        />

        <div className="relative z-10 order-1 mx-auto w-full max-w-screen-xl px-4 md:px-14 lg:pt-[20svh] md:order-none md:pt-0">
          <div className="flex flex-col gap-3 md:max-w-[50%]">
            <h1 className="type-heading-h1 text-balance">
              Every gym member, <br className="hidden sm:block" />
              Personally coached
            </h1>
            <p className="type-body-lg md:max-w-3xl text-balance">
              Keep more members engaged for longer, without scaling your
              coaching team
            </p>
          </div>
        </div>

        <div className="relative z-10 order-3 mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 pb-6 md:order-none md:gap-6 md:px-14 md:pb-0">
          <ul className="grid gap-1 grid-cols-3 md:max-w-[50%] md:gap-2 md:pb-8">
            {STATS.map((stat) => (
              <li
                key={stat.value}
                className="flex w-full items-baseline gap-1 rounded-2xl bg-theme-bg-100/70 px-3 py-3 backdrop-blur-sm flex-col md:bg-theme-bg-100/30 md:px-4 md:backdrop-blur-none"
              >
                <span className="type-heading-h3 md:type-heading-h2 xl:type-heading-h1">
                  {stat.value}
                </span>
                <span className="type-body-md text-theme-text-secondary md:type-body-sm xl:type-body-lg md:text-theme-text-primary">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={DEMO_CALENDAR_URL}
              className="type-body-lg-semi h-12 w-full rounded-2xl bg-theme-fg-100 px-4 py-3 text-center text-theme-bg-100 sm:w-auto sm:min-w-3xs"
            >
              Get Demo →
            </a>
            <button
              type="button"
              className="type-body-lg-semi h-12 w-full cursor-pointer rounded-2xl bg-theme-bg-100 px-4 py-3 text-center sm:w-auto sm:min-w-3xs"
            >
              Experience Zing Coach →
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-4 pt-6 pb-2 md:gap-8 md:px-14 md:pt-2 md:pb-12">
        {/* A carousel on mobile only. Past `md` the list stops being a scroll
            container, so the items' `snap-start` would bind to the next one up — the
            document, which AidenV2 makes snappable — and turn the strip into six
            vertical snap points on the way into the section below.

            `proximity` rather than `mandatory` on the way out of the pan: the handover
            happens mid-drag from wherever the page left the strip, which is rarely on a
            card boundary, and mandatory would owe itself a correction from there.
            Proximity only pulls once a rest position is already near a card, which is
            the behaviour a logo strip wants anyway. */}
        <ul
          ref={stripRef}
          className={cn(
            "flex w-full gap-4 overflow-x-auto pb-2 md:flex-wrap md:items-stretch md:justify-center md:overflow-visible md:pb-0",
            snapping && "snap-x snap-proximity",
          )}
        >
          {TRUST_ITEMS.partners.map((item) => (
            <TrustItem key={item.name} item={item} snapping={snapping} />
          ))}
          <div className="hidden h-8 w-px bg-theme-bg-400 md:block" />
          {TRUST_ITEMS.awards.map((item) => (
            <TrustItem key={item.name} item={item} snapping={snapping} />
          ))}
        </ul>
      </div>
    </section>
  );
};
