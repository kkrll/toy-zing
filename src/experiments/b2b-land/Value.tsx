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

export const Value = () => {
  return (
    <section className="bg-theme-bg-100 rounded-3xl px-14 py-16">
      <div className="grid grid-cols-2 gap-12 items-start">
        {/* Left column: intro + press */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="type-heading-h2">
              The next standard of member experience is intelligently
              personalized
            </h2>
            <p className="type-body-lg text-theme-text-secondary">
              AI Coach inside your existing gym app
            </p>
            <p className="type-body-lg text-theme-text-secondary">
              Integrated in minutes
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="type-body-caption-uppercase text-theme-text-secondary">
              In the press
            </p>
            <ul className="flex flex-col items-stretch gap-8 w-full">
              {PRESS_QUOTES.map((item) => (
                <li
                  key={item.source}
                  className="flex flex-1 items-center gap-4"
                >
                  <div className="w-12 h-8 bg-theme-bg-300 flex items-center justify-center type-body-caption text-theme-text-disabled mb-2">
                    logo
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="type-body-md-semi">"{item.quote}"</span>
                    <span className="type-body-sm text-theme-text-secondary">
                      {item.source}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: stacked value cards */}
        <div className="flex flex-col gap-4">

          <div className="relative">
            {/* Operational value — back card, nudged right so it peeks */}
            <div className="relative z-0 ml-12 rounded-3xl border border-theme-bg-300 bg-theme-bg-orchid-100 p-8 pb-16">
              <h4 className="type-heading-h4 text-theme-text-orchid">
                Operational value
              </h4>
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

            {/* Business value — front card, overlaps upward, nudged left */}
            <div className="relative z-10 -mt-8 mr-12 rounded-3xl border border-theme-bg-300 bg-theme-bg-200 p-8 shadow-xl">
              <h4 className="type-heading-h4">Business value</h4>
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
        </div>
      </div>
      <div className="w-full h-px my-16 bg-theme-bg-300"/>
      <BusinessValue />
    </section>
  );
};
