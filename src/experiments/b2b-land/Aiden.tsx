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
    <section>
      <h2>Back your trAIners up</h2>
      <p>Coming soon: Aiden — the AI Copilot for Personal Trainers</p>

      {/* [concept for the image] */}
      <div aria-hidden="true">
        <p>Aiden concept image</p>
      </div>

      <h3>Every trainer. Supercharged.</h3>
      <p>Multiply every coach’s impact.</p>
      <p>
        Enable one trainer to coach 3–5× more members by automating planning,
        analysis and routine communication — while keeping every human
        interaction personal.
      </p>

      <ul>
        {CAPABILITIES.map((capability) => (
          <li key={capability.title}>
            <h4>{capability.title}</h4>
            <p>{capability.description}</p>
          </li>
        ))}
      </ul>

      <a href={DEMO_CALENDAR_URL}>Get Demo →</a>
    </section>
  );
};
