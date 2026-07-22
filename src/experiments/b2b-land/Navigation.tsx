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
        "fixed left-12 right-12 z-50 flex items-center justify-between gap-6 pl-6 pr-3 py-2 transition-[top,left,right,border-radius,background-color,box-shadow] duration-300 ease-out",
        scrolled
          ? "crown top-3 rounded-4xl shadow-sm"
          : "top-8 rounded-none bg-transparent",
      ].join(" ")}
    >
      <a href="#" className="type-body-lg-semi shrink-0 flex items-center gap-2">
        <LogoIcon size={24} />
        Zing Coach
      </a>

      <nav className="flex items-center gap-5">
        <ul className="flex items-center gap-6">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="type-body-md text-theme-text-secondary hover:text-theme-text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          className={[
            "flex items-center gap-5 overflow-hidden transition-[max-width,opacity,transform] duration-500 ease-out",
            scrolled
              ? "max-w-xl opacity-100 translate-y-0"
              : "max-w-0 opacity-0 -translate-y-1 pointer-events-none",
          ].join(" ")}
          aria-hidden={!scrolled}
        >
          <div className="w-px bg-theme-bg-300 h-5 mr-2" />
          <a
            href={DEMO_CALENDAR_URL}
            tabIndex={scrolled ? 0 : -1}
            className="px-3 py-2 bg-theme-fg-100 text-theme-bg-100 type-body-md-semi rounded-xl whitespace-nowrap"
          >
            Get Demo →
          </a>
          <button
            type="button"
            tabIndex={scrolled ? 0 : -1}
            className="px-3 py-2 type-body-md-semi rounded-xl whitespace-nowrap"
          >
            Experience Zing Coach →
          </button>
        </div>
      </nav>
    </header>
  );
};
