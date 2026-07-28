const CAPABILITIES = [
  {
    title: "Member Intelligence",
    description:
      "See training activity, recovery, body composition, adherence and behavioral trends in one place.",
  },
  {
    title: "Churn Prediction",
    description:
      "Identify members losing momentum before they stop showing up.",
  },
  {
    title: "Program Building",
    description: "Generate and refine personalized programs in seconds.",
  },
  {
    title: "Coach Communication",
    description:
      "Draft personalized follow-ups, motivation and coaching recommendations.",
  },
  {
    title: "Progress Reviews",
    description: "Turn member data into actionable coaching insights.",
  },
] as const;

// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

export const Aiden = () => {
  return (
    <section className="flex flex-col gap-6 rounded-3xl bg-theme-bg-100 px-4 py-8 md:gap-8 md:px-14 md:py-16">
      <div className="flex flex-col gap-3">
        <h2 className="type-heading-h2 text-balance">Back your trAIners up</h2>
        <p className="type-body-lg text-theme-text-secondary">
          Coming soon: Aiden — the AI Copilot for Personal Trainers
        </p>
      </div>

      {/* [concept for the image] */}
      <div aria-hidden="true" className="type-body-md text-theme-text-secondary">
        <p>Aiden concept image</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="type-heading-h3">Every trainer. Supercharged.</h3>
        <p className="type-body-lg text-theme-text-secondary">
          Multiply every coach’s impact.
        </p>
        <p className="type-body-lg text-theme-text-secondary">
          Enable one trainer to coach 3–5× more members by automating planning,
          analysis and routine communication — while keeping every human
          interaction personal.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CAPABILITIES.map((capability) => (
          <li key={capability.title} className="flex flex-col gap-1">
            <h4 className="type-body-lg-semi">{capability.title}</h4>
            <p className="type-body-md text-theme-text-secondary">
              {capability.description}
            </p>
          </li>
        ))}
      </ul>

      <a
        href={DEMO_CALENDAR_URL}
        className="type-body-lg-semi self-start rounded-2xl bg-theme-fg-100 px-4 py-3 text-theme-bg-100"
      >
        Get Demo →
      </a>
    </section>
  );
};
