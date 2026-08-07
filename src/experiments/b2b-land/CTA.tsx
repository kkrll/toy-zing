// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

export const CTA = () => {
  return (
    <section className="flex min-h-[60vh] flex-col gap-6 bg-theme-fg-200 px-4 py-16 text-theme-text-primary-inv md:gap-14 md:px-14 md:py-32">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 md:gap-14">
        <div className="flex flex-col gap-3">
          <h2 className="type-heading-h1 max-w-xl text-balance">
            The next standard of member experience starts here
          </h2>
          <p className="type-body-lg text-theme-text-secondary-inv">
            Book a demo and see how AI coaching turns every membership into a
            personally coached journey
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={DEMO_CALENDAR_URL}
            className="type-body-lg-semi min-w-0 rounded-2xl bg-theme-bg-100 px-4 py-3 text-center text-theme-text-primary sm:min-w-3xs"
          >
            Book a demo
          </a>
          <button
            type="button"
            className="type-body-lg-semi min-w-0 rounded-2xl bg-theme-fg-300 px-4 py-3 text-center text-theme-text-primary-inv sm:min-w-3xs"
          >
            Experience Zing Coach
          </button>
        </div>

        <div className="mt-4 h-px w-60 bg-theme-bg-100/20 md:mt-0" />
        {/* FAQ (tbd) */}
        <div className="flex flex-col gap-2">
          <h3 className="type-heading-h3">FAQ</h3>
          <p className="type-body-md text-theme-text-secondary-inv">tbd</p>
        </div>
      </div>
    </section>
  );
};
