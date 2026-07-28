import type { CSSProperties } from "react";

export type MockTheme = {
  bgPrimaryColor: string;
  bgSecondaryColor: string;
  brandPrimaryColor: string;
  brandSecondaryColor: string;
  cardBackgroundImage: string;
  colorButtonPrimary: string;
  colorButtonSecondary: string;
  buttonRadius: number;
  cardRadius: number;
  fontBrand: string;
  fontSystem: string;
  headingDarkPrimaryColor: string;
  headingLightPrimaryColor: string;
  phoneShellStyle: CSSProperties;
  textDarkPrimaryColor: string;
  textDarkSecondaryColor: string;
};

const ASSET_BASE = "/images/b2b-land";

export const publicAssetPath = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // Original paths were /images/platform/... — remap into this experiment
  const remapped = normalized.replace(/^\/images\/platform/, ASSET_BASE);
  return remapped.startsWith(ASSET_BASE)
    ? remapped
    : `${ASSET_BASE}${normalized}`;
};

const SYSTEM_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif';

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

export const withAlpha = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const defaultMockTheme: MockTheme = {
  cardBackgroundImage: publicAssetPath("/images/platform/branded-bg/0.webp"),
  brandPrimaryColor: "#8C25F4",
  brandSecondaryColor: "#1A4CE5",
  headingDarkPrimaryColor: "#000000",
  headingLightPrimaryColor: "#FFFFFF",
  textDarkPrimaryColor: "#000000",
  textDarkSecondaryColor: "#7985A7",
  colorButtonPrimary: "#000000",
  colorButtonSecondary: "#F4F6FA",
  bgPrimaryColor: "#F4F6FA",
  bgSecondaryColor: "#FFFFFF",
  fontBrand: SYSTEM_FONT,
  fontSystem: SYSTEM_FONT,
  buttonRadius: 16,
  cardRadius: 24,
  phoneShellStyle: {
    background: "#F4F6FA",
    color: "#000000",
    fontFamily: SYSTEM_FONT,
  },
};
