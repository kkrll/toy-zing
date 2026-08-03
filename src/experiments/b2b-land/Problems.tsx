"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ProblemsFlow } from "./ProblemsFlow";

const Quote = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-2 w-fit", className)}>
      <blockquote className="flex flex-col type-heading-h3 text-theme-text-secondary italic p-8">
        <p>The problem isn't retention.</p>
        <p>It’s coaching at scale.</p>
        <p className="text-balance">
          The highest rate of churn occurs before habits have formed…
        </p>
        <footer className="type-body-md text-theme-text-primary mt-4">
          — Will Orr, CEO The Gym Group
        </footer>
      </blockquote>
    </div>
  );
};

const Graph = ({ version }: { version: "v1" | "v2" }) => {
  const [active, setActive] = useState<"coached" | "uncoached">("uncoached");

  if (version === "v1") {
    return (
      <div className="relative flex w-full flex-col gap-6 p-4 md:flex-row md:gap-4 md:p-12">
        <div className="w-full overflow-x-auto">
          <ProblemsFlow />
        </div>
        <div className="flex flex-col gap-6 px-2 md:contents">
          <div
            className={cn(
              "z-10 max-w-2xs text-theme-text-orchid md:absolute md:left-16 md:top-44 md:ml-6",
            )}
          >
            <p className="type-heading-h3 text-balance pb-2">
              Personal training doesn&apos;t scale.
            </p>
            <p className="type-body-lg-semi opacity-50">
              That leaves most members without guidance, motivation or
              accountability.
            </p>
          </div>
          <div
            className={cn(
              "z-10 max-w-xs text-theme-text-orchid md:absolute md:bottom-16 md:left-[52%] md:ml-6 md:max-w-[320px]",
            )}
          >
            <p className="type-heading-h3 text-balance pb-2">
              50% of new members leave within 6 months
            </p>
            <p className="type-body-lg-semi opacity-50">
              Without guidance, motivation fades before habits become routines
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-theme-bg-100 my-2 mx-12 p-1 rounded-3xl">
        <div className="relative h-full w-full overflow-hidden flex rounded-[20px]">
          <div
            className="pointer-events-none absolute h-full inset-y-0 left-0 right-1/2 flex text-theme-bg-cadet-100 transition-transform duration-300 ease-in-out"
            style={{
              transform: active === "coached" ? "translateX(100%)" : "none",
            }}
          >
            <svg
              className="relative z-10 -mr-px h-full shrink-0 transition-[width] duration-300 ease-in-out"
              style={{ width: active === "coached" ? 40 : 0 }}
              viewBox="0 0 34 100"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M0.398857 5.73093C-0.875711 3.07558 1.05954 0 4.00495 0H34V50V100H4.00495C1.05954 100 -0.875713 96.9244 0.398854 94.2691L17.4938 58.6546C20.1198 53.1837 20.1198 46.8163 17.4938 41.3454L0.398857 5.73093Z"
                fill="currentColor"
              />
            </svg>
            <div className="h-full w-full bg-theme-bg-cadet-100" />
            <svg
              className="relative z-10 -ml-px h-full shrink-0 transition-[width] duration-300 ease-in-out"
              style={{ width: active === "uncoached" ? 40 : 0 }}
              viewBox="0 0 34 100"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M0 0H9.48306C11.0214 0 12.4235 0.882214 13.0892 2.26908L31.8458 41.3454C34.4718 46.8163 34.4718 53.1837 31.8458 58.6546L13.0892 97.7309C12.4235 99.1178 11.0214 100 9.48306 100H0V50V0Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <button
            type="button"
            onClick={() => setActive("uncoached")}
            className={cn(
              "relative z-10 flex-1 rounded-l-[20px] pl-4 pr-8 py-4 text-left",
              active === "uncoached" ? "" : "text-theme-text-secondary",
            )}
          >
            <p className="type-heading-h3 mb-0.5">
              Personal training doesn't scale.
            </p>
            <p className="type-body-lg opacity-50">
              That leaves most members without guidance, motivation or
              accountability.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setActive("coached")}
            className={cn(
              "relative z-10 flex-1 rounded-r-[20px] pl-20 pr-4 py-4 text-left",
              active === "coached" ? "" : "text-theme-text-secondary",
            )}
          >
            <p className="type-heading-h3 mb-0.5">
              50% of new members leave within 6 months
            </p>
            <p className="type-body-lg opacity-75">
              Without guidance, motivation fades before habits become routines
            </p>
          </button>
        </div>
      </div>
      <div className="relative w-full h-60 flex">
        <div className="absolute inset-0 h-full flex-1 -mr-px">
          <div className="relative flex h-full flex-1 -mr-px">
            <svg
              viewBox="0 0 66 100"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                [
                  "h-full flex-1 -mr-px  transition-color duration-300 ease-in-out text-orchid-200",
                ],
                // active === "uncoached" ? 'text-orchid-100' : 'text-orchid-200',
              )}
            >
              <path
                d="M0 3.05176e-05H66V45C22 45 34 3.05176e-05 0 3.05176e-05Z"
                fill={active === "uncoached" ? "none" : "currentColor"}
              />
              <path
                d="M6.10352e-05 0C35 0 21.5 45.0001 66.0001 45.0001V96.0001C56.0001 96.0001 8 95.0001 6.10352e-05 95.0001V0Z"
                fill={active === "uncoached" ? "currentColor" : "none"}
              />
              <path d="M0 95C9 95.0001 56 96 66 96V100H0V95Z" fill="#6013AB" />
            </svg>
            <svg
              viewBox="0 0 66 100"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn([
                "h-full w-[10%] transition-color duration-300 ease-in-out text-orchid-200",
              ])}
            >
              <rect
                width="66"
                height="45"
                fill={active === "uncoached" ? "none" : "currentColor"}
              />
              <rect
                y="45"
                width="66"
                height="51"
                fill={active === "uncoached" ? "currentColor" : "none"}
              />
              <rect y="96" width="66" height="4" fill="#6013AB" />
            </svg>
          </div>
          <p
            className={cn(
              "absolute inset-x-0 top-12 z-10 ml-14 max-w-2xs mt-4 transition-[opacity,translate] duration-200 type-heading-h2 text-theme-text-orchid",
              active === "coached"
                ? "opacity-0 -translate-y-24"
                : "opacity-100 translate-y-0",
            )}
          >
            Just 5% members work with a personal trainer
          </p>
        </div>

        <p
          className={cn(
            "absolute inset-x-0 top-12 z-10 ml-14 max-w-2xs mt-4 transition-[opacity,translate] duration-200 type-heading-h2 text-theme-text-orchid",
            active === "uncoached"
              ? "opacity-0 translate-y-24"
              : "opacity-100 translate-y-0",
          )}
        >
          Without PT's attention members churn
        </p>
      </div>
    </>
  );
};

export const Problems = () => {
  return (
    <section className="flex flex-col pt-10 md:rounded-4xl md:pt-16">
      <div className="flex flex-col gap-4 px-4 md:px-14">
        <h2 className="type-heading-h1 text-balance text-center mb-24">
          95% of your members <br className="hidden sm:block" />
          never receive coaching
        </h2>

        {/*<Quote className="mt-10 bg-theme-bg-100  rounded-4xl"/>*/}
      </div>
      <div className="w-full flex flex-col gap-6 overflow-hidden rounded-3xl bg-theme-bg-200 ">
        <Graph version="v1" />
      </div>
    </section>
  );
};
