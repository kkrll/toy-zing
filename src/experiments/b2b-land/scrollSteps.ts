"use client";

import { useEffect, useRef, useState } from "react";

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const range = (value: number, [from, to]: readonly [number, number]) =>
  clamp01((value - from) / (to - from));

export const smoothstep = (t: number) => t * t * (3 - 2 * t);

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

type ScrollStepOptions = {
  /** Progress down the runway at which each step takes over. Index 0 is unused. */
  enter: readonly number[];
  /**
   * Progress each step gives way below. Sitting under the matching `enter` value
   * means a scroll that stops on a boundary can't flutter between two steps.
   */
  exit: readonly number[];
  /**
   * Hold at least this step once the section's top passes `entryFraction` of the
   * viewport, so a bare first state is never somewhere you can come to rest.
   */
  entryFloor?: number;
  entryFraction?: number;
};

/**
 * Maps scroll position over a pinned runway onto a discrete step index. Attach
 * `runwayRef` to the tall element the sticky content lives in.
 */
export const useScrollStep = ({
  enter,
  exit,
  entryFloor,
  entryFraction = 0.55,
}: ScrollStepOptions) => {
  const runwayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const stepRef = useRef(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    let ticking = false;

    const update = () => {
      ticking = false;

      const rect = runway.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = travel <= 0 ? 0 : clamp01(-rect.top / travel);

      let next = stepRef.current;
      while (next < enter.length - 1 && progress >= enter[next + 1]) next += 1;
      while (next > 0 && progress < exit[next]) next -= 1;

      if (entryFloor !== undefined) {
        const entered = rect.top < window.innerHeight * entryFraction;
        next = entered ? Math.max(next, entryFloor) : 0;
      }

      if (next === stepRef.current) return;
      stepRef.current = next;
      setStep(next);
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enter, exit, entryFloor, entryFraction]);

  return { runwayRef, step };
};

/**
 * Eases a value toward its target on its own clock, independent of scrolling, so
 * the animation always plays out fully instead of tracking the scrollbar.
 *
 * @param msPerUnit time to cover one unit of distance; shorter hops take less.
 */
export const useTween = (target: number, msPerUnit: number) => {
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);
  const rafRef = useRef(0);

  useEffect(() => {
    const from = valueRef.current;
    const distance = target - from;
    if (distance === 0) return;

    const duration = Math.abs(distance) * msPerUnit;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = clamp01((now - start) / duration);
      const next = from + distance * easeInOutCubic(elapsed);

      valueRef.current = next;
      setValue(next);

      if (elapsed < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, msPerUnit]);

  return value;
};
