"use client";

import { useEffect, useState } from "react";
import { AidenV2 } from "./AidenV2";
import { CTA } from "./CTA";
import { Deploy } from "./Deploy";
import { Experience } from "./Experience";
import { Footer } from "./Footer";
import { HeroV1 } from "./HeroV1";
import { HeroV2 } from "./HeroV2";
import { Infrastructure } from "./Infrastructure";
import { Integration } from "./Integration";
import { Navigation } from "./Navigation";
import { Stories } from "./Stories";
import { Validated } from "./Validated";
import { Value } from "./Value";
import { ProblemsV2 } from "./ProblemsV2";
import { ProblemsV3 } from "./ProblemsV3";

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

/**
 * The colour the browser should paint its own chrome — on iOS, the strip behind the
 * status bar.
 *
 * Left alone, Safari falls back to the document background, which is `<main>`'s white,
 * while the hero directly under it starts at bg-200. The result is a white band with a
 * seam ruled straight across the top of the screen. The hero's tint comes from a
 * multiply overlay whose own gradients are transparent at the top, so what shows there
 * is the overlay's base colour and nothing else.
 *
 * Read off the token rather than written as a hex: `theme-color` is an HTML attribute
 * and cannot hold a `var()`, so this is the only way to keep the stylesheet the one
 * place the colour is defined. Reading it needs the light-scheme variables to already be
 * on the root, which is why this is a second effect rather than part of that one —
 * effects run in call order.
 */
const useTopBackground = () => {
  useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue("--ds-theme-bg-200")
      .trim();

    // A custom property's computed value has its `var()`s substituted, so this is a
    // literal colour — but it is a token stream by type, and a malformed one would be
    // handed to the browser as chrome paint. Only ship it if it reads as a colour.
    if (!/^(#|rgb|color\()/.test(value)) return;

    // Written to the document rather than rendered through `next/head`, for the same
    // reason `useForceLightScheme` writes its variables: the value isn't known until
    // the page has computed styles, and routing it back through render to get it into
    // the markup is a cascade to produce a tag React would only hand to the DOM anyway.
    // Adopts an existing tag if the document already has one, so this restores on the
    // way out instead of deleting someone else's.
    const existing = document.head.querySelector('meta[name="theme-color"]');
    const meta = existing ?? document.createElement("meta");
    const previous = existing?.getAttribute("content") ?? null;

    meta.setAttribute("name", "theme-color");
    meta.setAttribute("content", value);
    if (!existing) document.head.appendChild(meta);

    return () => {
      if (!existing) meta.remove();
      else if (previous !== null) meta.setAttribute("content", previous);
    };
  }, []);
};

const B2BLand = () => {
  useForceLightScheme();
  useTopBackground();
  const [heroVersion, setHeroVersion] = useState<1 | 2>(2);

  return (
    <main className="bg-theme-bg-100">
      <Navigation setHeroVersion={setHeroVersion} heroVersion={heroVersion} />
      {heroVersion === 2 && (
        <div className="w-full ">
          <HeroV2 />
        </div>
      )}
      <Stories />
      {heroVersion === 1 && <HeroV1 />}
      {/*<ProblemsV2 />*/}
      <ProblemsV3 />
      {/*<Infrastructure />*/}
      <Value />
      <Validated />
      <Experience />
      <AidenV2 />
      <Deploy />
      <Integration />
      <CTA />
      <Footer />
    </main>
  );
};

export default B2BLand;
