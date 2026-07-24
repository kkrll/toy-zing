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
    <section className="bg-theme-bg-100 rounded-3xl px-14 py-16 flex flex-col gap-8">
      <h2 className="type-heading-h2">How Zing creates business value</h2>

      <ol className="flex flex-col gap-2">
        {VALUE_CHAIN.map((step, index) => (
          <li key={step} className="flex flex-col gap-2">
            <p className="type-body-lg">{step}</p>
            {index < VALUE_CHAIN.length - 1 ? <p className="text-theme-text-secondary">↓</p> : null}
          </li>
        ))}
      </ol>

      {/* Visual: Member LTV illustrative stacked bar — Today vs With Zing */}
      <figure className="flex flex-col gap-4">
        <p className="type-heading-h4 text-theme-text-secondary">MEMBER LTV · ILLUSTRATIVE</p>

        <div aria-label="Member LTV comparison: Today vs With Zing">
          <div>
            <div aria-label="Today: membership base" />
            <span className="type-body-md">Today</span>
          </div>

          {/* [dynamic graph: the right column growths] */}
          <div>
            <div aria-label="With Zing: membership base + new AI revenue + retention uplift">
              {LTV_SEGMENTS.map((segment) => (
                <div key={segment.key} data-segment={segment.key} />
              ))}
            </div>
            <span className="type-body-md">With Zing</span>
          </div>
        </div>

        <ul className="flex gap-6">
          {LTV_SEGMENTS.map((segment) => (
            <li key={segment.key} className="type-body-sm text-theme-text-secondary">{segment.label}</li>
          ))}
        </ul>
      </figure>
    </section>
  );
};
