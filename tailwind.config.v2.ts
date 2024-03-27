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

const FONT_PRIMARY = "Satoshi, Arial";

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
        xxl: "1440px",
        xxxl: "1800px",
      },
      borderWidth: {
        thin: "1.3px",
      },
      boxShadow: {
        card: "shadow-[0px_4px_16px_0px_rgba(162,162,162,0.08)]",
      },
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
        gradient: {
          start: "#D53BD9",
          middle: "#7770DA",
          end: "#5CBDE6",
        },
        metallicBorder: "#0C2752",
      },
      backgroundImage: () => ({
        metalic:
          "radial-gradient(110.21% 100.08% at 46.09% 0%, #22457E 0%, #0C2752 93%)",
        purpleRadial:
          "radial-gradient(131.63% 131.63% at 17.5% 0%, #FFBFFF 0%, #4F68F7 100%)",
        holographic:
          "linear-gradient(97deg, #D53BD9 2.08%, #7770DA 50.55%, #5CBDE6 100%)",
      }),
      fontFamily: {
        primary: [FONT_PRIMARY],
      },
      fontSize: {
        bold7: [
          pxToRem(40),
          {
            fontFamily: FONT_PRIMARY,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "130%",
          },
        ],
        bold6: [
          pxToRem(32),
          {
            fontFamily: FONT_PRIMARY,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "130%",
          },
        ],
        bold5: [
          pxToRem(24),
          {
            fontFamily: FONT_PRIMARY,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "130%",
          },
        ],
        bold4: [
          pxToRem(20),
          {
            fontFamily: FONT_PRIMARY,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "130%",
          },
        ],
        bold3: [
          pxToRem(16),
          {
            fontFamily: FONT_PRIMARY,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "130%",
          },
        ],
        bold2: [
          pxToRem(14),
          {
            fontFamily: FONT_PRIMARY,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "130%",
          },
        ],
        bold1: [
          pxToRem(12),
          {
            fontFamily: FONT_PRIMARY,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "130%",
          },
        ],
        bold: [
          pxToRem(10),
          {
            fontFamily: FONT_PRIMARY,
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "130%",
          },
        ],

        medium7: [
          pxToRem(40),
          { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" },
        ],
        medium6: [
          pxToRem(32),
          { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" },
        ],
        medium5: [
          pxToRem(24),
          { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" },
        ],
        medium4: [
          pxToRem(20),
          { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" },
        ],
        medium3: [
          pxToRem(16),
          { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" },
        ],
        medium2: [
          pxToRem(14),
          { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" },
        ],
        medium1: [
          pxToRem(12),
          { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" },
        ],
        medium: [
          pxToRem(10),
          { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" },
        ],

        // Regular configurations
        regular7: [
          pxToRem(40),
          { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" },
        ],
        regular6: [
          pxToRem(32),
          { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" },
        ],
        regular5: [
          pxToRem(24),
          { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" },
        ],
        regular4: [
          pxToRem(20),
          { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" },
        ],
        regular3: [
          pxToRem(16),
          { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" },
        ],
        regular2: [
          pxToRem(14),
          { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" },
        ],
        regular1: [
          pxToRem(12),
          { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" },
        ],
        regular0: [
          pxToRem(10),
          { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" },
        ],
      },
    },
  },
  // require("@tailwindcss/typography"), require("daisyui")
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
