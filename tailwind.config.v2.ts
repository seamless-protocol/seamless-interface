/**
 * Converts pixel values to rem units.
 *
 * @param {number} px - The pixel value to convert.
 * @param {number} baseFontSize - The base font size in pixels. Default is 16.
 * @returns {string} The value in rem units.
 */
export function pxToRem(px: number, baseFontSize = 16) {
  return `${px / baseFontSize}rem`;
}

const FONT_PRIMARY = "Titillium Web, Arial";
const FONT_SECONDARY = "Nunito, Arial";

/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: ["light"],
    defaultTheme: "light",
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxsm: "520px",
        xsm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
        xxxl: "1800px",
      },
      borderWidth: {
        thinest: "0.1px",
        thin: "0.67px",
      },
      colors: {
        primary: {
          main: "#0000FF",
          light: "#0000FF",
          dark: "#0000FF",
          contrast: "#0000FFFFF",
        },
        secondary: {
          main: "#0000FF",
          light: "#0000FF",
          dark: "#0000FF",
        },
        error: {
          main: "#0000FF",
          light: "#0000FF",
          dark: "#0000FF",
          100: "#0000FF",
          200: "#0000FF",
        },
        warning: {
          main: "#0000FF",
          light: "#0000FF",
          dark: "#C67F15",
          100: "#63400A",
          200: "#FEF5E8",
        },
        info: {
          main: "#0000FF",
          light: "#0000FF",
          dark: "#0288D1",
          100: "#002754",
          200: "#E5EFFB",
        },
        success: {
          main: "#4CAF50",
          light: "#90FF95",
          dark: "#388E3C",
          100: "#1C4B1E",
          200: "#ECF8ED",
        },

        background: {
          default: "#0000FF",
          default2: "#fff",
          paper: "#0000FF",
          surface: "#0000FF",
          surface2: "#0000FF",
          surfaceLight: "#0000FF",
          subscribe: "#0000FF",
          base: "#0000FF",
          lifi: "#0000FF",
          header: "#0000FF",
          hover: "#0000FF",
          footer: "#0000FF",
          disabled: "#0000FF",
        },
        text: {
          primary: "#0000FF",
          secondary: "#000",
          disabled: "#D2D4DC",
          muted: "#000",
          highlight: "#383D51",
          links: "#0000FF",
          hover: "#0000FF",
          light: "#A5A8B6",
          dark: "#62677B",
        },
        gradients: {
          seamless:
            "linear-gradient(248.86deg, #CDF3A2 5%, #21E1E1 15%, #D69BDF 40%, #506FF3 91%)",
          seamlessFooter:
            "linear-gradient(248.86deg, #506FF3 1%, #CDF3A2 15%, #21E1E1 30%, #D69BDF 50%, #506FF3 81%)",
        },
        divider: "#EAEBEF",
        action: {
          active: "#8E92A3",
          hover: "#3AB0FF",
          selected: "#EAEBEF",
          disabled: "#BBBECA",
          disabledBackground: "#EAEBEF",
          focus: "#F1F1F3",
        },
        other: {
          standardInputLine: "#383D511F",
          borderButton: "#EBEBED1F",
        },
      },
      fontFamily: {
        primary: [FONT_PRIMARY],
        secondary: [FONT_SECONDARY],
      },
      fontSize: {
        display1: [
          pxToRem(32),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: "123.5%",
            letterSpacing: pxToRem(0.25),
            fontWeight: 700,
          },
        ],
        h1: [
          pxToRem(32), //28?
          {
            fontFamily: FONT_PRIMARY,
            fontWeight: 700,
            letterSpacing: pxToRem(0.25),
            lineHeight: "123.5%",
          },
        ],
        h2: [
          pxToRem(21),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: "133.4%",
            letterSpacing: "unset",
            fontWeight: 600,
          },
        ],
        h3: [
          pxToRem(18),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: "160%",
            letterSpacing: pxToRem(0.15),
            fontWeight: 600,
          },
        ],
        h4: [
          pxToRem(16),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: pxToRem(24),
            letterSpacing: pxToRem(0.15),
            fontWeight: 600,
          },
        ],
        body1: [
          pxToRem(14),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: pxToRem(20),
            letterSpacing: pxToRem(0.15),
            fontWeight: 600,
          },
        ],
        body2: [
          pxToRem(14),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: pxToRem(20),
            letterSpacing: pxToRem(0.15),
            fontWeight: 400,
          },
        ],
        subheader1: [
          pxToRem(14),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: pxToRem(20),
            letterSpacing: pxToRem(0.15),
            fontWeight: 600,
          },
        ],
        subheader2: [
          pxToRem(12),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: pxToRem(16),
            letterSpacing: pxToRem(0.1),
            fontWeight: 500,
          },
        ],
        subheader2Light: [
          pxToRem(12),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: pxToRem(16),
            letterSpacing: pxToRem(0.1),
            color: "#0000FF",
            fontWeight: 500,
          },
        ],
        description: [
          pxToRem(14),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: "143%",
            letterSpacing: pxToRem(0.15),
            fontWeight: 400,
          },
        ],
        buttonL: [
          pxToRem(16),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: pxToRem(24),
            letterSpacing: pxToRem(0.46),
            fontWeight: 500,
          },
        ],
        buttonM: [pxToRem(14), { lineHeight: pxToRem(24), fontWeight: 500 }],
        buttonS: [
          pxToRem(10),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: pxToRem(20),
            letterSpacing: pxToRem(0.46),
            textTransform: "uppercase",
            fontWeight: 600,
          },
        ],
        helperText: [
          pxToRem(10),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: pxToRem(12),
            letterSpacing: pxToRem(0.4),
            fontWeight: 400,
          },
        ],
        tooltip: [
          pxToRem(12),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: pxToRem(16),
            letterSpacing: pxToRem(0.15),
            fontWeight: 400,
          },
        ],
        main21: [
          pxToRem(21),
          {
            fontFamily: FONT_PRIMARY,
            lineHeight: "133.4%",
            fontWeight: 800,
            fontSize: pxToRem(21),
          },
        ],
        secondary21: [
          pxToRem(21),
          {
            fontFamily: FONT_PRIMARY,
            fontWeight: 500,
            lineHeight: "133.4%",
            fontSize: pxToRem(21),
          },
        ],
        main16: [
          pxToRem(16),
          {
            fontFamily: FONT_PRIMARY,
            fontWeight: 600,
            letterSpacing: pxToRem(0.15),
            lineHeight: pxToRem(24),
            fontSize: pxToRem(16),
          },
        ],
        secondary16: [
          pxToRem(16),
          {
            fontFamily: FONT_PRIMARY,
            fontWeight: 500,
            letterSpacing: pxToRem(0.15),
            lineHeight: pxToRem(24),
            fontSize: pxToRem(16),
          },
        ],
        main14: [
          pxToRem(14),
          {
            fontFamily: FONT_PRIMARY,
            fontWeight: 600,
            letterSpacing: pxToRem(0.15),
            lineHeight: pxToRem(20),
            fontSize: pxToRem(14),
          },
        ],
        secondary14: [
          pxToRem(14),
          {
            fontFamily: FONT_PRIMARY,
            fontWeight: 500,
            letterSpacing: pxToRem(0.15),
            lineHeight: pxToRem(20),
            fontSize: pxToRem(14),
          },
        ],
        main12: [
          pxToRem(12),
          {
            fontFamily: FONT_PRIMARY,
            fontWeight: 600,
            letterSpacing: pxToRem(0.1),
            lineHeight: pxToRem(16),
            fontSize: pxToRem(12),
          },
        ],
        secondary12: [
          pxToRem(12),
          {
            fontFamily: FONT_PRIMARY,
            fontWeight: 500,
            letterSpacing: pxToRem(0.1),
            lineHeight: pxToRem(16),
            fontSize: pxToRem(12),
          },
        ],
        caption: [
          pxToRem(12),
          {
            fontFamily: FONT_PRIMARY,
            fontWeight: 400,
            letterSpacing: pxToRem(0.15),
            lineHeight: pxToRem(16),
            fontSize: pxToRem(12),
          },
        ],
      },
    },
  },
  // require("@tailwindcss/typography"), require("daisyui")
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
