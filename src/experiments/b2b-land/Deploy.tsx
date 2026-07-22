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
    <section>
      <h2>One AI platform. Three ways to launch.</h2>
      <p>
        Deploy Zing the way that best fits your business – from a branded
        experience in days to a fully embedded SDK or a complete white-label
        application.
      </p>

      <h3>Choose the deployment model that fits your business</h3>

      <div>
        {DEPLOYMENT_MODELS.map((model) => (
          <article key={model.title}>
            <h4>{model.title}</h4>
            <p>{model.subtitle}</p>
            <p>{model.description}</p>

            <ul>
              {model.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <p>
              <strong>Ideal for:</strong> {model.idealFor}
            </p>

            <button type="button">{model.cta}</button>
          </article>
        ))}
      </div>
    </section>
  );
};
