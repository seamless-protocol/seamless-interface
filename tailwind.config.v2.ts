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

const FONT_PRIMARY = "Satoshi Variable, Arial";

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
      borderWidth: {},
      borderRadius: {
        card: "16px",
      },
      colors: {
        background: {
          default: "#F3F7FB",
        },
        neutral: {
          1000: "#000",
          100: "#F3F7FB",
          0: "#FFF",
        },
        navy: {
          1000: "#0B254F",
          600: "rgba(11, 37, 79, 0.60)",
          400: "rgba(11, 37, 79, 0.40)",
          100: "rgba(11, 37, 79, 0.10)",
        },
        green: {
          1000: "#1F662C",
          900: "#2A863B",
          600: "#6EBD70",
          100: "#E4F7E6",
        },
        gradients: {
          seamless:
            "linear-gradient(248.86deg, #CDF3A2 5%, #21E1E1 15%, #D69BDF 40%, #506FF3 91%)",
          seamlessFooter:
            "linear-gradient(248.86deg, #506FF3 1%, #CDF3A2 15%, #21E1E1 30%, #D69BDF 50%, #506FF3 81%)",
        },
      },
      fontFamily: {
        primary: [FONT_PRIMARY],
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
