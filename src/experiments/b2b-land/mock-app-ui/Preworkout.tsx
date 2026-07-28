import type { CSSProperties } from "react";
import type { MockTheme } from "./themePreview";
import { publicAssetPath, withAlpha } from "./themePreview";
import { DragHandleIcon, MoreIcon, PlusButton, SparkleIcon } from "./Icons";

type PreworkoutProps = {
  theme: MockTheme;
};

function exerciseImage(id: string) {
  return publicAssetPath(`/images/platform/${id}.webp`);
}

const equipmentItems = [
  { id: "kb", label: "Kettlebell", pos: "20% 30%" },
  { id: "bench", label: "Chest Press", pos: "60% 40%" },
] as const;

const mainExercises = [
  {
    id: "1",
    title: "BM Double Curl",
    meta: "3 sets × 15 reps × 10 kg",
    thumbPos: "10% 20%",
  },
  {
    id: "2",
    title: "Pull Ups",
    meta: "3 sets × 8 reps × BW",
    thumbPos: "70% 25%",
  },
] as const;

const Preworkout = ({ theme }: PreworkoutProps) => {
  const {
    bgPrimaryColor,
    bgSecondaryColor,
    brandSecondaryColor,
    colorButtonPrimary,
    colorButtonSecondary,
    buttonRadius,
    cardBackgroundImage,
    fontBrand,
    fontSystem,
    headingDarkPrimaryColor,
    textDarkPrimaryColor,
    textDarkSecondaryColor,
  } = theme;

  const shellStyle = {
    ...theme.phoneShellStyle,
    background: bgSecondaryColor,
    display: "flex" as const,
    flexDirection: "column" as const,
    overflow: "hidden" as const,
  };

  return (
    <article className="phone">
      <div
        className="phone-shell preworkout-shell phone-border-radius"
        style={shellStyle}
      >
        <header
          className="preworkout-hero"
          style={{
            backgroundImage: `url(${cardBackgroundImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: 0,
          }}
        >
          <div className="status-row" style={{ fontFamily: fontSystem }}>
            <span>9:41</span>
            <span>5G</span>
          </div>

          <div className="preworkout-hero-top">
            <div
              className="home-workout-tag"
              style={{
                fontFamily: fontSystem,
                marginBottom: 0,
              }}
            >
              <span aria-hidden className="home-workout-tag-icon">
                <SparkleIcon />
              </span>
              <span>Special for Alex</span>
            </div>

            <button
              type="button"
              className="icon-button"
              style={{
                background: withAlpha("#B3B3B3", 0.82),
                color: headingDarkPrimaryColor,
              }}
              aria-label="Close"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2954 10.2954C10.6892 9.90154 11.3277 9.90154 11.7215 10.2954L21.7046 20.2785C22.0985 20.6723 22.0985 21.3108 21.7046 21.7046C21.3108 22.0985 20.6723 22.0985 20.2785 21.7046L10.2954 11.7215C9.90154 11.3277 9.90154 10.6892 10.2954 10.2954Z"
                  fill="black"
                />
                <path
                  d="M21.7046 10.2954C22.0985 10.6892 22.0985 11.3277 21.7046 11.7215L11.7215 21.7046C11.3277 22.0985 10.6892 22.0985 10.2954 21.7046C9.90154 21.3108 9.90154 20.6723 10.2954 20.2785L20.2785 10.2954C20.6723 9.90154 21.3108 9.90154 21.7046 10.2954Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>

          <div className="preworkout-hero-focus">
            <p
              className="home-workout-duration"
              style={{ fontFamily: fontBrand, margin: 0, textAlign: "center" }}
            >
              40 min
            </p>
            <p
              className="home-workout-meta"
              style={{
                fontFamily: fontSystem,
                marginBottom: 0,
                opacity: 0.92,
                textAlign: "center",
              }}
            >
              Glutes, Quadriceps, Hamstrings
            </p>
          </div>
        </header>

        <div
          className="preworkout-scroll"
          style={
            {
              "--preworkout-scroll-bg": bgSecondaryColor,
              backgroundColor: bgSecondaryColor,
            } as CSSProperties
          }
        >
          <section>
            <h2
              className="preworkout-section-label"
              style={{ color: textDarkSecondaryColor, fontFamily: fontBrand }}
            >
              What you&apos;ll need (5)
            </h2>
            <div className="preworkout-equip-scroll">
              {equipmentItems.map((item) => (
                <div
                  key={item.id}
                  className="preworkout-equip-card"
                  style={{
                    backgroundColor: bgPrimaryColor,
                    // borderRadius: clampRadius(buttonRadius, -2)
                  }}
                >
                  <img
                    alt=""
                    className="preworkout-equip-thumb"
                    src={exerciseImage(item.id)}
                    style={{ objectPosition: item.pos }}
                    draggable={false}
                  />
                  <span
                    className="preworkout-equip-name"
                    style={{ fontFamily: fontBrand }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2
              className="preworkout-section-label"
              style={{ color: textDarkSecondaryColor, fontFamily: fontBrand }}
            >
              What you&apos;ll do
            </h2>
            <div>
              <div className="preworkout-warmup-row">
                <div className="preworkout-warmup-text">
                  <span
                    className="preworkout-warmup-title"
                    style={{ fontFamily: fontBrand }}
                  >
                    Warm-up
                  </span>
                  <span
                    className="preworkout-warmup-extra"
                    style={{ color: "#8C25F4", fontFamily: fontSystem }}
                  >
                    (+3 min)
                  </span>
                </div>
                <div className="preworkout-warmup-actions">
                  <button
                    type="button"
                    className="preworkout-toggle preworkout-toggle--on"
                    style={{ backgroundColor: brandSecondaryColor }}
                    aria-pressed="true"
                    aria-label="Warm-up enabled"
                  >
                    <span className="preworkout-toggle-knob" />
                  </button>
                  <button
                    type="button"
                    className="preworkout-icon-btn"
                    aria-label="Warm-up options"
                  >
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        d="M1.41 0 6 4.58 10.59 0 12 1.41l-6 6-6-6L1.41 0Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <hr className="preworkout-row-divider" />
            </div>
          </section>

          <section>
            <div className="preworkout-exercises-header">
              <h2
                className="preworkout-exercises-title"
                style={{ fontFamily: fontBrand }}
              >
                8 Exercises
              </h2>
              <div className="preworkout-exercises-actions">
                <button
                  type="button"
                  className="preworkout-add-btn"
                  style={{ color: brandSecondaryColor, fontFamily: fontBrand }}
                >
                  Add
                </button>
                <PlusButton />
              </div>
            </div>

            <div className="preworkout-exercise-stack">
              {mainExercises.map((ex) => (
                <div key={ex.id} className="preworkout-exercise-row">
                  <div className="preworkout-ex-thumb-wrap">
                    <img
                      alt=""
                      className="preworkout-ex-thumb"
                      src={exerciseImage(ex.id)}
                      style={{ objectPosition: ex.thumbPos }}
                      draggable={false}
                    />
                    <img
                      alt=""
                      aria-hidden
                      className="preworkout-ex-muscle"
                      draggable={false}
                      src={publicAssetPath("/images/platform/muscle.webp")}
                    />
                  </div>
                  <div className="preworkout-ex-body">
                    <p
                      className="preworkout-ex-title"
                      style={{ fontFamily: fontBrand }}
                    >
                      {ex.title}
                    </p>
                    <p
                      className="preworkout-ex-meta"
                      style={{
                        color: textDarkSecondaryColor,
                        fontFamily: fontSystem,
                      }}
                    >
                      {ex.meta}
                    </p>
                  </div>
                  <div className="preworkout-ex-side">
                    <button
                      type="button"
                      className="preworkout-icon-btn"
                      aria-label="More"
                    >
                      <MoreIcon />
                    </button>
                    <button
                      type="button"
                      className="preworkout-icon-btn"
                      aria-label="Reorder"
                    >
                      <DragHandleIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer
          className="footer-buttons"
          style={{
            background: `linear-gradient(180deg, ${withAlpha(
              bgSecondaryColor,
              0
            )} 0%, ${bgSecondaryColor} 32%)`,
          }}
        >
          <button
            type="button"
            className="button"
            style={{
              backgroundColor: colorButtonSecondary,
              borderRadius: buttonRadius,
              color: textDarkPrimaryColor,
              fontFamily: fontSystem,
            }}
          >
            Adapt Workout
          </button>
          <button
            type="button"
            className="button"
            style={{
              backgroundColor: colorButtonPrimary,
              borderRadius: buttonRadius,
              fontFamily: fontSystem,
            }}
          >
            Start Workout
          </button>
        </footer>
      </div>
    </article>
  );
};

export default Preworkout;
