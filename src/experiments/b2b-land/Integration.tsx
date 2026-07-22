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
    <section>
      <h2>Integrated in minutes. Easy to scale.</h2>

      <ol>
        {STEPS.map((step) => (
          <li key={step.number}>
            <h3>
              {step.number}. {step.title}
            </h3>
            <p>{step.description}</p>
            {"note" in step && step.note ? <p>{step.note}</p> : null}
          </li>
        ))}
      </ol>
    </section>
  );
};
