// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

export const CTA = () => {
  return (
    <section className="bg-theme-bg-100 rounded-3xl px-14 py-16 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="type-heading-h2">The next standard of member experience starts here</h2>
        <p className="type-body-lg text-theme-text-secondary">
          Book a demo and see how AI coaching turns every membership into a
          personally coached journey
        </p>
      </div>

      <div className="flex gap-4">
        <a
          href={DEMO_CALENDAR_URL}
          className="px-4 py-3 bg-theme-fg-100 text-theme-bg-100 type-body-lg-semi rounded-2xl min-w-3xs"
        >
          Book a demo
        </a>
        <button
          type="button"
          className="px-4 py-3 bg-theme-bg-200 type-body-lg-semi rounded-2xl min-w-3xs"
        >
          Experience Zing Coach
        </button>
      </div>

      {/* FAQ (tbd) */}
      <div className="flex flex-col gap-2">
        <h3 className="type-heading-h3">FAQ</h3>
        <p className="type-body-md text-theme-text-secondary">tbd</p>
      </div>
    </section>
  );
};
