import { LogoIcon } from "@/components/primitives/Icons";
import { useEffect, useState } from "react";

// TODO: replace with Natalia's calendar URL
const DEMO_CALENDAR_URL = "#";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Integration", href: "#integration" },
  { label: "Examples", href: "#examples" },
] as const;

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed left-1/2 z-50 flex w-full max-w-screen-xl -translate-x-1/2 items-center justify-between gap-4 px-4 py-2 transition-[top,left,right,border-radius,background-color,box-shadow] duration-300 ease-out md:gap-6 md:pl-6 md:pr-3",
        scrolled
          ? "crown top-2 rounded-3xl shadow-sm md:top-3 md:rounded-4xl"
          : "top-4 rounded-none bg-transparent md:top-8",
      ].join(" ")}
    >
      <a href="#" className="type-body-lg-semi flex shrink-0 items-center gap-2">
        <LogoIcon size={24} />
        Zing Coach
      </a>

      <nav className="flex items-center gap-3 md:gap-5">
        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="type-body-md text-theme-text-secondary transition-colors hover:text-theme-text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          className={[
            "flex items-center gap-3 overflow-hidden transition-[max-width,opacity,transform] duration-500 ease-out md:gap-5",
            scrolled
              ? "max-w-xl translate-y-0 opacity-100"
              : "pointer-events-none max-w-0 -translate-y-1 opacity-0",
          ].join(" ")}
          aria-hidden={!scrolled}
        >
          <div className="mr-1 hidden h-5 w-px bg-theme-bg-300 md:mr-2 md:block" />
          <a
            href={DEMO_CALENDAR_URL}
            tabIndex={scrolled ? 0 : -1}
            className="type-body-md-semi whitespace-nowrap rounded-xl bg-theme-fg-100 px-3 py-2 text-theme-bg-100"
          >
            Get Demo →
          </a>
          <button
            type="button"
            tabIndex={scrolled ? 0 : -1}
            className="type-body-md-semi hidden whitespace-nowrap rounded-xl px-3 py-2 md:block"
          >
            Experience Zing Coach →
          </button>
        </div>
      </nav>
    </header>
  );
};
