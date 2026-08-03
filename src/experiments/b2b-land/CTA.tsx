// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";
const CTA_BG = "/img/Member%20page/TV.png";

export const CTA = () => {
  return (
    <section
      className="flex flex-col min-h-[60vh] gap-6 overflow-hidden rounded-3xl bg-cover bg-right-bottom bg-no-repeat px-4 py-8 md:gap-14 md:px-14 md:py-28"
      style={{ backgroundImage: `url('${CTA_BG}')` }}
    >
      <div className="mx-auto flex w-full max-w-screen-xl px-16 flex-col gap-6 md:gap-14">
        <div className="flex flex-col gap-3">
          <h2 className="type-heading-h1 text-balance max-w-xl">
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

        <div className="h-px w-[240px] bg-theme-bg-300/70"></div>
        {/* FAQ (tbd) */}
        <div className="flex flex-col gap-2">
          <h3 className="type-heading-h3">FAQ</h3>
          <p className="type-body-md text-theme-text-secondary">tbd</p>
        </div>
      </div>
    </section>
  );
};
