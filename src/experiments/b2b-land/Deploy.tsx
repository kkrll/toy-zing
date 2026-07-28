const DEPLOYMENT_MODELS = [
  {
    title: "Branded Experience",
    subtitle: "Embed AI coaching into your existing member app.",
    description:
      "Built for gym operators who want complete control over the member experience.",
    features: [
      "Native iOS & Android SDK",
      "White-label UI components",
      "API integrations",
      "Full control over UX",
      "Connect to member data, schedules, and club systems",
    ],
    idealFor:
      "Gyms, influencers, and wellness providers who want to launch fast without technical overhead.",
    cta: "Explore Branded Experience →",
  },
  {
    title: "Mobile SDK",
    subtitle: "Embed AI coaching into your existing member app.",
    description:
      "Built for gym operators who want complete control over the member experience.",
    features: [
      "Native iOS & Android SDK",
      "White-label UI components",
      "API integrations",
      "Full control over UX",
      "Connect to member data, schedules, and club systems",
    ],
    idealFor:
      "Health apps, fitness platforms, and insurers who want AI features inside their existing user experience.",
    cta: "Explore SDK →",
  },
  {
    title: "White-label App",
    subtitle: "Your brand. Our technology. Zero maintenance.",
    description:
      "Launch a fully branded AI coaching app without building one yourself.",
    features: [
      "Fully branded application",
      "Custom navigation",
      "Zing maintains infrastructure",
      "GDPR & security",
      "Enterprise SLA",
    ],
    idealFor:
      "Enterprise gym chains, franchises, and corporate wellness programs needing a fully owned app experience.",
    cta: "Explore White-label →",
  },
] as const;

export const Deploy = () => {
  return (
    <section className="flex flex-col gap-6 rounded-3xl bg-theme-bg-100 px-4 py-8 md:gap-8 md:px-14 md:py-16">
      <div className="flex flex-col gap-3">
        <h2 className="type-heading-h1 text-balance">
          One AI platform. Three ways to launch.
        </h2>
        <p className="type-body-lg text-theme-text-secondary max-w-xl">
          Deploy Zing the way that best fits your business – from a branded
          experience in days to a fully embedded SDK or a complete white-label
          application.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="type-heading-h3 text-balance">
          Choose the deployment model that fits your business
        </h3>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {DEPLOYMENT_MODELS.map((model) => (
            <article
              key={model.title}
              className="flex flex-col bg-theme-bg-main-section p-6 rounded-3xl gap-4 justify-between"
            >
              <div className="flex flex-col gap-4">
                <h4 className="type-heading-h3 mb-2">{model.title}</h4>
                <p className="type-body-md text-theme-text-secondary">
                  {model.subtitle}
                </p>
                <p className="type-body-md text-theme-text-secondary">
                  {model.description}
                </p>

                <ul className="flex flex-col gap-1">
                  {model.features.map((feature) => (
                    <li
                      key={feature}
                      className="type-body-sm text-theme-text-secondary"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="type-body-sm text-theme-text-secondary">
                  <strong className="type-body-sm-medium text-theme-text-primary">
                    Ideal for:
                  </strong>{" "}
                  {model.idealFor}
                </p>
              </div>

              <button type="button" className="type-body-md-semi self-start">
                {model.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
