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

const HERO_IMG = "/img/Member%20page/desktop.webp";

export const HeroV1 = () => {
  return (
    <section className="flex min-h-svh flex-col gap-8 pt-24 md:gap-12 md:pt-28">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="type-heading-h1 text-balance">
            Turn every membership <br className="hidden sm:block" />
            into a personally coached journey
          </h1>
          <p className="type-body-lg max-w-3xl text-theme-text-secondary">
            The AI coaching platform helping gyms coach every member — not just
            the 5% who can afford a personal trainer
          </p>
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
            className="type-body-lg-semi min-w-0 rounded-2xl bg-theme-bg-chat px-4 py-3 text-center sm:min-w-3xs"
          >
            Experience Zing Coach →
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8 rounded-3xl bg-theme-bg-chat p-3 md:gap-12 md:rounded-4xl md:p-4">
        <div className="grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-[3fr_1fr]">
          <img
            src={HERO_IMG}
            alt="Zing Coach member page"
            className="w-full rounded-2xl"
          />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:flex md:flex-col md:items-stretch md:gap-4">
            {STATS.map((stat) => (
              <li
                key={stat.value}
                className="flex min-h-24 w-full flex-1 flex-col justify-end gap-1 rounded-2xl bg-theme-bg-100 px-4 py-3 md:min-h-28"
              >
                <span className="type-counter-sm">{stat.value}</span>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-6 px-2 py-2 md:gap-8 md:px-8 md:py-4">
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
      </div>
    </section>
  );
};
