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

export const Hero = () => {
  return (
    <section className="min-h-svh flex flex-col gap-24 px-14 pb-12 pt-28 bg-theme-bg-chat rounded-3xl">
      <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="type-heading-h1">Turn every membership <br/>into a personally coached journey</h1>
        <p className="type-body-lg text-theme-text-secondary">
          The AI coaching platform helping gyms coach every member — not just
          the 5% who can afford a personal trainer
        </p>
        </div>
        <div className="flex gap-4">
          <a href={DEMO_CALENDAR_URL} className="px-4 py-3 bg-theme-fg-100 text-theme-bg-100 type-body-lg-semi rounded-2xl min-w-3xs">Get Demo →</a>
          <button type="button" className="px-4 py-3 bg-theme-bg-100 type-body-lg-semi rounded-2xl min-w-3xs">Experience Zing Coach →</button>
        </div>
      </div>

      <div className="grid grid-cols-[3fr_1fr] gap-4 w-full items-stretch">
        <img
          src={HERO_IMG}
          alt="Zing Coach member page"
          className="flex-1"
        />
        <ul className="flex flex-col items-stretch gap-4">
          {STATS.map((stat) => (
            <li key={stat.value} className="flex flex-1 flex-col gap-1 px-4 py-3 min-h-28 w-full justify-end bg-theme-bg-100 rounded-2xl">
              <span className="type-counter-sm">{stat.value}</span>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
        </div>

        <div className="flex flex-col items-center gap-8">
          <h4 className="type-heading-h4 text-theme-text-secondary">Trusted by leading names in sports and fitness</h4>
          <ul className="flex items-stretch gap-8 w-full">
            {TRUST_ITEMS.partners.map((item) => (
              <li key={item.name} className="flex flex-col items-center flex-1 text-center">
                <div className="w-12 h-8 bg-theme-bg-300 flex items-center justify-center type-body-caption text-theme-text-disabled mb-2">logo</div>
                <span className="type-body-md-semi">{item.name}</span>
                <span className="type-body-sm text-theme-text-secondary">{item.detail}</span>
              </li>
            ))}
            <div className="w-px bg-theme-bg-400 h-8"/>
            {TRUST_ITEMS.awards.map((item) => (
              <li key={item.name} className="flex flex-col items-center flex-1 text-center">
                <div className="w-12 h-8 bg-theme-bg-300 flex items-center justify-center type-body-caption text-theme-text-disabled mb-2">logo</div>
                <span className="type-body-md-semi">{item.name}</span>
                <span className="type-body-sm text-theme-text-secondary">{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>
    </section>
  );
};
