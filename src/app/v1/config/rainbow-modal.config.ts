import { Theme, lightTheme } from "@rainbow-me/rainbowkit";

const ltheme = lightTheme();
export const myRainbowkitThemeConfig: Theme = {
  ...ltheme,
  fonts: {
    ...ltheme.fonts,
    body: "Inter, Arial",
  },
  radii: {
    modal: "4px",
    modalMobile: "4px",
    menuButton: "4px",
    actionButton: "4px",
    connectButton: "4px",
  },
};
