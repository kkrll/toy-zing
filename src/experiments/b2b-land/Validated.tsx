const METRICS = [
  { value: "42%", label: "3-month retention among AI-coached members" },
  { value: "61%", label: "say they can’t train without Zing" },
  { value: "88%", label: "would recommend it" },
] as const;

export const Validated = () => {
  return (
    <section>
      <h2>Validated in the real world</h2>

      <ul>
        {METRICS.map((metric) => (
          <li key={metric.value}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </li>
        ))}
      </ul>
      <p>Internal Zing’s research</p>

      <h3>
        How one of America’s largest gym operators scaled coaching beyond PT
        capacity
      </h3>

      {/* TODO: NYSC logo */}
      <p>NYSC</p>

      {/* TODO: NYSC photos / videos */}
      <div aria-label="NYSC photos and videos">
        <p>NYSC photos / videos</p>
      </div>

      <dl>
        <div>
          <dt>Live</dt>
          <dd>since April, 2026</dd>
        </div>
        <div>
          <dt>2.3x / week</dt>
          <dd>average workout per user</dd>
        </div>
      </dl>
      {/* ❗️UPDATED METRICS NEEDED❗️ */}
      <p>❗️UPDATED METRICS NEEDED❗️</p>

      <blockquote>
        <p>
          “I tried to trick it a million ways, and it always comes back with
          what’s right for you.”
        </p>
        <footer>— Bill McMenamy, CEO, NYSC</footer>
      </blockquote>
    </section>
  );
};
