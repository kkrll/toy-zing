// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

export const CTA = () => {
  return (
    <section className="flex flex-col gap-6 rounded-3xl bg-theme-bg-100 px-4 py-8 md:gap-8 md:px-14 md:py-16">
      <div className="flex flex-col gap-3">
        <h2 className="type-heading-h2 text-balance">
          The next standard of member experience starts here
        </h2>
        <p className="type-body-lg text-theme-text-secondary">
          Book a demo and see how AI coaching turns every membership into a
          personally coached journey
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={DEMO_CALENDAR_URL}
          className="type-body-lg-semi min-w-0 rounded-2xl bg-theme-fg-100 px-4 py-3 text-center text-theme-bg-100 sm:min-w-3xs"
        >
          Book a demo
        </a>
        <button
          type="button"
          className="type-body-lg-semi min-w-0 rounded-2xl bg-theme-bg-200 px-4 py-3 text-center sm:min-w-3xs"
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
