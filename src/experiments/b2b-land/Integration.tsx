const STEPS = [
  {
    number: 1,
    title: "Fast Integration",
    description:
      "Launch the basic AI coaching experience in minutes, not weeks. Zing can be embedded directly into your existing member app as a white-label coaching layer.",
  },
  {
    number: 2,
    title: "Connect your systems",
    description:
      "Connect Zing to your backend: member profiles, classes, schedules, gym equipment, locations, training history, and internal club knowledge.",
    note: "Supported backends include ABC Ignite and GloFox.",
  },
  {
    number: 3,
    title: "Configure and launch",
    description:
      "Adapt the experience to your brand, club setup and member journey, then roll it out across locations.",
  },
  {
    number: 4,
    title: "Security & GDPR",
    description:
      "Your member data stays under your control. Zing supports GDPR-compliant processing and a security review before launch.",
  },
] as const;

export const Integration = () => {
  return (
    <section className="flex flex-col gap-6 rounded-3xl bg-theme-bg-200 px-4 py-8 md:gap-14 md:px-14 md:py-16">
      <h2 className="type-heading-h1 text-balance">
        Integrated in minutes. Easy to scale.
      </h2>

      <ol className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {STEPS.map((step) => (
          <li key={step.number} className="flex flex-col gap-1">
            <p className="type-body-lg-semi">
              {step.number}. {step.title}
            </p>
            <p className="type-body-lg text-theme-text-secondary">
              {step.description}
            </p>
            {"note" in step && step.note ? (
              <p className="type-body-md text-theme-text-secondary">
                {step.note}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
};
