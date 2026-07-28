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
    <section className="flex min-h-svh flex-col gap-8 md:gap-12">
      <div className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden rounded-4xl pb-28 pt-24 md:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 flex justify-end md:w-1/2 pt-24 pr-20"
        >
          <video
            autoPlay
            className="h-full w-auto max-w-none object-contain object-right"
            loop
            muted
            playsInline
            src={HERO_VIDEO}
          />
        </div>
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right-bottom mix-blend-multiply"
          src={HERO_OVERLAY}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-3 md:px-4">
          <div className="flex flex-col gap-3 md:max-w-[50%]">
            <h1 className="type-heading-h1 text-balance">
              Turn every membership <br className="hidden sm:block" />
              into a personally coached journey
            </h1>
            <p className="type-body-lg max-w-3xl text-theme-text-secondary">
              The AI coaching platform helping gyms coach every member — not
              just the 5% who can afford a personal trainer
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 items-stretch gap-4 pb-8 md:grid-cols-[2fr_1fr]">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:items-stretch md:gap-4">
              {STATS.map((stat) => (
                <li
                  key={stat.value}
                  className="flex w-full flex-1 flex-col justify-end gap-1 rounded-2xl bg-theme-bg-100/30 px-4 py-3 md:min-h-28"
                >
                  <span className="type-heading-h1">{stat.value}</span>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={DEMO_CALENDAR_URL}
              className="type-body-lg-semi min-w-0 rounded-2xl bg-theme-fg-100 px-4 py-3 text-center text-theme-bg-100 sm:min-w-3xs"
            >
              Get Demo →
            </a>
            <button
              type="button"
              className="type-body-lg-semi min-w-0 rounded-2xl bg-theme-bg-100 px-4 py-3 text-center sm:min-w-3xs"
            >
              Experience Zing Coach →
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-6 px-2 py-2 md:gap-8 md:px-8 md:pb-12">
        <h4 className="type-heading-h4 text-center text-theme-text-secondary">
          Trusted by leading names in sports and fitness
        </h4>
        <ul className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:flex-wrap md:items-stretch md:justify-center md:gap-8 md:overflow-visible md:pb-0">
          {TRUST_ITEMS.partners.map((item) => (
            <li
              key={item.name}
              className="flex w-40 shrink-0 snap-start flex-col items-center text-center md:w-auto md:flex-1"
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
              className="flex w-40 shrink-0 snap-start flex-col items-center text-center md:w-auto md:flex-1"
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
