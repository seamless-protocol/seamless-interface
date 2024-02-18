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

const FONT = "Inter, Arial";

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
        thin: "0.1px",
      },
      colors: {
        primary: {
          main: "#383D51",
          light: "#62677B",
          dark: "#292E41",
          contrast: "#FFFFFF",
        },
        secondary: {
          main: "#FF607B",
          light: "#F6A5C0",
          dark: "#AA647B",
        },
        error: {
          main: "#BC0000B8",
          light: "#D26666",
          dark: "#BC0000",
          100: "#4F1919",
          200: "#F9EBEB",
        },
        warning: {
          main: "#F89F1A",
          light: "#FFCE00",
          dark: "#C67F15",
          100: "#63400A",
          200: "#FEF5E8",
        },
        info: {
          main: "#0062D2",
          light: "#4FC3F7",
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
          default: "#F8F0E5",
          paper: "#FFF",
          surface: "#77037B",
          surface2: "#3AB0FF",
          surfaceLight: "#B06FB3",
          subscribe: "#fbbf24",
          base: "#0455ff",
          lifi: "#F5B5FF",
          header: "#0C356A",
          hover: "#234B80",
          footer: "#0C356A",
          disabled: "#EAEBEF",
        },
        text: {
          primary: "#FFF",
          secondary: "#000",
          disabled: "#D2D4DC",
          muted: "#000",
          highlight: "#383D51",
          links: "#FFF",
          hover: "#FFF",
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
        },
      },
      fontFamily: {
        inter: [FONT],
      },
      fontSize: {
        display1: [
          pxToRem(32),
          {
            fontFamily: FONT,
            lineHeight: "123.5%",
            letterSpacing: pxToRem(0.25),
            fontWeight: 700,
          },
        ],
        h1: [
          pxToRem(32), //28?
          {
            fontFamily: FONT,
            fontWeight: 700,
            letterSpacing: pxToRem(0.25),
            lineHeight: "123.5%",
          },
        ],
        h2: [
          pxToRem(21),
          {
            fontFamily: FONT,
            lineHeight: "133.4%",
            letterSpacing: "unset",
            fontWeight: 600,
          },
        ],
        h3: [
          pxToRem(18),
          {
            fontFamily: FONT,
            lineHeight: "160%",
            letterSpacing: pxToRem(0.15),
            fontWeight: 600,
          },
        ],
        h4: [
          pxToRem(16),
          {
            fontFamily: FONT,
            lineHeight: pxToRem(24),
            letterSpacing: pxToRem(0.15),
            fontWeight: 600,
          },
        ],
        body1: [
          pxToRem(14),
          {
            fontFamily: FONT,
            lineHeight: pxToRem(20),
            letterSpacing: pxToRem(0.15),
            fontWeight: 600,
          },
        ],
        body2: [
          pxToRem(14),
          {
            fontFamily: FONT,
            lineHeight: pxToRem(20),
            letterSpacing: pxToRem(0.15),
            fontWeight: 400,
          },
        ],
        subheader1: [
          pxToRem(14),
          {
            fontFamily: FONT,
            lineHeight: pxToRem(20),
            letterSpacing: pxToRem(0.15),
            fontWeight: 600,
          },
        ],
        subheader2: [
          pxToRem(12),
          {
            fontFamily: FONT,
            lineHeight: pxToRem(16),
            letterSpacing: pxToRem(0.1),
            fontWeight: 500,
          },
        ],
        subheader2Light: [
          pxToRem(12),
          {
            fontFamily: FONT,
            lineHeight: pxToRem(16),
            letterSpacing: pxToRem(0.1),
            color: "#FFF",
            fontWeight: 500,
          },
        ],
        description: [
          pxToRem(14),
          {
            fontFamily: FONT,
            lineHeight: "143%",
            letterSpacing: pxToRem(0.15),
            fontWeight: 400,
          },
        ],
        buttonL: [
          pxToRem(16),
          {
            fontFamily: FONT,
            lineHeight: pxToRem(24),
            letterSpacing: pxToRem(0.46),
            fontWeight: 500,
          },
        ],
        buttonM: [pxToRem(14), { lineHeight: pxToRem(24), fontWeight: 500 }],
        buttonS: [
          pxToRem(10),
          {
            fontFamily: FONT,
            lineHeight: pxToRem(20),
            letterSpacing: pxToRem(0.46),
            textTransform: "uppercase",
            fontWeight: 600,
          },
        ],
        helperText: [
          pxToRem(10),
          {
            fontFamily: FONT,
            lineHeight: pxToRem(12),
            letterSpacing: pxToRem(0.4),
            fontWeight: 400,
          },
        ],
        tooltip: [
          pxToRem(12),
          {
            fontFamily: FONT,
            lineHeight: pxToRem(16),
            letterSpacing: pxToRem(0.15),
            fontWeight: 400,
          },
        ],
        main21: [
          pxToRem(21),
          {
            fontFamily: FONT,
            lineHeight: "133.4%",
            fontWeight: 800,
            fontSize: pxToRem(21),
          },
        ],
        secondary21: [
          pxToRem(21),
          {
            fontFamily: FONT,
            fontWeight: 500,
            lineHeight: "133.4%",
            fontSize: pxToRem(21),
          },
        ],
        main16: [
          pxToRem(16),
          {
            fontFamily: FONT,
            fontWeight: 600,
            letterSpacing: pxToRem(0.15),
            lineHeight: pxToRem(24),
            fontSize: pxToRem(16),
          },
        ],
        secondary16: [
          pxToRem(16),
          {
            fontFamily: FONT,
            fontWeight: 500,
            letterSpacing: pxToRem(0.15),
            lineHeight: pxToRem(24),
            fontSize: pxToRem(16),
          },
        ],
        main14: [
          pxToRem(14),
          {
            fontFamily: FONT,
            fontWeight: 600,
            letterSpacing: pxToRem(0.15),
            lineHeight: pxToRem(20),
            fontSize: pxToRem(14),
          },
        ],
        secondary14: [
          pxToRem(14),
          {
            fontFamily: FONT,
            fontWeight: 500,
            letterSpacing: pxToRem(0.15),
            lineHeight: pxToRem(20),
            fontSize: pxToRem(14),
          },
        ],
        main12: [
          pxToRem(12),
          {
            fontFamily: FONT,
            fontWeight: 600,
            letterSpacing: pxToRem(0.1),
            lineHeight: pxToRem(16),
            fontSize: pxToRem(12),
          },
        ],
        secondary12: [
          pxToRem(12),
          {
            fontFamily: FONT,
            fontWeight: 500,
            letterSpacing: pxToRem(0.1),
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
