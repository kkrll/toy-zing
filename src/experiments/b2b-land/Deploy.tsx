"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const DEPLOYMENT_OPTIONS = [
  {
    title: "Mobile SDK",
    tagline: "Full control over UX inside your existing product.",
    description:
      "Built for platforms that want AI coaching features without rebuilding their app.",
    features: [
      "Native iOS & Android SDK",
      "White-label UI components",
      "API integrations",
      "Full control over UX",
      "Connect to member data, schedules, and club systems",
    ],
    idealFor:
      "Health apps, fitness platforms, and insurers who want AI features inside their existing user experience.",
    cta: "Explore SDK →",
    image: "/img/Member%20page/card-bg-1.png",
    mock: "/img/Member%20page/mock-sdk.png",
    badge: "/img/Member%20page/logos/mock-branded.png",
  },
  {
    title: "Branded Experience",
    tagline: "Tailor Zing Coach app experience to your brand.",
    description:
      "Built for gym operators who want complete control over the member experience.",
    features: [
      "Native iOS & Android SDK",
      "White-label UI components",
      "API integrations",
      "Full control over UX",
      "Connect to member data, schedules, and club systems",
    ],
    idealFor:
      "Gyms, influencers, and wellness providers who want to launch fast without technical overhead.",
    cta: "Explore Branded Experience →",
    image: "/img/Member%20page/nysc-bg.png",
    mock: "/img/Member%20page/mock-branded.png",
    badge: "/img/Member%20page/logos/mock-sdk.svg",
  },
  {
    title: "White-label App",
    tagline: "Your brand. Our technology. Zero maintenance.",
    description:
      "Launch a fully branded AI coaching app without building one yourself.",
    features: [
      "Fully branded application",
      "Custom navigation",
      "Zing maintains infrastructure",
      "GDPR & security",
      "Enterprise SLA",
    ],
    idealFor:
      "Enterprise gym chains, franchises, and corporate wellness programs needing a fully owned app experience.",
    cta: "Explore White-label →",
    image: "/img/Member%20page/card-bg-2.png",
    mock: "/img/Member%20page/mock-sdk.png",
    badge: "/img/Member%20page/logos/mock-branded.png",
  },
] as const;

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    fill="none"
    className={cn("size-4 shrink-0", className)}
  >
    <path
      d="M3.5 8.5 6.5 11.5 12.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeployPreview = ({
  option,
  className,
  tag,
}: {
  option: (typeof DEPLOYMENT_OPTIONS)[number];
  className?: string;
  tag?: boolean;
}) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-3xl bg-cover bg-center",
      className,
    )}
    style={{ backgroundImage: `url('${option.image}')` }}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-theme-fg-100/40"
    />
    <div
      className={cn(
        "relative z-10 flex h-full flex-col items-center justify-end px-6 pt-6 md:p-12",
        tag && "pb-6",
      )}
    >
      <div className="relative min-h-0 w-full flex-1">
        <img
          src={option.mock}
          alt=""
          className="absolute inset-0 h-full w-full object-contain object-bottom"
        />
        <img
          src={option.badge}
          alt=""
          className="absolute bottom-4 left-1/4 h-16 w-auto -translate-x-1/2 rounded-3xl border-4 border-theme-bg-100/20 object-contain backdrop-blur-3xl md:bottom-8 md:h-24 md:rounded-4xl"
        />
      </div>
      {tag && (
        <p className="type-heading-h3 max-w-sm border-t border-theme-bg-100/20 pt-3 text-balance text-center text-theme-text-primary-inv md:pt-4">
          {option.tagline}
        </p>
      )}
    </div>
  </div>
);

export const Deploy = () => {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = DEPLOYMENT_OPTIONS[selectedIndex];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const syncIndex = () => {
      // Desktop stays an accordion — only sync from the mobile snap scroller.
      if (window.matchMedia("(min-width: 768px)").matches) return;

      const scrollerLeft = el.getBoundingClientRect().left;
      const paddingLeft = Number.parseFloat(getComputedStyle(el).paddingLeft);
      const target = scrollerLeft + paddingLeft;

      let closest = 0;
      let closestDist = Infinity;

      for (let i = 0; i < el.children.length; i++) {
        const card = el.children[i] as HTMLElement;
        const dist = Math.abs(card.getBoundingClientRect().left - target);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      }

      setSelectedIndex(closest);
    };

    syncIndex();
    el.addEventListener("scroll", syncIndex, { passive: true });
    el.addEventListener("scrollend", syncIndex);
    window.addEventListener("resize", syncIndex);

    return () => {
      el.removeEventListener("scroll", syncIndex);
      el.removeEventListener("scrollend", syncIndex);
      window.removeEventListener("resize", syncIndex);
    };
  }, []);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(DEPLOYMENT_OPTIONS.length - 1, index));
    setSelectedIndex(next);

    if (window.matchMedia("(min-width: 768px)").matches) return;

    const card = scrollerRef.current?.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <section className="bg-theme-fg-200 py-16 text-theme-text-primary-inv md:px-14 md:py-32">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 overflow-hidden md:gap-12">
        <div className="flex flex-col gap-3 px-4 md:px-0">
          <h2 className="type-heading-h1 text-balance">
            One AI platform. Three ways to launch.
          </h2>
          <p className="type-body-lg max-w-xl text-theme-text-secondary-inv">
            Deploy Zing the way that best fits your business – from a branded
            experience in days to a fully embedded SDK or a complete white-label
            application.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6 md:px-0">
          <div className="relative min-w-0">
            <ul
              ref={scrollerRef}
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-2 scroll-px-4 md:flex-col md:gap-2 md:overflow-visible md:px-0 md:pb-0 md:scroll-px-0"
            >
              {DEPLOYMENT_OPTIONS.map((option, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <li
                    key={option.title}
                    className="w-[min(80vw,22rem)] shrink-0 snap-start md:w-full"
                  >
                    {/* Mobile: always-open card */}
                    <article className="flex h-full w-full flex-col gap-3 rounded-3xl border border-theme-fg-400 bg-theme-fg-300/50 px-4 py-4 text-theme-text-primary-inv md:hidden">
                      <DeployPreview option={option} className="h-56 w-full" />
                      <span className="type-body-lg-semi">{option.title}</span>
                      <p className="type-body-md text-theme-text-secondary-inv">
                        {option.description}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {option.features.map((feature) => (
                          <li
                            key={feature}
                            className="type-body-md flex items-start gap-2"
                          >
                            <CheckIcon className="mt-0.5 text-theme-text-secondary-inv" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="type-body-sm text-theme-text-secondary-inv">
                        <span className="type-body-sm-medium text-theme-text-primary-inv">
                          Ideal for:
                        </span>{" "}
                        {option.idealFor}
                      </p>
                      <span className="type-body-md-semi mt-auto inline-flex self-start rounded-2xl bg-theme-bg-100 px-4 py-3 text-theme-text-primary">
                        {option.cta}
                      </span>
                    </article>

                    {/* Desktop: accordion */}
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-expanded={isSelected}
                      className={cn(
                        "hidden w-full flex-col gap-2 rounded-3xl border px-5 py-4 text-left transition-colors duration-200 md:flex",
                        isSelected
                          ? "bg-theme-bg-main-section text-theme-text-primary"
                          : "cursor-pointer border-theme-fg-400 bg-theme-fg-300/50 text-theme-text-primary-inv hover:bg-theme-fg-300",
                      )}
                    >
                      <span className="type-body-lg-semi">{option.title}</span>
                      <p
                        className={cn(
                          "type-body-md",
                          isSelected
                            ? "text-theme-text-secondary"
                            : "text-theme-text-secondary-inv",
                        )}
                      >
                        {option.description}
                      </p>

                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                          isSelected
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="flex flex-col gap-4 pt-2">
                            <ul className="flex flex-col gap-2">
                              {option.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="type-body-md flex items-start gap-2"
                                >
                                  <CheckIcon className="mt-0.5 text-theme-text-secondary" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="type-body-sm text-theme-text-secondary">
                              <span className="type-body-sm-medium text-theme-text-primary">
                                Ideal for:
                              </span>{" "}
                              {option.idealFor}
                            </p>
                            <span className="type-body-md-semi mt-1 inline-flex self-start rounded-2xl bg-theme-fg-100 px-4 py-3 text-theme-bg-100">
                              {option.cta}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-linear-to-r from-theme-fg-200 to-transparent md:hidden"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-linear-to-l from-theme-fg-200 to-transparent md:hidden"
            />
          </div>

          <DeployPreview
            option={selected}
            tag
            className="hidden h-80 w-full rounded-4xl md:sticky md:top-28 md:block md:h-[35rem]"
          />
        </div>
      </div>
    </section>
  );
};
