"use client";

import { useRef, useState } from "react";

const VIDEO_SRC = "/img/Member%20page/anton.mp4";
/*
 * A still pulled from the video itself (ffmpeg, ~15s in).
 *
 * Without it the box paints flat grey until playback starts: the source is a 4K, 100MB
 * file, and no amount of `preload` gets a mobile browser to decode a frame of that just
 * to show a thumbnail. A poster is 51KB and paints immediately, which also means the
 * video no longer needs preloading at all.
 */
const VIDEO_POSTER = "/img/Member%20page/anton-poster.jpg";

const FEATURED = {
  quote:
    "Zing stands out because it gives every member a real coach — not a chatbot. In fitness, that changes retention.",
  name: "Anton Marchenko",
  title: "Chief Executive Officer, Zing Coach",
} as const;

const STORIES = [
  {
    logo: "NYSC",
    quote:
      "We finally have a way to coach members who would never book a personal trainer. Engagement is up across the floor.",
    name: "Bill McMenamy",
    title: "CEO, New York Sports Club",
  },
  {
    logo: "PSG",
    quote:
      "Members feel supported between sessions. That continuity is what keeps people coming back week after week.",
    name: "Partnership lead",
    title: "Paris Saint-Germain",
  },
  {
    logo: "Les Mills",
    quote:
      "Pairing world-class content with adaptive coaching is how you make group fitness feel personal at scale.",
    name: "Content partner",
    title: "Les Mills",
  },
] as const;

export const Stories = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  /*
   * Whether playback has ever begun — not whether it is playing right now.
   *
   * The overlay below is a poster, not a control surface: it covers the first frame,
   * and once the video has started the native controls own playback for good. Bringing
   * it back on pause would put our play button on top of the one the control bar draws
   * for the same state, and the two would disagree about which is in charge.
   *
   * Driven by the video's own `play` event rather than set in the click handler, so it
   * is true exactly when the video agrees it is. `play()` can reject — an autoplay
   * policy, a decode error — and keying off the event means the poster stays put when
   * it does, instead of clearing to reveal a video that never started.
   */
  const [started, setStarted] = useState(false);

  return (
    <section className="w-full bg-theme-bg-200">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4 py-16 md:px-14 md:py-32">
        <div className="grid items-center gap-10 md:grid-cols-[2fr_1fr] md:gap-16 lg:gap-20">
          {/* A plain box, not a button. A `<video controls>` is itself interactive, so
              wrapping it in a click target means every tap on the control bar is also a
              tap on the wrapper: the browser starts playback, the click bubbles, and the
              handler pauses what it just started. Scrubbing toggles play instead of
              seeking. Playback has one owner here, and it is the video. */}
          <div className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-theme-bg-400">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              /* Native controls arrive with playback, not before it. iOS draws its own
                 large centred play button over any paused `controls` video that hasn't
                 started, which stacked underneath the designed one — two play buttons,
                 one frame apart, both live. Handing the video its controls only once it
                 is running means exactly one affordance is on screen at any time: ours
                 while it is a poster, the browser's from the first frame onwards. */
              controls={started}
              poster={VIDEO_POSTER}
              /* Nothing is worth fetching ahead of a tap when the poster is what's on
                 screen and the source is 100MB. */
              preload="none"
              src={VIDEO_SRC}
              onPlay={() => setStarted(true)}
            />
            {/* The poster's one control, covering the whole frame so a tap anywhere on
                it plays. This is a sibling of the video and not a wrapper around it —
                that distinction is the whole fix — and it exists only while the video
                has no controls of its own, so the two can never both be live. */}
            {!started && (
              <button
                type="button"
                onClick={() => void videoRef.current?.play()}
                aria-label="Play video"
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-theme-bg-overlay-100/20 transition-colors duration-200 group-hover:bg-theme-bg-overlay-100/30"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-20 items-center justify-center rounded-full bg-theme-bg-100/40 backdrop-blur-sm transition-colors duration-200 group-hover:bg-theme-bg-100/70 md:h-20 md:w-32"
                >
                  <svg
                    className="ml-0.5 size-6 text-theme-fg-100/40 transition-colors duration-200 group-hover:text-theme-fg-100 md:size-10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5.14v13.72L19 12 8 5.14z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
          <blockquote className="flex flex-col gap-6">
            <p className="type-heading-h2 text-balance">
              &ldquo;{FEATURED.quote}&rdquo;
            </p>
            <footer className="flex flex-col gap-0.5">
              <cite className="type-body-lg not-italic">{FEATURED.name}</cite>
              <span className="type-body-md text-theme-text-secondary">
                {FEATURED.title}
              </span>
            </footer>
          </blockquote>
        </div>

        {/*<ul className="mt-14 grid grid-cols-1 gap-10 border-t border-theme-bg-400 pt-14 md:mt-20 md:grid-cols-3 md:gap-12 md:pt-16 lg:gap-16">
          {STORIES.map((story) => (
            <li key={story.logo} className="flex flex-col gap-5">
              <div className="type-body-md-semi flex h-8 items-center text-theme-text-primary">
                {story.logo}
              </div>
              <p className="type-body-lg text-balance">{story.quote}</p>
              <div className="flex flex-col gap-0.5">
                <span className="type-body-md-semi">{story.name}</span>
                <span className="type-body-sm text-theme-text-secondary">
                  {story.title}
                </span>
              </div>
            </li>
          ))}
        </ul>*/}
      </div>
    </section>
  );
};
