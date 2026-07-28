import { BusinessValue } from "./BusinessValue";

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

const CARD_IMG = "/img/Member%20page/card-in-gym.png";

export const Value = () => {
  return (
    <section className="bg-theme-bg-100 flex flex-col rounded-3xl px-14 py-16 gap-12">
        <div className="flex flex-col gap-3">
          <h2 className="type-heading-h1 text-balance">
            The next standard of member experience is intelligently personalized
          </h2>
          <p className="type-body-lg text-theme-text-secondary">
            AI Coach inside your existing gym app. Integrated in minutes.
          </p>
        </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2 items-stretch">
          <div className="rounded-3xl mt-8 border border-theme-bg-300 bg-theme-bg-orchid-100 p-8">
            <h3 className="type-heading-h3 text-theme-text-orchid">
              Operational value
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {OPERATIONAL_VALUE.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orchid-500" />
                  <span className="type-body-md text-theme-text-secondary">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl mb-8 overflow-hidden bg-theme-bg-200">
            <img
              src={CARD_IMG}
              alt="AI Coach in the gym"
              className="size-full object-cover"
            />
          </div>

          <div className="rounded-3xl mt-8 border border-theme-bg-300 bg-theme-bg-200 p-8">
            <h3 className="type-heading-h3">Business value</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {BUSINESS_VALUE.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orchid-500" />
                  <span className="type-body-md text-theme-text-secondary">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <BusinessValue />
      </div>

      <div className="flex flex-col gap-4">
        <ul className="flex flex-row items-stretch gap-8 w-full">
          {PRESS_QUOTES.map((item) => (
            <li key={item.source} className="flex flex-col flex-1 gap-4">
              <div className="w-12 h-8 shrink-0 bg-theme-bg-300 flex items-center justify-center type-body-caption text-theme-text-disabled">
                logo
              </div>
              <div className="flex flex-col gap-1">
                <span className="type-body-sm text-theme-text-secondary">
                  {item.source}
                </span>
                <span className="type-body-md-semi  text-balance">"{item.quote}"</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
