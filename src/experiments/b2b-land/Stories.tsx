"use client";

import { useRef, useState } from "react";

const VIDEO_SRC = "/img/Member%20page/anton.mp4";

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
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="w-full bg-theme-bg-200">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4 py-16 md:px-14 md:py-32">
        <div className="grid items-center gap-10 md:grid-cols-[2fr_1fr] md:gap-16 lg:gap-20">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-theme-bg-400 text-left"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              preload="metadata"
              src={VIDEO_SRC}
              onEnded={() => setPlaying(false)}
            />
            {!playing && (
              <span
                aria-hidden="true"
                className="group absolute inset-0 flex items-center justify-center bg-theme-bg-overlay-100/20 transition-opacity duration-200 group-hover:bg-theme-bg-overlay-100/30"
              >
                <span className="flex w-20 md:w-32 h-12 md:h-20 items-center justify-center rounded-full bg-theme-bg-100/40 group-hover:bg-theme-bg-100/70 transition-opacity duration-200 backdrop-blur-sm ">
                  <svg
                    className="ml-0.5 size-6 text-theme-fg-100/40 group-hover:text-theme-fg-100 transition-colors duration-200 md:size-10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5.14v13.72L19 12 8 5.14z" />
                  </svg>
                </span>
              </span>
            )}
          </button>
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
