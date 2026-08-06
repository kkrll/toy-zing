import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const IconFrame = ({ children }: { children: ReactNode }) => (
  <svg
    aria-hidden
    viewBox="0 0 120 120"
    fill="none"
    className="size-[32px] shrink-0 text-theme-bg-100"
  >
    {children}
  </svg>
);

/** Draft placeholders — swap for final artwork later. */
const ICONS = {
  integrate: (
    <IconFrame>
      <rect
        x="28"
        y="22"
        width="64"
        height="76"
        rx="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M48 42h24M48 58h24M48 74h16"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="86" cy="86" r="18" stroke="currentColor" strokeWidth="4" />
      <path
        d="M86 78v16M78 86h16"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </IconFrame>
  ),
  connect: (
    <IconFrame>
      <circle cx="32" cy="36" r="12" stroke="currentColor" strokeWidth="4" />
      <circle cx="88" cy="36" r="12" stroke="currentColor" strokeWidth="4" />
      <circle cx="60" cy="84" r="12" stroke="currentColor" strokeWidth="4" />
      <path
        d="M42 42 50 72M78 42 70 72M44 36h32"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </IconFrame>
  ),
  configure: (
    <IconFrame>
      <path
        d="M36 28h48a8 8 0 0 1 8 8v48a8 8 0 0 1-8 8H36a8 8 0 0 1-8-8V36a8 8 0 0 1 8-8Z"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M44 52h12M44 68h20M64 48v8M72 64v8"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="64" cy="52" r="5" fill="currentColor" />
      <circle cx="72" cy="68" r="5" fill="currentColor" />
    </IconFrame>
  ),
  security: (
    <IconFrame>
      <path
        d="M60 22 86 34v26c0 18-12 30-26 36-14-6-26-18-26-36V34L60 22Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M48 60 56 68 74 50"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconFrame>
  ),
} as const;

const STEPS = [
  {
    number: 1,
    title: "Fast Integration",
    description:
      "Launch the basic AI coaching experience in minutes, not weeks. Zing can be embedded directly into your existing member app as a white-label coaching layer.",
    icon: ICONS.integrate,
  },
  {
    number: 2,
    title: "Connect your systems",
    description:
      "Connect Zing to your backend: member profiles, classes, schedules, gym equipment, locations, training history, and internal club knowledge.",
    note: "Supported backends include ABC Ignite and GloFox.",
    icon: ICONS.connect,
  },
  {
    number: 3,
    title: "Configure and launch",
    description:
      "Adapt the experience to your brand, club setup and member journey, then roll it out across locations.",
    icon: ICONS.configure,
  },
  {
    number: 4,
    title: "Security & GDPR",
    description:
      "Your member data stays under your control. Zing supports GDPR-compliant processing and a security review before launch.",
    icon: ICONS.security,
  },
] as const;

export const Integration = () => {
  return (
    <section className="bg-theme-fg-100 text-theme-bg-100">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-16 px-4 py-16 md:px-14 md:py-32">
        <h2 className="type-heading-h1 text-balance">
          Integrated in minutes. <br />
          Easy to scale.
        </h2>

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {STEPS.map((step) => (
            <li
              key={step.number}
              className={cn(
                "flex flex-col gap-4 pt-6 md:pt-8 border-t border-theme-bg-300",
              )}
            >
              <p className="type-body-lg-semi">
                {step.number}. {step.title}
              </p>
              <p className="type-body-lg text-theme-text-secondary-inv">
                {step.description}
              </p>
              {"note" in step && step.note ? (
                <p className="type-body-md text-theme-text-secondary-inv">
                  {step.note}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
