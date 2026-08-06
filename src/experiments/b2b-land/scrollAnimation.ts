"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Which step of a pinned section the page has reached.
 *
 * Scroll picks the step and the step animates on its own clock, which is the whole point
 * of the split. Driving frames straight off scroll position reads beautifully on a
 * touchpad and badly on a mouse: a wheel arrives in ~100px notches, so any beat shorter
 * than a notch or two plays as a single lurch no matter how it's eased, and the motion
 * stops dead between notches. Selecting a state gives that up — there's no scrubbing back
 * and forth through a beat — in exchange for motion that's identical on a wheel, a
 * touchpad, a keyboard or a click.
 *
 * `thresholds` are fractions of the pinned scroll, where 0 is the moment the runway pins
 * and 1 the moment it releases, matching how the snap offsets in the stylesheets are
 * written. The returned step counts how many have been passed. Pass a stable array.
 */
export const useScrollPhase = (thresholds: readonly number[]) => {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    let frame = 0;

    const sync = () => {
      frame = 0;

      const { top, height } = runway.getBoundingClientRect();
      const travel = height - window.innerHeight;
      const progress = travel > 0 ? -top / travel : 0;

      // React bails out when the count is unchanged, so this is a no-op most frames.
      setStep(thresholds.filter((threshold) => progress >= threshold).length);
    };

    // One rect read per frame, and only while the page is actually moving.
    const schedule = () => {
      frame ||= requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [thresholds]);

  return { runwayRef, step };
};

/**
 * Whether the visitor asked for less motion. Both pinned sections answer it by rendering
 * their plain counterpart instead: the runway exists only to pace an animation, so with
 * no animation to pace it would be dead scroll.
 */
export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
};

/**
 * Opts the document into snapping while a pinned section is mounted. `proximity` means
 * only elements that declare `scroll-snap-align` ever pull the scroll, so the rest of the
 * page is untouched and scrolling is never refused.
 *
 * `scroll-behavior: smooth` is paired with it so proximity corrections ease into the rest
 * instead of jumping — CSS still won't let us pick the curve (that's the UA), but it's the
 * only knobs scroll-snap exposes. Marker clicks already pass `behavior: "smooth"`.
 */
export const useProximitySnap = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const previousSnap = root.style.scrollSnapType;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollSnapType = "y proximity";
    root.style.scrollBehavior = "smooth";

    return () => {
      root.style.scrollSnapType = previousSnap;
      root.style.scrollBehavior = previousBehavior;
    };
  }, [enabled]);
};

/**
 * Scrolls so a snap marker sits at the top of the scrollport — exactly where
 * `scroll-snap-align: start` would put it. Reading the position off the marker keeps
 * the stylesheet the single source of truth for where each step lives.
 */
export const scrollToMarker = (marker: Element | null) => {
  if (!marker) return;

  window.scrollTo({
    top: window.scrollY + marker.getBoundingClientRect().top,
    behavior: "smooth",
  });
};
