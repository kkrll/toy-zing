import { useEffect, useRef } from "react";

const STATS = [
  { value: "42%", label: "3-months coaching retention" },
  { value: "7.5M+", label: "workouts completed" },
  { value: "850k", label: "paying users" },
] as const;

const TRUST_ITEMS = {
  awards: [
    {
      name: "TechRadar",
      detail: "Best Fitness App 2025",
    },
    {
      name: "Athletech News",
      detail: "Top innovator, Global ranking 2026",
    },
    {
      name: "Globee® Awards for Technology",
      detail: "Best Fitness&Training Technology 2025",
    },
  ],
  partners: [
    {
      name: "PSG",
      detail: "Official fitness app partner",
    },
    {
      name: "Les Mills",
      detail: "Content partner",
    },
    {
      name: "New York Sports Club",
      detail: "MYCO by Zing Coach – official club's AI Coach",
    },
  ],
} as const;

// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

const HERO_VIDEO =
  "/img/Member%20page/NYSC_Landing_video_03_ZingVision-comp.mp4";
const HERO_OVERLAY = "/img/Member%20page/TV.png";

/** Scroll distance (pt/px) over which the hero shrinks from full viewport → resting size */
const SHRINK_SCROLL_PX = 240;

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export const HeroV2 = () => {
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const pin = pinRef.current;
    const card = cardRef.current;
    if (!pin || !card) return;

    let ticking = false;

    const update = () => {
      ticking = false;

      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / SHRINK_SCROLL_PX),
      );

      const fullH = pin.clientHeight;
      const fullW = pin.clientWidth;
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      const isSm = window.matchMedia("(min-width: 640px)").matches;

      // Resting: prior card size (md:min-h ~80svh) + page inset
      const insetX = lerp(0, 24, progress);
      const insetY = lerp(0, isSm ? 16 : 8, progress);
      const radius = lerp(0, isMd ? 32 : 24, progress);
      const height = lerp(fullH, fullH * 0.8, progress);
      const width = lerp(fullW, fullW - insetX * 2, progress);

      card.style.width = `${width}px`;
      card.style.height = `${height}px`;
      card.style.marginTop = `${insetY}px`;
      card.style.borderRadius = `${radius}px`;
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="flex flex-col gap-6 md:gap-12">
      {/* Scroll runway — sticky hero shrinks across the first 120px */}
      <div style={{ height: `calc(100svh + ${SHRINK_SCROLL_PX}px)` }}>
        <div
          ref={pinRef}
          className="sticky top-0 flex h-svh w-full justify-center overflow-hidden"
        >
          <div
            ref={cardRef}
            className="relative isolate flex flex-col gap-6 overflow-hidden bg-theme-bg-100 pt-20 md:justify-end md:gap-6 md:pb-28 md:pt-28"
            style={{ width: "100%", height: "100svh", borderRadius: 0 }}
          >
            {/* Video under multiply. Mobile: in-flow. Desktop: right rail. */}
            <div
              aria-hidden="true"
              className="relative z-0 order-2 mx-auto aspect-3/4 min-h-[400px] w-full max-w-xs overflow-hidden md:pointer-events-none md:absolute md:inset-y-0 md:right-0 md:order-none md:mx-0 md:flex md:aspect-auto md:max-w-none md:w-1/2 md:justify-end md:pt-24 lg:pr-20"
            >
              <video
                autoPlay
                className="mx-auto h-full w-auto max-w-[480px] object-contain object-center md:mx-0 md:object-right"
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

            <div className="relative z-10 order-1 mx-auto w-full max-w-screen-xl px-4 md:order-none md:px-4">
              <div className="flex flex-col gap-3 md:max-w-[50%]">
                <h1 className="type-heading-h1 text-balance">
                  Turn every membership <br className="hidden sm:block" />
                  into a personally coached journey
                </h1>
                <p className="type-body-lg text-theme-text-secondary md:max-w-3xl">
                  The AI coaching platform helping gyms coach every member — not
                  just the 5% who can afford a personal trainer
                </p>
              </div>
            </div>

            <div className="relative z-10 order-3 mx-auto flex w-full max-w-screen-xl flex-col-reverse md:flex-col gap-6 px-4 pb-6 md:order-none md:gap-6 md:px-4 md:pb-0">
              <ul className="grid gap-1 grid-cols-1 lg:grid-cols-3 md:max-w-[50%] md:gap-2 md:pb-8">
                {STATS.map((stat) => (
                  <li
                    key={stat.value}
                    className="flex w-full md:flex-col items-baseline gap-1 rounded-2xl bg-theme-bg-100/70 px-3 md:px-4 py-3 backdrop-blur-sm md:bg-theme-bg-100/30 md:backdrop-blur-none"
                  >
                    <span className="type-heading-h3 lg:type-heading-h1">
                      {stat.value}
                    </span>
                    <span className="type-body-md text-theme-text-secondary md:type-body-lg md:text-theme-text-primary">
                      {stat.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={DEMO_CALENDAR_URL}
                  className="type-body-lg-semi w-full rounded-2xl bg-theme-fg-100 px-4 py-3 text-center text-theme-bg-100 sm:w-auto sm:min-w-3xs"
                >
                  Get Demo →
                </a>
                <button
                  type="button"
                  className="cursor-pointer type-body-lg-semi w-full rounded-2xl bg-theme-bg-100 px-4 py-3 text-center sm:w-auto sm:min-w-3xs"
                >
                  Experience Zing Coach →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-2 py-2 md:gap-8 md:px-8 md:pb-12">
        <h4 className="type-heading-h4 text-center text-theme-text-secondary">
          Trusted by leading names in sports and fitness
        </h4>
        <ul className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:flex-wrap md:items-stretch md:justify-center md:gap-8 md:overflow-visible md:pb-0">
          {TRUST_ITEMS.partners.map((item) => (
            <li
              key={item.name}
              className="flex w-36 shrink-0 snap-start flex-col items-center text-center md:w-auto md:flex-1"
            >
              <div className="type-body-caption mb-2 flex h-8 w-12 items-center justify-center bg-theme-bg-300 text-theme-text-disabled">
                logo
              </div>
              <span className="type-body-md-semi">{item.name}</span>
              <span className="type-body-sm text-theme-text-secondary">
                {item.detail}
              </span>
            </li>
          ))}
          <div className="hidden h-8 w-px bg-theme-bg-400 md:block" />
          {TRUST_ITEMS.awards.map((item) => (
            <li
              key={item.name}
              className="flex w-36 shrink-0 snap-start flex-col items-center text-center md:w-auto md:flex-1"
            >
              <div className="type-body-caption mb-2 flex h-8 w-12 items-center justify-center bg-theme-bg-300 text-theme-text-disabled">
                logo
              </div>
              <span className="type-body-md-semi">{item.name}</span>
              <span className="type-body-sm text-theme-text-secondary">
                {item.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
