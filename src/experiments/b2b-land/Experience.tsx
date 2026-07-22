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
    <section>
      <h2>What your members experience</h2>

      <ul>
        {FEATURES.map((feature) => (
          <li key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </li>
        ))}
      </ul>

      <button type="button">Try now →</button>
    </section>
  );
};
