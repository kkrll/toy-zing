const FEATURES = [
  {
    title: "Proactive AI Coach",
    description:
      "Keeps members engaged with timely guidance, motivation and support — inside and outside the gym",
  },
  {
    title: "Adaptive Training Intelligence",
    description:
      "Continuously adapts training plans to each member’s goals, progress, recovery and changing circumstances",
  },
  {
    title: "Automated Progress Tracking",
    description:
      "Tracks strength, body composition and physical progress over time—without manual assessments or additional hardware",
  },
  {
    title: "Nutrition",
    description:
      "Delivers personalized nutrition guidance based on each member’s goals and progress",
  },
  {
    title: "Engagement",
    description:
      "Builds lasting exercise habits through streaks, challenges, strength scores and personalized milestones",
  },
] as const;

export const Experience = () => {
  return (
    <section className="bg-theme-bg-100 rounded-3xl px-14 py-16 flex flex-col gap-8">
      <h2 className="type-heading-h2">What your members experience</h2>

      <ul className="flex flex gap-6">
        {FEATURES.map((feature) => (
          <li key={feature.title} className="flex flex-col gap-1">
            <div className="rounded-3xl overflow-hidden bg-theme-bg-main-section h-96 w-80 mb-4" />
              <h3 className="type-body-lg-semi">{feature.title}</h3>
            <p className="type-body-lg text-theme-text-secondary">{feature.description}</p>
          </li>
        ))}
      </ul>

      <button type="button" className="px-4 py-3 min-w-80 bg-theme-fg-100 text-theme-bg-100 type-body-lg-semi rounded-2xl self-start">
        Try now →
      </button>
    </section>
  );
};
