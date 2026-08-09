import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Code2,
  Dumbbell,
  Gem,
  HeartHandshake,
  Smartphone,
  Timer,
  TrendingUp,
} from "lucide-react";
import { BusinessValue } from "./BusinessValue";

const BUSINESS_VALUE = [
  {
    text: "Every member becomes coachable - not just the 5% who can afford personal trainers",
    icon: HeartHandshake,
  },
  {
    text: "Members stay engaged with coaching for longer",
    icon: TrendingUp,
  },
  {
    text: "More value from the members you already have",
    icon: Gem,
  },
  {
    text: "Richer member intelligence across every interaction",
    icon: Brain,
  },
] as const satisfies ReadonlyArray<{ text: string; icon: LucideIcon }>;

const OPERATIONAL_VALUE = [
  {
    text: "Five-minute basic integration",
    icon: Timer,
  },
  {
    text: "No additional hardware needed",
    icon: Smartphone,
  },
  {
    text: "White-label SDK",
    icon: Code2,
  },
  {
    text: "Les Mills content integration",
    icon: Dumbbell,
  },
] as const satisfies ReadonlyArray<{ text: string; icon: LucideIcon }>;

const LOGO_BASE = "/img/Member%20page/logos";

const PRESS_QUOTES = [
  {
    source: "TechRadar",
    quote: "App that reveals the true power of AI training",
    logo: `${LOGO_BASE}/logo-techradar.svg`,
  },
  {
    source: "Business Insider",
    quote: "AI is a key to building better health and fitness habits.",
    logo: `${LOGO_BASE}/logo-business-insider.png`,
  },
  {
    source: "Forbes",
    quote:
      "Zing adjusts your daily workouts to your current mental and physical state.",
    logo: `${LOGO_BASE}/logo-forbes.svg`,
  },
] as const;

const ValueCard = ({
  items,
  type,
}: {
  items: ReadonlyArray<{ text: string; icon: LucideIcon }>;
  type: "operational" | "business";
}) => {
  return (
    <ul className="grid w-full grid-cols-2 gap-4 overflow-hidden md:gap-12">
      {items.map(({ text, icon: Icon }) => (
        <li
          key={text}
          className={cn(
            "flex flex-1 flex-col gap-3 border-t-2 pt-4",
            type === "operational"
              ? "border-theme-bg-300"
              : "border-theme-fg-100",
          )}
        >
          <span className="type-body-md-semi text-balance">{text}</span>
        </li>
      ))}
    </ul>
  );
};

export const Value = () => {
  return (
    <section className="bg-theme-bg-200 ">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-16 md:gap-12 md:px-14 md:py-32">
        <div className="flex flex-col gap-3">
          <h2 className="type-heading-h1 text-balance">
            The next standard of member experience is intelligently personalized
          </h2>
          <p className="type-body-lg text-theme-text-secondary">
            AI Coach inside your existing gym app. Integrated in minutes.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-[2fr_1fr] md:gap-24">
          <div className="flex flex-col gap-10 py-4 md:gap-32 md:py-8">
            <div className="grid grid-cols-1 items-baseline md:grid-cols-[1fr_3fr] gap-14">
              <h3 className="type-heading-h">
                Operational <br className="hidden md:block" />
                value
              </h3>
              <ValueCard items={OPERATIONAL_VALUE} type="operational" />
            </div>

            <div className="flex flex-col gap-10 md:gap-4">
              <div className="grid grid-cols-1 items-baseline md:grid-cols-[1fr_3fr] gap-14">
                <h3 className="type-heading-h">
                  Business <br className="hidden md:block" />
                  value
                </h3>
                <ValueCard items={BUSINESS_VALUE} type="business" />
              </div>
            </div>
          </div>
          <div className="hidden md:block w-full h-full rounded-3xl bg-cover bg-center bg-[url('/img/Member%20page/card-in-gym.png')]"></div>
        </div>

        <div className="h-px my-12 bg-theme-bg-300 w-full" />

        <BusinessValue />

        <div className="flex flex-col gap-4">
          <ul className="flex w-full flex-col items-stretch gap-6 sm:flex-row sm:gap-8">
            {PRESS_QUOTES.map((item) => (
              <li key={item.source} className="flex flex-1 flex-col gap-4">
                <img
                  src={item.logo}
                  alt=""
                  aria-hidden
                  className="h-4 w-auto object-contain object-left"
                />
                <div className="flex flex-col gap-1">
                  <span className="type-body-sm text-theme-text-secondary">
                    {item.source}
                  </span>
                  <span className="type-body-md-semi text-balance">
                    "{item.quote}"
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
