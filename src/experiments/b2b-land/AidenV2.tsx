"use client";

const FEATURES = [
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

const FEATURED = {
  ui: "/img/Member%20page/p-feature-1.png",
  image: "/img/Member%20page/card-bg-2.png",
} as const;

// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

export const AidenV2 = () => {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-16 md:gap-12 md:px-14 md:py-32">
        <div className="flex min-w-0 max-w-xl flex-col gap-2">
          <h2 className="type-heading-h1 text-balance">
            Back your trAIners up
          </h2>
          <p className="type-body-md text-theme-text-secondary mb-2">
            Coming soon: Aiden — the AI Copilot for Personal Trainers
          </p>
          <p className="type-body-lg">
            Enable one trainer to coach 3–5× more members by automating
            planning, analysis and routine communication, while keeping every
            human interaction personal.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <ul className="order-2 grid w-full grid-cols-1 gap-2 self-start md:order-1 md:gap-4">
            {FEATURES.map((feature, index) => (
              <li key={feature.title} className="flex flex-col gap-4">
                {index !== 0 && (
                  <div
                    className="h-0.5 w-[120px] bg-theme-bg-300"
                    aria-hidden
                  />
                )}
                <div>
                  <h3 className="type-body-md-semi text-balance pb-1">
                    {feature.title}
                  </h3>
                  <p className="type-body-md text-balance text-theme-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative order-1 aspect-3/2 overflow-hidden rounded-4xl bg-theme-bg-300 md:order-2 md:aspect-auto md:min-h-full">
            <img
              src={FEATURED.image}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
            <img
              src={FEATURED.ui}
              alt=""
              className="absolute inset-0 size-full object-contain object-center p-4 md:p-6"
            />
          </div>
        </div>

        <a
          href={DEMO_CALENDAR_URL}
          className="type-body-lg-semi w-full rounded-2xl bg-theme-fg-100 px-4 py-3 text-center text-theme-bg-100"
        >
          Get Demo →
        </a>
      </div>
    </section>
  );
};
