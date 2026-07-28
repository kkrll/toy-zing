import { CalendarIcon, DumbbellIcon, SparkIcon, SparkleIcon } from "./Icons";
import type { MockTheme } from "./themePreview";
import { publicAssetPath, withAlpha } from "./themePreview";

type HomeScreenProps = {
  theme: MockTheme;
};

const HomeScreen = ({ theme }: HomeScreenProps) => {
  const {
    bgPrimaryColor,
    brandPrimaryColor,
    brandSecondaryColor,
    cardBackgroundImage,
    buttonRadius,
    fontBrand,
    fontSystem,
    headingDarkPrimaryColor,
    phoneShellStyle,
    textDarkSecondaryColor,
  } = theme;

  return (
    <article className="phone">
      <div className="phone-shell phone-border-radius" style={phoneShellStyle}>
        <div
          className="hero-card home-workout-hero"
          style={{
            backgroundImage: `url(${cardBackgroundImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="status-row">
            <span>9:41</span>
            <span>LTE</span>
          </div>

          <div className="preworkout-hero-top" style={{ marginBottom: "16px" }}>
            <button
              type="button"
              className="icon-button"
              style={{
                background: withAlpha("#B3B3B3", 0.82),
                color: headingDarkPrimaryColor,
              }}
              aria-label="Settings"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 16C18 14.8954 17.1046 14 16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18C17.1046 18 18 17.1046 18 16ZM20 16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16Z"
                  fill="black"
                />
                <path
                  d="M17 7C17 6.73478 16.8946 6.48051 16.707 6.29297C16.5195 6.10543 16.2652 6 16 6C15.7348 6 15.4805 6.10543 15.293 6.29297C15.1054 6.48051 15 6.73478 15 7V7.17383C14.9979 7.69064 14.8449 8.19606 14.5596 8.62695C14.2742 9.05776 13.8685 9.39605 13.3936 9.59961C13.3105 9.63514 13.2229 9.65689 13.1338 9.66895C12.701 9.82139 12.2351 9.86055 11.7812 9.77832C11.2603 9.68385 10.7789 9.43471 10.4004 9.06445L10.3926 9.05762L10.333 8.99707C10.2401 8.90412 10.1292 8.82961 10.0078 8.7793C9.88648 8.72904 9.75633 8.70312 9.625 8.70312C9.49367 8.70312 9.36352 8.72904 9.24219 8.7793C9.12081 8.82961 9.01083 8.90412 8.91797 8.99707C8.82499 9.08994 8.74954 9.20087 8.69922 9.32227C8.64898 9.44357 8.62305 9.57378 8.62305 9.70508C8.62306 9.8364 8.64896 9.96657 8.69922 10.0879C8.74953 10.2093 8.82404 10.3192 8.91699 10.4121L8.98535 10.4805C9.35561 10.859 9.60378 11.3403 9.69824 11.8613C9.78881 12.3612 9.73062 12.875 9.53711 13.3438L9.53809 13.3447C9.35454 13.8438 9.02528 14.2766 8.59277 14.5859C8.16031 14.8952 7.64479 15.0676 7.11328 15.0801H7C6.73478 15.0801 6.48051 15.1855 6.29297 15.373C6.10546 15.5606 6 15.8149 6 16.0801C6.00002 16.3453 6.10545 16.5996 6.29297 16.7871C6.4805 16.9746 6.7348 17.0801 7 17.0801H7.17383C7.69064 17.0821 8.19606 17.2352 8.62695 17.5205C9.05774 17.8059 9.39605 18.2116 9.59961 18.6865C9.80983 19.1682 9.87206 19.7014 9.77832 20.2188C9.68385 20.7397 9.43471 21.2211 9.06445 21.5996L9.05762 21.6074L8.99707 21.667C8.90412 21.7599 8.82961 21.8708 8.7793 21.9922C8.72904 22.1135 8.70312 22.2437 8.70312 22.375C8.70312 22.5063 8.72904 22.6365 8.7793 22.7578C8.81705 22.8489 8.86831 22.9339 8.93066 23.0098L8.99707 23.082C9.08994 23.175 9.20087 23.2505 9.32227 23.3008C9.44357 23.351 9.57378 23.377 9.70508 23.377C9.83639 23.3769 9.96657 23.351 10.0879 23.3008C10.2093 23.2505 10.3192 23.176 10.4121 23.083L10.4805 23.0146C10.859 22.6445 11.3404 22.3962 11.8613 22.3018C12.3821 22.2074 12.9191 22.2717 13.4033 22.4854C13.8779 22.6726 14.2886 22.9915 14.5859 23.4072C14.8952 23.8397 15.0676 24.3552 15.0801 24.8867V25C15.0801 25.2652 15.1855 25.5195 15.373 25.707C15.5606 25.8945 15.8149 26 16.0801 26C16.3453 26 16.5996 25.8946 16.7871 25.707C16.9746 25.5195 17.0801 25.2652 17.0801 25V24.8262C17.0821 24.3094 17.2352 23.8039 17.5205 23.373C17.7703 22.996 18.112 22.6903 18.5117 22.4834L18.6865 22.4004C19.1681 22.1903 19.7016 22.128 20.2188 22.2217C20.6747 22.3043 21.1004 22.5048 21.4531 22.8018L21.5996 22.9355L21.6074 22.9424L21.667 23.0029C21.7599 23.0959 21.8708 23.1704 21.9922 23.2207C22.1135 23.271 22.2437 23.2969 22.375 23.2969C22.5063 23.2969 22.6365 23.271 22.7578 23.2207C22.8792 23.1704 22.9892 23.0959 23.082 23.0029C23.175 22.9101 23.2505 22.7991 23.3008 22.6777C23.351 22.5564 23.377 22.4262 23.377 22.2949C23.3769 22.1636 23.351 22.0334 23.3008 21.9121C23.2505 21.7907 23.176 21.6807 23.083 21.5879L23.0146 21.5195C22.6447 21.1411 22.3962 20.6594 22.3018 20.1387C22.2081 19.6215 22.2703 19.0881 22.4805 18.6064L22.5635 18.4316C22.7704 18.0319 23.0761 17.6902 23.4531 17.4404C23.884 17.1551 24.3894 17.0021 24.9062 17H25C25.2652 17 25.5195 16.8946 25.707 16.707C25.8946 16.5195 26 16.2652 26 16C26 15.7348 25.8946 15.4805 25.707 15.293C25.5195 15.1054 25.2652 15 25 15H24.8262C24.3094 14.9979 23.8039 14.8449 23.373 14.5596C22.9422 14.2742 22.604 13.8685 22.4004 13.3936C22.3648 13.3105 22.3421 13.2229 22.3301 13.1338C22.1777 12.7011 22.1395 12.235 22.2217 11.7812C22.3161 11.2603 22.5653 10.7789 22.9355 10.4004L22.9424 10.3926L23.0029 10.333C23.0959 10.2401 23.1704 10.1292 23.2207 10.0078C23.271 9.88648 23.2969 9.75633 23.2969 9.625C23.2969 9.49367 23.271 9.36352 23.2207 9.24219C23.1704 9.12082 23.0959 9.01083 23.0029 8.91797C22.9101 8.82499 22.7991 8.74954 22.6777 8.69922C22.5564 8.64898 22.4262 8.62305 22.2949 8.62305C22.1636 8.62306 22.0334 8.64896 21.9121 8.69922C21.7907 8.74953 21.6807 8.82404 21.5879 8.91699L21.5195 8.98535L21.5186 8.98438C21.1401 9.35457 20.6596 9.60379 20.1387 9.69824C19.6213 9.79197 19.0882 9.7288 18.6064 9.51855C18.1315 9.31498 17.7258 8.97771 17.4404 8.54688C17.1551 8.11598 17.0021 7.61056 17 7.09375V7ZM19 7.08594L19.0068 7.18066C19.0209 7.27382 19.056 7.3632 19.1084 7.44238C19.1783 7.54786 19.2773 7.63074 19.3936 7.68066L19.4033 7.68555C19.5221 7.73798 19.6544 7.75363 19.7822 7.73047C19.91 7.7073 20.0282 7.6455 20.1211 7.55469L20.1729 7.50293L20.3906 7.30469C20.6183 7.1177 20.8733 6.96577 21.1465 6.85254C21.5106 6.70161 21.9007 6.62306 22.2949 6.62305C22.6891 6.62305 23.0792 6.70163 23.4434 6.85254C23.8076 7.00351 24.1394 7.224 24.418 7.50293C24.6967 7.78147 24.9175 8.11252 25.0684 8.47656C25.2192 8.84061 25.2969 9.23093 25.2969 9.625C25.2969 10.0191 25.2192 10.4094 25.0684 10.7734C24.9551 11.0466 24.8022 11.3016 24.6152 11.5293L24.417 11.7471L24.3652 11.7988L24.3027 11.873C24.2461 11.9514 24.2079 12.0418 24.1904 12.1377C24.1673 12.2655 24.1819 12.3978 24.2344 12.5166C24.2622 12.5796 24.2836 12.6449 24.2979 12.7119C24.3454 12.7827 24.4059 12.8441 24.4775 12.8916C24.5832 12.9616 24.7072 12.9995 24.834 13H25C25.7957 13 26.5585 13.3163 27.1211 13.8789C27.6837 14.4415 28 15.2043 28 16C28 16.7957 27.6837 17.5585 27.1211 18.1211C26.5585 18.6837 25.7957 19 25 19H24.9141L24.8193 19.0068C24.7262 19.0209 24.6368 19.056 24.5576 19.1084C24.4521 19.1783 24.3693 19.2773 24.3193 19.3936L23.4004 19L24.3145 19.4033C24.262 19.5221 24.2464 19.6544 24.2695 19.7822C24.2927 19.91 24.3545 20.0283 24.4453 20.1211L24.4971 20.1729L24.6953 20.3906C24.8823 20.6183 25.0342 20.8733 25.1475 21.1465C25.2984 21.5106 25.3769 21.9007 25.377 22.2949C25.377 22.6891 25.2984 23.0792 25.1475 23.4434C24.9965 23.8076 24.776 24.1393 24.4971 24.418L24.4961 24.417C24.2176 24.6955 23.8873 24.9175 23.5234 25.0684C23.1594 25.2192 22.7691 25.2969 22.375 25.2969C21.9809 25.2969 21.5906 25.2192 21.2266 25.0684C20.9534 24.9551 20.6984 24.8022 20.4707 24.6152L20.2529 24.417L20.2012 24.3652L20.127 24.3027C20.0486 24.2461 19.9582 24.2079 19.8623 24.1904C19.7345 24.1673 19.6022 24.1819 19.4834 24.2344L19.4736 24.2393C19.3574 24.2892 19.2584 24.3721 19.1885 24.4775C19.1185 24.5832 19.0806 24.7072 19.0801 24.834V25C19.0801 25.7956 18.7638 26.5585 18.2012 27.1211C17.6386 27.6837 16.8757 28 16.0801 28C15.2844 28 14.5216 27.6837 13.959 27.1211C13.3964 26.5585 13.0801 25.7957 13.0801 25V24.9336L13.0703 24.8369C13.0536 24.7413 13.0159 24.6499 12.959 24.5703C12.8832 24.4645 12.7774 24.3839 12.6553 24.3389C12.6356 24.3316 12.6159 24.3229 12.5967 24.3145C12.4779 24.262 12.3456 24.2464 12.2178 24.2695C12.09 24.2927 11.9717 24.3545 11.8789 24.4453L11.8271 24.4971C11.5486 24.7758 11.2176 24.9966 10.8535 25.1475C10.4894 25.2984 10.0993 25.3769 9.70508 25.377C9.31092 25.377 8.92076 25.2984 8.55664 25.1475C8.19245 24.9965 7.86065 24.776 7.58203 24.4971C7.30373 24.2187 7.08237 23.8871 6.93164 23.5234C6.7808 23.1594 6.70312 22.7691 6.70312 22.375C6.70312 21.9809 6.7808 21.5906 6.93164 21.2266C7.08255 20.8625 7.30424 20.5315 7.58301 20.2529L7.63477 20.2012C7.72553 20.1084 7.78637 19.99 7.80957 19.8623C7.83274 19.7345 7.81806 19.6022 7.76562 19.4834L7.76074 19.4736C7.71084 19.3574 7.62792 19.2584 7.52246 19.1885C7.4433 19.1361 7.35387 19.101 7.26074 19.0869L7.16602 19.0801H7C6.20437 19.0801 5.44151 18.7638 4.87891 18.2012C4.31632 17.6386 4.00002 16.8757 4 16.0801C4 15.2844 4.31632 14.5216 4.87891 13.959C5.44151 13.3964 6.20435 13.0801 7 13.0801H7.06641C7.1968 13.077 7.3236 13.0349 7.42969 12.959C7.53555 12.8832 7.6161 12.7774 7.66113 12.6553L7.68555 12.5967C7.73798 12.4779 7.75363 12.3456 7.73047 12.2178C7.7073 12.09 7.6455 11.9717 7.55469 11.8789L7.50293 11.8271C7.22417 11.5486 7.00345 11.2176 6.85254 10.8535C6.70161 10.4894 6.62306 10.0993 6.62305 9.70508C6.62305 9.31092 6.70163 8.92077 6.85254 8.55664C7.00351 8.19245 7.224 7.86065 7.50293 7.58203C7.78137 7.3035 8.11274 7.08246 8.47656 6.93164C8.84062 6.7808 9.23093 6.70312 9.625 6.70312C10.0191 6.70312 10.4094 6.7808 10.7734 6.93164C11.1375 7.08255 11.4685 7.30425 11.7471 7.58301L11.7988 7.63477C11.8916 7.72553 12.01 7.78637 12.1377 7.80957C12.2655 7.83274 12.3978 7.81806 12.5166 7.76562L12.6133 7.72852C12.6458 7.71804 12.6786 7.70826 12.7119 7.70117C12.7825 7.65369 12.8442 7.59399 12.8916 7.52246C12.9609 7.41786 12.9987 7.29532 13 7.16992V7C13 6.20435 13.3163 5.44151 13.8789 4.87891C14.4415 4.3163 15.2044 4 16 4C16.7956 4 17.5585 4.3163 18.1211 4.87891C18.6837 5.44151 19 6.20435 19 7V7.08594Z"
                  fill="black"
                />
              </svg>
            </button>

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

          <div className="home-workout-calendar">
            {[
              { id: "sun", label: "S", day: "8", muted: true },
              { id: "mon", label: "Today", mark: "dumbbell", today: true },
              { id: "tue", label: "T", mark: "spark", muted: true },
              { id: "wed", label: "W", mark: "dumbbell", muted: true },
              { id: "thu", label: "T", mark: "spark", muted: true },
              { id: "fri", label: "F", mark: "dumbbell", muted: true },
              { id: "sat", label: "S", mark: "spark", muted: true },
            ].map((col) => (
              <div className="home-workout-day" key={col.id}>
                <span
                  className="home-workout-day-label"
                  style={{
                    fontFamily: fontSystem,
                    opacity: col.today ? 1 : 0.92,
                  }}
                >
                  {col.label}
                </span>
                <div
                  className={`home-workout-day-circle${
                    col.today ? " home-workout-day-circle--today" : ""
                  }${col.muted ? " home-workout-day-circle--muted" : ""}`}
                >
                  <span
                    className="home-workout-day-marker"
                    style={{
                      alignItems: "center",
                      display: "inline-flex",
                      fontFamily: col.day ? fontBrand : fontSystem,
                      fontSize: col.day ? 12 : 11,
                      fontWeight: 600,
                      justifyContent: "center",
                      lineHeight: 1,
                    }}
                  >
                    {"day" in col && col.day ? (
                      col.day
                    ) : col.mark === "dumbbell" ? (
                      <DumbbellIcon />
                    ) : (
                      <SparkIcon />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="home-workout-rule" />

          <div className="home-workout-greet">
            <p className="home-workout-title" style={{ fontFamily: fontBrand }}>
              Get ready, Andrew
            </p>
            <p
              className="home-workout-subtitle"
              style={{
                fontFamily: fontSystem,
                opacity: 0.8,
              }}
            >
              Let&apos;s smash today&apos;s workout!
            </p>
          </div>

          <div
            className="home-workout-tag"
            style={{
              fontFamily: fontSystem,
            }}
          >
            <SparkleIcon />
            <span>Special for Alex</span>
          </div>

          <div className="home-workout-block">
            <p
              className="home-workout-duration"
              style={{ fontFamily: fontBrand }}
            >
              25 min
            </p>
            <p
              className="home-workout-meta"
              style={{
                fontFamily: fontSystem,
                opacity: 0.8,
              }}
            >
              Gym <span aria-hidden>•</span> Chest, biceps
            </p>

            <div className="home-workout-thumbs">
              <div className="home-workout-thumb-row">
                <img
                  alt=""
                  aria-hidden
                  className="home-workout-thumb-strip"
                  draggable={false}
                  src={publicAssetPath("/images/platform/exercises.webp")}
                />
              </div>
              <button className="home-workout-next" type="button">
                <span aria-hidden className="home-workout-next-arrow">
                  →
                </span>
                <span className="sr-only">Next exercises</span>
              </button>
            </div>
          </div>

          <div className="home-workout-pager" aria-hidden>
            <span className="home-workout-pager-dot home-workout-pager-dot--active" />
            <span className="home-workout-pager-dot" />
          </div>
        </div>

        <div className="metrics-wrapper">
          <div
            className="metric-card"
            style={
              {
                // borderRadius: clampRadius(buttonRadius, 10),
              }
            }
          >
            <div className="metric-card-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 13.8897C4 12.9935 4.56025 12.2185 5.35118 11.8875V4.83961C5.35118 4.37944 5.75489 4 6.22451 4C6.70237 4 7.09784 4.37137 7.09784 4.83961V11.8875C7.88877 12.2185 8.44902 12.9935 8.44902 13.8897C8.44902 14.7858 7.88877 15.5608 7.09784 15.8918V18.1846C7.09784 18.6286 6.71061 19 6.22451 19C5.75489 19 5.35118 18.6286 5.35118 18.1846V15.8918C4.56025 15.5608 4 14.7858 4 13.8897ZM12 19C11.5221 19 11.1267 18.6286 11.1267 18.1604V11.056C10.3357 10.725 9.77549 9.94995 9.77549 9.05382C9.77549 8.1577 10.3357 7.38267 11.1267 7.05167V4.82347C11.1267 4.37944 11.5304 4 12 4C12.4779 4 12.8733 4.37137 12.8733 4.82347V7.05167C13.6643 7.38267 14.2163 8.1577 14.2163 9.05382C14.2163 9.94995 13.6643 10.725 12.8733 11.056V18.1604C12.8733 18.6286 12.4779 19 12 19ZM15.551 13.8897C15.551 12.9935 16.1112 12.2266 16.9022 11.8875V4.83961C16.9022 4.37944 17.3059 4 17.7673 4C18.2451 4 18.6406 4.37137 18.6406 4.83961V11.8875C19.4398 12.2185 20 12.9935 20 13.8897C20 14.7858 19.4398 15.5608 18.6406 15.8918V18.1846C18.6406 18.6286 18.2533 19 17.7673 19C17.2976 19 16.9022 18.6286 16.9022 18.1846V15.8918C16.1112 15.5608 15.551 14.7858 15.551 13.8897ZM10.9537 9.05382C10.9537 9.63509 11.415 10.0791 12 10.0791C12.5932 10.0791 13.0381 9.63509 13.0381 9.05382C13.0381 8.4887 12.5932 8.02853 12 8.02853C11.415 8.02853 10.9537 8.4887 10.9537 9.05382ZM5.17817 13.8897C5.17817 14.4709 5.64779 14.915 6.22451 14.915C6.81771 14.915 7.27085 14.4709 7.27085 13.8897C7.27085 13.3245 6.81771 12.8644 6.22451 12.8644C5.64779 12.8644 5.17817 13.3245 5.17817 13.8897ZM16.7291 13.8897C16.7291 14.4709 17.1988 14.915 17.7755 14.915C18.3687 14.915 18.8218 14.4709 18.8218 13.8897C18.8218 13.3245 18.3687 12.8644 17.7755 12.8644C17.1988 12.8644 16.7291 13.3245 16.7291 13.8897Z"
                  fill="black"
                />
              </svg>
            </div>
            <strong style={{ fontFamily: fontBrand }}>Custom Workout</strong>
          </div>

          <h3
            style={{
              // color: headingDarkPrimaryColor,
              fontFamily: fontBrand,
            }}
          >
            My Plan
          </h3>
          <div
            className="weekly-progress-card"
            style={{
              borderColor: withAlpha(brandPrimaryColor, 0.16),
              // borderRadius: clampRadius(buttonRadius, 8),
            }}
          >
            <div className="weekly-progress-card__header">
              <div
                className="weekly-progress-card__cal-badge"
                style={{ backgroundColor: "#8C25F4" }}
                aria-hidden
              >
                <CalendarIcon />
              </div>
              <div className="weekly-progress-card__titles">
                <p
                  className="weekly-progress-card__range"
                  style={{
                    color: textDarkSecondaryColor,
                    fontFamily: fontSystem,
                  }}
                >
                  Oct 23 — Oct 29
                </p>
                <p
                  className="weekly-progress-card__title"
                  style={{ fontFamily: fontBrand }}
                >
                  Weekly Progress
                </p>
              </div>
              <button
                type="button"
                className="weekly-progress-card__chevron-btn"
                aria-label="Weekly progress options"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M2.7 4.2a.75.75 0 0 1 1.05 0L6 6.45 8.25 4.2a.75.75 0 0 1 1.05 1.05l-2.7 2.7a.75.75 0 0 1-1.05 0l-2.7-2.7a.75.75 0 0 1 0-1.05Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <div className="weekly-progress-card__bar" aria-hidden>
              <div className="weekly-progress-card__bar-fill" />
              <div className="weekly-progress-card__bar-rest" />
              <div className="weekly-progress-card__bar-rest" />
            </div>

            <div className="weekly-progress-card__coach">
              <div className="weekly-progress-card__coach-row">
                <div className="weekly-progress-card__avatar-wrap">
                  <img
                    alt=""
                    className="weekly-progress-card__avatar"
                    src={publicAssetPath("/images/platform/exercises.webp")}
                    draggable={false}
                  />
                </div>
                <p
                  className="weekly-progress-card__coach-eyebrow"
                  style={{
                    color: headingDarkPrimaryColor,
                    fontFamily: fontSystem,
                  }}
                >
                  Let&apos;s get moving
                </p>
              </div>
              <p
                className="weekly-progress-card__coach-copy"
                style={{
                  color: textDarkSecondaryColor,
                  fontFamily: fontSystem,
                }}
              >
                Your plan is ready—start this week strong and take the first
                step!
              </p>
            </div>
          </div>
        </div>

        <div
          className="footer-buttons"
          style={{
            background: `linear-gradient(180deg, ${withAlpha(
              bgPrimaryColor,
              0
            )} 0%, ${bgPrimaryColor} 32%)`,
          }}
        >
          <button
            className="button"
            style={{
              background: `linear-gradient(90deg, ${brandPrimaryColor} 0%, ${brandSecondaryColor} 100%)`,
              borderRadius: buttonRadius,
              fontFamily: fontSystem,
            }}
            type="button"
          >
            <SparkleIcon />
            <span>Ask Coach</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default HomeScreen;
