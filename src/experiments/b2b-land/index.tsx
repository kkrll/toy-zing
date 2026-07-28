"use client";

import { useEffect, useState } from "react";
import { Aiden } from "./Aiden";
import { CTA } from "./CTA";
import { Deploy } from "./Deploy";
import { Experience } from "./Experience";
import { HeroV1 } from "./HeroV1";
import { HeroV2 } from "./HeroV2";
import { Infrastructure } from "./Infrastructure";
import { Integration } from "./Integration";
import { Navigation } from "./Navigation";
import { Problems } from "./Problems";
import { Validated } from "./Validated";
import { Value } from "./Value";

/** Light theme tokens — mirrors :root in semantic-colors.css */
const LIGHT_SCHEME_VARS: Record<string, string> = {
  "color-scheme": "light",
  "--ds-theme-fg-100": "var(--ds-color-black-100)",
  "--ds-theme-fg-200": "var(--ds-color-grey-900)",
  "--ds-theme-fg-300": "var(--ds-color-grey-800)",
  "--ds-theme-fg-400": "var(--ds-color-grey-700)",
  "--ds-theme-fg-500": "var(--ds-color-grey-600)",
  "--ds-theme-fg-600": "var(--ds-color-grey-500)",
  "--ds-theme-bg-100": "var(--ds-color-white-100)",
  "--ds-theme-bg-200": "var(--ds-color-grey-100)",
  "--ds-theme-bg-300": "var(--ds-color-grey-200)",
  "--ds-theme-bg-400": "var(--ds-color-grey-300)",
  "--ds-theme-bg-500": "var(--ds-color-grey-400)",
  "--ds-theme-bg-200-transparent": "#f4f6fa00",
  "--ds-theme-bg-overlay-100": "var(--ds-color-black-40)",
  "--ds-theme-bg-cadet-100": "var(--ds-color-space-cadet-100)",
  "--ds-theme-bg-orchid-100": "var(--ds-color-orchid-100)",
  "--ds-theme-bg-orchid-100-transparent": "#f4eafe00",
  "--ds-theme-bg-blue-100": "var(--ds-color-blue-100)",
  "--ds-theme-bg-blue-500": "var(--ds-color-blue-600)",
  "--ds-theme-bg-green-100": "var(--ds-color-green-100)",
  "--ds-theme-bg-red-100": "var(--ds-color-marsala-100)",
  "--ds-theme-text-primary": "var(--ds-theme-fg-100)",
  "--ds-theme-text-secondary": "var(--ds-theme-fg-500)",
  "--ds-theme-text-disabled": "var(--ds-theme-bg-500)",
  "--ds-theme-text-primary-inv": "var(--ds-theme-bg-100)",
  "--ds-theme-text-secondary-inv": "var(--ds-theme-bg-500)",
  "--ds-theme-text-orchid": "var(--ds-color-orchid-600)",
  "--ds-theme-text-green": "var(--ds-color-green-500)",
  "--ds-theme-text-red": "var(--ds-color-marsala-500)",
  "--ds-theme-text-blue": "var(--ds-color-blue-700)",
  "--ds-theme-text-cadet": "var(--ds-color-space-cadet-600)",
  "--ds-theme-ai-insight-bg-underlayer": "var(--ds-color-white-100)",
  "--ds-theme-ai-insight-outline": "var(--ds-color-white-100)",
  "--ds-theme-cmd-k-modal-bg": "var(--ds-theme-bg-200)",
  "--background": "var(--ds-theme-bg-100)",
  "--foreground": "var(--ds-theme-text-primary)",
};

const useForceLightScheme = () => {
  useEffect(() => {
    const root = document.documentElement;

    for (const [prop, value] of Object.entries(LIGHT_SCHEME_VARS)) {
      root.style.setProperty(prop, value);
    }

    return () => {
      for (const prop of Object.keys(LIGHT_SCHEME_VARS)) {
        root.style.removeProperty(prop);
      }
    };
  }, []);
};

const B2BLand = () => {
  useForceLightScheme();
  const [heroVersion, setHeroVersion] = useState<1 | 2>(2);

  return (
    <>
      <Navigation setHeroVersion={setHeroVersion} heroVersion={heroVersion} />
      {heroVersion === 2 && (
        <div className="w-full p-2 sm:p-4">
          <HeroV2 />
        </div>
      )}
      <main className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 p-2 sm:p-4">
        {heroVersion === 1 && <HeroV1 />}
        <Problems />
        <Infrastructure />
        <Value />
        <Validated />
        <Experience />
        <Aiden />
        <Deploy />
        <Integration />
        <CTA />
      </main>
    </>
  );
};

export default B2BLand;
