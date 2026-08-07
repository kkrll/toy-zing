const ASSET = "/images/b2b-land/footer";

const PRODUCT_LINKS = [
  { label: "Integration Paths", href: "https://partner.zing.coach/integration" },
  { label: "Mobile App", href: "https://zing.coach/" },
  { label: "Gyms & Studios", href: "https://partner.zing.coach/gyms" },
  { label: "Creators", href: "https://partner.zing.coach/influencers" },
  { label: "Corporate", href: "https://partner.zing.coach/corporate" },
] as const;

const COMPANY_LINKS = [
  { label: "About", href: "https://zing.coach/" },
  {
    label: "Contact us",
    href: "https://zingcoach.zendesk.com/hc/en-us/requests/new",
  },
  { label: "Press", href: "https://zing.coach/press-kit" },
  { label: "Careers", href: "https://palta.teamtailor.com/jobs" },
] as const;

const RESOURCE_LINKS = [
  { label: "Fitness library", href: "https://zing.coach/fitness-library" },
  { label: "Help Center", href: "https://zingcoach.zendesk.com/hc/en-us" },
] as const;

const LEGAL_LINKS = [
  {
    label: "Partner Agreement",
    href: "https://partner.zing.coach/partner-agreement",
  },
  {
    label: "Privacy Policy",
    href: "https://partner.zing.coach/privacy-policy",
  },
  { label: "Terms of Service", href: "https://partner.zing.coach/terms" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/zing.coach/",
    icon: `${ASSET}/instagram.svg`,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@zing_fitnesscoach",
    icon: `${ASSET}/tiktok.svg`,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ZingFitnessCoach",
    icon: `${ASSET}/facebook.svg`,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/zing-fitness/",
    icon: `${ASSET}/linkedin.svg`,
  },
] as const;

const linkClass =
  "type-body-md block text-theme-text-secondary-inv transition-colors hover:text-theme-text-primary-inv";

export const Footer = () => {
  return (
    <footer className="bg-theme-fg-100 py-16 text-theme-text-primary-inv">
      <div className="mx-auto max-w-screen-xl px-4 md:px-14">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="https://zing.coach/" className="mb-4 inline-block">
              <img
                src={`${ASSET}/zing-logo-white.svg`}
                alt="Zing Coach"
                className="h-8 md:hidden"
              />
              <img
                src={`${ASSET}/zing-logo-short-white.svg`}
                alt="Zing Coach"
                className="hidden h-8 md:block"
              />
            </a>
            <p className="type-body-md text-theme-text-secondary-inv">
              Get results with smart workouts
            </p>
          </div>

          <div className="flex flex-col gap-2 lg:col-span-1">
            <a
              href="https://zingcoach.onelink.me/gsGu/download"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src={`${ASSET}/app-store.svg`}
                alt="Download on the App Store"
                className="h-8"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=coach.zing.fitness&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src={`${ASSET}/google-play.svg`}
                alt="Get it on Google Play"
                className="h-8"
              />
            </a>
          </div>

          <div className="lg:col-span-1">
            <p className="type-body-md-semi mb-3">PRODUCT</p>
            <div className="flex flex-col gap-2">
              {PRODUCT_LINKS.map((link) => (
                <a key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <p className="type-body-md-semi mb-3">COMPANY</p>
            <div className="flex flex-col gap-2">
              {COMPANY_LINKS.map((link) => (
                <a key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <p className="type-body-md-semi mb-3">RESOURCES</p>
            <div className="flex flex-col gap-2">
              {RESOURCE_LINKS.map((link) => (
                <a key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-8 flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <img src={link.icon} alt={link.label} className="size-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src={`${ASSET}/zing-logo-white.svg`}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-5"
          />
          <div className="relative grid grid-cols-1 items-center gap-4 border-t border-theme-fg-300 py-8 md:grid-cols-5">
            <p className="type-body-md text-theme-text-secondary-inv">
              © {new Date().getFullYear()} Zing Coach. All rights reserved.
              ZNG™, ZNG AI™, and ZNG COACH™ are trademarks of Zing Coach Inc.
            </p>
            <div className="hidden md:block" />
            {LEGAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
