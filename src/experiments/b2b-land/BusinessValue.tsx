const VALUE_CHAIN = [
  "More members coached",
  "More consistent training habits",
  "Higher retention",
  "Higher lifetime value",
  "More revenue from your existing member base",
] as const;

const LTV_SEGMENTS = [
  { key: "membership", label: "Membership base" },
  { key: "ai", label: "New AI revenue" },
  { key: "retention", label: "Retention uplift" },
] as const;

export const BusinessValue = () => {
  return (
    <section>
      <h2>How Zing creates business value</h2>

      <ol>
        {VALUE_CHAIN.map((step, index) => (
          <li key={step}>
            <p>{step}</p>
            {index < VALUE_CHAIN.length - 1 ? <p>↓</p> : null}
          </li>
        ))}
      </ol>

      {/* Visual: Member LTV illustrative stacked bar — Today vs With Zing */}
      <figure>
        <p>MEMBER LTV · ILLUSTRATIVE</p>

        <div aria-label="Member LTV comparison: Today vs With Zing">
          <div>
            <div aria-label="Today: membership base" />
            <span>Today</span>
          </div>

          {/* [dynamic graph: the right column growths] */}
          <div>
            <div aria-label="With Zing: membership base + new AI revenue + retention uplift">
              {LTV_SEGMENTS.map((segment) => (
                <div key={segment.key} data-segment={segment.key} />
              ))}
            </div>
            <span>With Zing</span>
          </div>
        </div>

        <ul>
          {LTV_SEGMENTS.map((segment) => (
            <li key={segment.key}>{segment.label}</li>
          ))}
        </ul>
      </figure>
    </section>
  );
};
