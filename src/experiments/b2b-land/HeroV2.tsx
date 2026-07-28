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

export const HeroV2 = () => {
  return (
    <section className="flex flex-col gap-6 md:min-h-svh md:gap-12">
      <div className="relative isolate flex flex-col gap-6 overflow-hidden rounded-3xl bg-theme-bg-100 pt-20 md:min-h-[80vh] md:justify-end md:gap-6 md:rounded-4xl md:pb-28 md:pt-28">
        {/* Video under multiply. Mobile: in-flow. Desktop: right rail. */}
        <div
          aria-hidden="true"
          className="relative z-0 order-2 mx-auto aspect-3/4 w-full max-w-xs overflow-hidden md:pointer-events-none md:absolute md:inset-y-0 md:right-0 md:order-none md:mx-0 md:flex md:aspect-auto md:max-w-none md:w-1/2 md:justify-end md:pt-24 md:pr-20"
        >
          <video
            autoPlay
            className="mx-auto h-full w-auto max-w-none object-contain object-center md:mx-0 md:object-right"
            loop
            muted
            playsInline
            src={HERO_VIDEO}
          />
        </div>

        {/* Multiply above video, below copy */}
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-center mix-blend-multiply md:object-right-bottom"
          src={HERO_OVERLAY}
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

        <div className="relative z-10 order-3 mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 pb-6 md:order-none md:gap-6 md:px-4 md:pb-0">
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 md:max-w-[800px] md:gap-2 md:pb-8">
            {STATS.map((stat) => (
              <li
                key={stat.value}
                className="flex w-full flex-col justify-end gap-1 rounded-2xl bg-theme-bg-100/70 px-4 py-3 backdrop-blur-sm md:min-h-28 md:bg-theme-bg-100/30 md:backdrop-blur-none"
              >
                <span className="type-heading-h2 md:type-heading-h1">
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
              className="type-body-lg-semi w-full rounded-2xl bg-theme-bg-100 px-4 py-3 text-center sm:w-auto sm:min-w-3xs"
            >
              Experience Zing Coach →
            </button>
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
