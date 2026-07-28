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
    <section className="flex flex-col gap-8 rounded-3xl bg-linear-to-b from-theme-bg-200 to-theme-bg-100 px-4 py-8 md:gap-12 md:px-14 md:py-16">
        <div className="flex flex-col gap-3">
          <h2 className="type-heading-h1 text-balance">
            The next standard of member experience is intelligently personalized
          </h2>
          <p className="type-body-lg text-theme-text-secondary">
            AI Coach inside your existing gym app. Integrated in minutes.
          </p>
        </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 items-stretch gap-2 md:grid-cols-3">
          <div className="mt-0 rounded-3xl border border-theme-bg-300 bg-theme-bg-orchid-100 p-6 md:mt-8 md:p-8">
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

          <div className="mb-0 aspect-[4/5] overflow-hidden rounded-3xl bg-theme-bg-200 md:mb-8 md:aspect-auto">
            <img
              src={CARD_IMG}
              alt="AI Coach in the gym"
              className="size-full object-cover"
            />
          </div>

          <div className="mt-0 rounded-3xl bg-theme-bg-100 p-6 md:mt-8 md:p-8">
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
        <ul className="flex w-full flex-col items-stretch gap-6 sm:flex-row sm:gap-8">
          {PRESS_QUOTES.map((item) => (
            <li key={item.source} className="flex flex-1 flex-col gap-4">
              <div className="type-body-caption flex h-8 w-12 shrink-0 items-center justify-center bg-theme-bg-300 text-theme-text-disabled">
                logo
              </div>
              <div className="flex flex-col gap-1">
                <span className="type-body-sm text-theme-text-secondary">
                  {item.source}
                </span>
                <span className="type-body-md-semi text-balance">"{item.quote}"</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
