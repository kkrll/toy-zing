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
    <section className="bg-theme-bg-100 rounded-3xl px-14 py-16 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="type-heading-h2">The next standard of member experience is intelligently personalized</h2>
        <p className="type-body-lg text-theme-text-secondary">AI Coach inside your existing gym app</p>
        <p className="type-body-lg text-theme-text-secondary">Integrated in minutes</p>
      </div>

      <hr className="border-theme-bg-300" />

      <div className="flex flex-col gap-6">
        <h3 className="type-heading-h3">Built for fitness operators</h3>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <h4 className="type-heading-h4">Business value</h4>
            <ul className="flex flex-col gap-2">
              {BUSINESS_VALUE.map((item) => (
                <li key={item} className="type-body-md text-theme-text-secondary">{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="type-heading-h4">Operational value</h4>
            <ul className="flex flex-col gap-2">
              {OPERATIONAL_VALUE.map((item) => (
                <li key={item} className="type-body-md text-theme-text-secondary">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {PRESS_QUOTES.map((item) => (
          <figure key={item.source} className="flex flex-col gap-2">
            <figcaption className="type-body-md-semi">{item.source}</figcaption>
            <blockquote>
              <p className="type-body-md text-theme-text-secondary">“{item.quote}”</p>
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
};
