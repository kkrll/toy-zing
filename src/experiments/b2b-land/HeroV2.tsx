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
      detail: "Official fitness app partner",
      logo: `${LOGO_BASE}/logo-psg.svg`,
    },
    {
      name: "Les Mills",
      detail: "Content partner",
      logo: `${LOGO_BASE}/logo-les-mills.svg`,
    },
    {
      name: "New York Sports Club",
      detail: "MYCO by Zing Coach – official club's AI Coach",
      logo: `${LOGO_BASE}/logo-nysc.svg`,
    },
  ],
} as const;

// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

const HERO_VIDEO =
  "/img/Member%20page/NYSC_Landing_video_03_ZingVision-comp.mp4";

export const HeroV2 = () => {
  return (
    <section className="flex flex-col gap-6 md:gap-12">
      <div className="relative isolate flex min-h-[75svh] md:h-[70svh] flex-col gap-6 overflow-hidden bg-theme-bg-100 pt-24 md:justify-end md:gap-6 md:pb-24 md:pt-28">
        {/* Video under multiply. Mobile: in-flow. Desktop: right rail. */}
        <div
          aria-hidden="true"
          className="relative z-0 order-2 mx-auto aspect-3/4 min-h-[400px] w-full max-w-xs overflow-hidden md:pointer-events-none md:absolute md:bottom-0 md:right-0 md:top-auto md:order-none md:mx-0 md:flex md:h-full md:max-h-full md:aspect-auto md:max-w-none md:w-1/2 md:items-end md:justify-center md:pt-30"
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

      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-4 py-2 md:gap-8 md:px-14 md:pb-12">
        {/* A carousel on mobile only. Past `md` the list stops being a scroll
            container, so the items' `snap-start` would bind to the next one up — the
            document, which AidenV2 makes snappable — and turn the strip into six
            vertical snap points on the way into the section below. */}
        <ul className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:flex-wrap md:items-stretch md:justify-center md:overflow-visible md:pb-0">
          {TRUST_ITEMS.partners.map((item) => (
            <li
              key={item.name}
              className="group flex w-36 shrink-0 snap-start flex-col items-center text-center md:w-auto md:flex-1 md:snap-align-none"
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
          ))}
          <div className="hidden h-8 w-px bg-theme-bg-400 md:block" />
          {TRUST_ITEMS.awards.map((item) => (
            <li
              key={item.name}
              className="group flex w-36 shrink-0 snap-start flex-col items-center text-center md:w-auto md:flex-1 md:snap-align-none"
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
          ))}
        </ul>
      </div>
    </section>
  );
};
