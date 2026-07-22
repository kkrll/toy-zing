export const Problems = () => {
  return (
    <section>
      <h2>95% of your members never receive coaching</h2>
      <p>Personal training doesn’t scale.</p>
      <p>
        That leaves most members without guidance, motivation or accountability.
      </p>

      {/* Visual: bar — 5% green, 95% red */}
      <div aria-label="5% coached, 95% without coaching">
        <div>
          <span>5%</span>
          <span>95%</span>
        </div>
      </div>

      <p>↓</p>

      <h3>50% of new members leave within 6 months</h3>
      <p>Without guidance, motivation fades before habits become routines</p>

      <p>↓</p>

      <h3>The problem isn’t retention.</h3>
      <p>It’s coaching at scale.</p>

      <blockquote>
        <p>
          The highest rate of churn occurs before habits have formed…
        </p>
        <footer>— Will Orr, CEO The Gym Group</footer>
      </blockquote>
    </section>
  );
};
