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

      gridTemplateColumns: {
        22: "repeat(22, minmax(0, 1fr))",
      },

      borderWidth: {
        thin: "1.3px",
      },
      boxShadow: {
        card: "0px 4px 16px 0px rgba(162, 162, 162, 0.08)",
        button: "0px 4px 16px 0px rgba(162, 162, 162, 0.08)",
      },
      borderRadius: {
        card: "16px",
      },

      rotate: {
        "180": "180deg",
      },
      colors: {
        // #DECFFC : the color for the selected box on the left side rolodex + the color for the summary section on the right side
        // #FCF8CF : the background for the label for LEND
        // #CFFCF5 : the background for the label for ILM
        // #E4F7E6 : the color for the background of the token rewards APY %
        smallElements: {
          lend: "#FCF8CF",
          ilm: "#CFFCF5",
          rewardAPY: "#E4F7E6",
        },

        tags: {
          red: "#FD6F41",
          blue: "#4F68F7",
          gray: "rgba(11, 37, 79, 0.10))",
        },

        background: {
          default: "#F3F7FB",
          selected: "#DECFFC",

          default1: "#F8F0E5",
          paper: "#FFF",
          surface: "#77037B",
          surface2: "#3AB0FF",
          surfaceLight: "#B06FB3",
          base: "#0455ff",
          lifi: "#F5B5FF",
          header: "#0C356A",
          hover: "#234B80",
          footer: "#0C356A",
          disabled: "#EAEBEF",
          capacity: "#F7E9E4",
        },
        neutral: {
          1000: "#000",
          100: "#F3F7FB",
          0: "#FFF",
        },
        text: {
          footer: "#FAFAFA",

          primary: "#FFF",
          secondary: "#000",
          disabled: "#D2D4DC",
          muted: "#000",
          highlight: "#383D51",
          links: "#FFF",
          hover: "#FFF",
          light: "#A5A8B6",
          dark: "#62677B",
          notSelected: "#6D7C95",
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

        successv2: {
          900: "#2A863B",
        },

        primaryv2: {
          400: "rgba(11, 37, 79, 0.40))",
        },

        errorv2: {
          1000: "#A9252B",
        },

        // v1

        primary: {
          main: "#383D51",
          light: "#62677B",
          dark: "#292E41",
          contrast: "#FFFFFF",
          600: "rgba(11, 37, 79, 0.60)",
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

        gradients: {
          seamless: "linear-gradient(248.86deg, #CDF3A2 5%, #21E1E1 15%, #D69BDF 40%, #506FF3 91%)",
          seamlessFooter: "linear-gradient(248.86deg, #506FF3 1%, #CDF3A2 15%, #21E1E1 30%, #D69BDF 50%, #506FF3 81%)",
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
      backgroundImage: () => ({
        metalic: "radial-gradient(110.21% 100.08% at 46.09% 0%, #22457E 0%, #0C2752 93%)",
        purpleRadial: "radial-gradient(131.63% 131.63% at 17.5% 0%, #FFBFFF 0%, #4F68F7 100%)",
        holographic: "linear-gradient(97deg, #D53BD9 2.08%, #7770DA 50.55%, #5CBDE6 100%)",
        blueGradient: "linear-gradient(95deg, #2865B2 0%, #2056A9 53.37%, #01176E 100%)",
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

        medium7: [pxToRem(40), { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" }],
        medium6: [pxToRem(32), { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" }],
        medium5: [pxToRem(24), { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" }],
        medium4: [pxToRem(20), { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" }],
        medium3: [pxToRem(16), { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" }],
        medium2: [pxToRem(14), { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" }],
        medium1: [pxToRem(12), { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" }],
        medium: [pxToRem(10), { fontFamily: FONT_PRIMARY, fontWeight: 500, lineHeight: "130%" }],

        // Regular configurations
        regular7: [pxToRem(40), { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" }],
        regular6: [pxToRem(32), { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" }],
        regular5: [pxToRem(24), { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" }],
        regular4: [pxToRem(20), { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" }],
        regular3: [pxToRem(16), { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" }],
        regular2: [pxToRem(14), { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" }],
        regular1: [pxToRem(12), { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" }],
        regular: [pxToRem(10), { fontFamily: FONT_PRIMARY, fontWeight: 400, lineHeight: "130%" }],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
