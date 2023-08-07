/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          n: {
            20: "var(--neutral-n-20)",
            50: "var(--neutral-n-50)",
            80: "var(--neutral-n-80)",
          },
        },
        primary: {
          60: "var(--primary-br-60)",
          DEFAULT: "var(--primary-br-70-main-color)",
          80: "var(--primary-br-80)",
        },
      },
      fontSize: {
        body1: "0.8rem",
        body2: "1rem",
        subtitle2: [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.1px",
            fontWeight: "500",
          },
        ],

        subtitle1: [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "0.15px",
            fontWeight: "400",
          },
        ],
        body2: [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.25px",
            fontWeight: "400",
          },
        ],
        caption: [
          "12px",
          {
            lineHeight: "18px",
            letterSpacing: "0.4px",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
};
