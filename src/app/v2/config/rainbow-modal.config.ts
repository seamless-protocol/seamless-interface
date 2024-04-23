import { Theme, lightTheme } from "@rainbow-me/rainbowkit";

const ltheme = lightTheme();
export const myRainbowkitThemeConfigV2: Theme = {
  ...ltheme,
  fonts: {
    ...ltheme.fonts,
    body: "Satoshi, Arial",
  },
  radii: {
    modal: "12px",
    modalMobile: "12px",
    menuButton: "12px",
    actionButton: "12px",
    connectButton: "12px",
  },
};
