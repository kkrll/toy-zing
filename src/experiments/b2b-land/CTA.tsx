import { useEffect, useRef } from "react";

// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";
const CTA_BG = "/img/Member%20page/TV.png";

/** Scroll distance from the page bottom over which the CTA expands inset → full bleed */
const EXPAND_SCROLL_PX = 240;

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export const CTA = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    let ticking = false;

    const update = () => {
      ticking = false;

      const distanceFromBottom = Math.max(
        0,
        document.documentElement.scrollHeight -
          window.scrollY -
          window.innerHeight,
      );
      // 0 = inset (away from end), 1 = full bleed (at page end) — inverse of HeroV2.
      const progress =
        1 - Math.min(1, Math.max(0, distanceFromBottom / EXPAND_SCROLL_PX));

      const fullW = wrap.clientWidth;
      const isSm = window.matchMedia("(min-width: 640px)").matches;
      const inset = isSm ? 16 : 8;

      const insetX = lerp(inset, 0, progress);
      const insetY = lerp(inset, 0, progress);
      const radius = lerp(24, 0, progress);
      const width = fullW - insetX * 2;

      card.style.width = `${width}px`;
      card.style.marginTop = `${insetY}px`;
      card.style.marginBottom = `${insetY}px`;
      card.style.borderRadius = `${radius}px`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(update);
    };

    const onResize = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="flex w-full justify-center">
      <section
        ref={cardRef}
        className="flex min-h-[60vh] flex-col gap-6 overflow-hidden bg-cover bg-right-bottom bg-no-repeat px-4 py-16 md:gap-14 md:px-14 md:py-32"
        style={{
          backgroundImage: `url('${CTA_BG}')`,
          width: "calc(100% - 16px)",
          marginTop: 8,
          marginBottom: 8,
          borderRadius: 24,
        }}
      >
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 md:gap-14">
          <div className="flex flex-col gap-3">
            <h2 className="type-heading-h1 max-w-xl text-balance">
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

          <div className="mt-4 h-px w-60 bg-theme-bg-300/70 md:mt-0" />
          {/* FAQ (tbd) */}
          <div className="flex flex-col gap-2">
            <h3 className="type-heading-h3">FAQ</h3>
            <p className="type-body-md text-theme-text-secondary">tbd</p>
          </div>
        </div>
      </section>
    </div>
  );
};
