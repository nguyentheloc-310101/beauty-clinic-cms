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
      },
    },
  },
  plugins: [],
};
