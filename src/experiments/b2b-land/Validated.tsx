const METRICS = [
  { value: "42%", label: "3-month retention among AI-coached members" },
  { value: "61%", label: "say they can’t train without Zing" },
  { value: "88%", label: "would recommend it" },
] as const;

export const Validated = () => {
  return (
    <section className="bg-theme-bg-100 rounded-3xl px-14 py-16 flex flex-col gap-8">
      <h2 className="type-heading-h2">Validated in the real world</h2>

      <ul className="grid grid-cols-3 gap-4">
        {METRICS.map((metric) => (
          <li key={metric.value} className="flex flex-col gap-1">
            <strong className="type-counter-xs">{metric.value}</strong>
            <span className="type-body-md text-theme-text-secondary">{metric.label}</span>
          </li>
        ))}
      </ul>
      <p className="type-body-sm text-theme-text-secondary">Internal Zing’s research</p>

      <div className="flex flex-col gap-4">
        <h3 className="type-heading-h3">
          How one of America’s largest gym operators scaled coaching beyond PT
          capacity
        </h3>

        {/* TODO: NYSC logo */}
        <p className="type-body-md-semi">NYSC</p>

        {/* TODO: NYSC photos / videos */}
        <div aria-label="NYSC photos and videos">
          <p className="type-body-md text-theme-text-secondary">NYSC photos / videos</p>
        </div>

        <dl className="flex gap-8">
          <div className="flex flex-col gap-1">
            <dt className="type-body-lg-semi">Live</dt>
            <dd className="type-body-md text-theme-text-secondary">since April, 2026</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="type-body-lg-semi">2.3x / week</dt>
            <dd className="type-body-md text-theme-text-secondary">average workout per user</dd>
          </div>
        </dl>
        {/* ❗️UPDATED METRICS NEEDED❗️ */}
        <p className="type-body-sm text-theme-text-secondary">❗️UPDATED METRICS NEEDED❗️</p>

        <blockquote className="flex flex-col gap-2">
          <p className="type-body-lg">
            “I tried to trick it a million ways, and it always comes back with
            what’s right for you.”
          </p>
          <footer className="type-body-md text-theme-text-secondary">— Bill McMenamy, CEO, NYSC</footer>
        </blockquote>
      </div>
    </section>
  );
};
