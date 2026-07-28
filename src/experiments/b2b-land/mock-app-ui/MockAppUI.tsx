import HomeScreen from "./HomeScreen";
import Preworkout from "./Preworkout";
import styles from "./styles.module.css";
import { defaultMockTheme } from "./themePreview";

export type MockScreen = "home" | "preworkout";

type MockAppUIProps = {
  screen?: MockScreen;
};

/** Static phone mock from b2b-developer theme preview — display only. */
export const MockAppUI = ({ screen = "home" }: MockAppUIProps) => {
  return (
    <div
      className={styles.root}
      aria-hidden="true"
      style={{
        height: 720,
        pointerEvents: "none",
        userSelect: "none",
        width: 340,
      }}
    >
      {screen === "home" ? (
        <HomeScreen theme={defaultMockTheme} />
      ) : (
        <Preworkout theme={defaultMockTheme} />
      )}
    </div>
  );
};

export default MockAppUI;
