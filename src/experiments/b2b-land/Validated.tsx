const METRICS = [
  { value: "42%", label: "3-month retention among AI-coached members" },
  { value: "61%", label: "say they can’t train without Zing" },
  { value: "88%", label: "would recommend it" },
] as const;

const BG = "/img/Member%20page/nysc-bg.png";

export const Validated = () => {
  return (
    <section
      id="validated"
      className="relative mx-auto flex max-w-screen-xl flex-col gap-10 px-4 py-16 md:gap-18 md:px-14 md:py-32"
    >
      <h2 className="type-heading-h1">Validated in the real world</h2>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 border-b pb-8">
        {METRICS.map((metric) => (
          <li key={metric.value} className="flex flex-col gap-1">
            <strong className="type-counter-md">{metric.value}</strong>
            <span className="type-body-lg text-balance text-theme-text-secondary">
              {metric.label}
            </span>
          </li>
        ))}
        <div className="flex items-center py-2">
          <p className="type-heading-h3 text-theme-text-secondary">
            Internal Zing&apos;s <br className="hidden md:block" /> research
          </p>
        </div>
      </ul>
      <div
        className="text-theme-text-primary-inv relative z-10 grid grid-cols-1 overflow-hidden rounded-3xl object-cover object-center md:grid-cols-2 md:gap-24"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="flex flex-col gap-8 px-4 py-8 md:gap-12 md:px-14 md:py-16">
          <div className="flex flex-col gap-2 mb-16">
            <svg
              className="mb-2 w-24"
              viewBox="0 0 240 113"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M170.327 56.9516L143.991 42.6334C138.563 39.7685 137.129 37.3844 137.129 30.8596V20.2013C137.129 15.2731 139.521 12.2476 144.628 12.2476H154.686C159.793 12.2476 162.031 15.2731 162.031 20.2013V30.1161L159.763 38.0114H177.357V15.5866C177.357 4.92822 172.887 0 161.878 0H136.815C125.805 0 121.489 4.92822 121.489 15.5866V38.1718C121.489 44.3758 123.881 49.1437 129.631 52.3294L156.128 66.4872C161.556 69.5127 162.99 71.8966 162.99 78.414V91.1429C162.99 96.0711 160.597 99.0966 155.484 99.0966H143.669C138.724 99.0966 136.325 96.0711 136.325 91.1429V82.2341L138.878 73.3255H120.999V95.7502C120.999 106.409 125.307 111.337 136.325 111.337H163.304C174.314 111.337 178.784 106.409 178.784 95.7502V70.9343C178.784 64.7302 176.07 59.9625 170.327 56.9369"
                fill="currentColor"
              />
              <path
                d="M95.9795 73.2961V102.443L100.764 111.359H75.3789L80.3315 102.443V76.8027L101.876 8.9159L99.4837 0.00720215H124.386L117.531 8.9159L95.9795 73.2961Z"
                fill="currentColor"
              />
              <path
                d="M62.4158 39.6374L62.4233 111.352H46.6216L19.4812 25.137V102.443L24.2728 111.352H0.00731551L4.95261 102.443L4.94528 8.90898L0 0.00756836H29.6862L27.777 8.90898L48.0482 75.8773V0.00756836H49.9649L61.9405 38.1139L62.4158 39.6374Z"
                fill="currentColor"
              />
              <path
                d="M84.9112 42.2908L77.2812 67.0631L57.1707 2.98902L56.249 0.0291748H75.5985L73.0455 8.93058L84.9112 42.2908Z"
                fill="currentColor"
              />
              <path
                d="M224.513 0.00720215H198.017C186.999 0.00720215 182.69 4.93542 182.69 15.5938V95.7647C182.69 106.423 186.999 111.351 198.017 111.351H224.513C235.524 111.351 239.994 106.423 239.994 95.7647V73.34H222.414L224.667 81.2061V91.1572C224.667 96.0856 222.275 99.1109 217.169 99.1109H205.676C200.57 99.1109 198.331 96.0856 198.331 91.1572V20.2085C198.331 15.2803 200.562 12.2548 205.676 12.2548H217.169C222.275 12.2548 224.667 15.2803 224.667 20.2085V30.1596L222.414 38.026H239.994V15.6011C239.994 4.93542 235.524 0.00720215 224.513 0.00720215Z"
                fill="currentColor"
              />
            </svg>
            <h3 className="type-heading-h2 text-balance">
              How one of America&apos;s largest gym operators scaled coaching
              beyond PT capacity
            </h3>
          </div>
          <dl className="flex flex-col gap-6 md:gap-12">
            <div className="flex flex-col gap-1">
              <dt className="type-heading-h3">New York Sports Club</dt>
              <dd className="type-body-md text-theme-text-secondary-inv">
                Partner
              </dd>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-1">
                <dt className="type-heading-h3">Live</dt>
                <dd className="type-body-md text-theme-text-secondary-inv">
                  since April, 2026
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="type-heading-h3">2.3x / week</dt>
                <dd className="type-body-md text-theme-text-secondary-inv">
                  average workout per user
                </dd>
              </div>
            </div>
            <div>
              <div className="aspect-square h-12 bg-theme-bg-100">photo</div>
              <blockquote className="flex flex-col gap-2">
                <p className="type-heading-h3 text-balance">
                  “I tried to trick it a million ways, and it always comes back
                  with what’s right for you.”
                </p>
                <footer className="type-body-md text-theme-text-secondary-inv">
                  Bill McMenamy, CEO, NYSC
                </footer>
              </blockquote>
            </div>
          </dl>
        </div>
        <div className="flex min-h-56 items-center justify-center bg-theme-bg-400 md:min-h-0">
          video
        </div>
      </div>
    </section>
  );
};
