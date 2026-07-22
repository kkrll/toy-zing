const BUSINESS_VALUE = [
  "Every member becomes coachable - not just the 5% who can afford personal trainers",
  "Members stay engaged with coaching for longer",
  "More value from the members you already have",
  "Richer member intelligence across every interaction",
] as const;

const OPERATIONAL_VALUE = [
  "Five-minute basic integration",
  "No additional hardware needed",
  "White-label SDK",
  "Les Mills content integration",
] as const;

const PRESS_QUOTES = [
  {
    source: "TechRadar",
    quote: "App that reveals the true power of AI training",
  },
  {
    source: "Business Insider",
    quote: "AI is a key to building better health and fitness habits.",
  },
  {
    source: "Forbes",
    quote:
      "Zing adjusts your daily workouts to your current mental and physical state.",
  },
] as const;

export const Value = () => {
  return (
    <section>
      <h2>The next standard of member experience is intelligently personalized</h2>
      <p>AI Coach inside your existing gym app</p>
      <p>Integrated in minutes</p>

      <hr />

      <h3>Built for fitness operators</h3>

      <div>
        <div>
          <h4>Business value</h4>
          <ul>
            {BUSINESS_VALUE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Operational value</h4>
          <ul>
            {OPERATIONAL_VALUE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        {PRESS_QUOTES.map((item) => (
          <figure key={item.source}>
            <figcaption>{item.source}</figcaption>
            <blockquote>
              <p>“{item.quote}”</p>
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
};
