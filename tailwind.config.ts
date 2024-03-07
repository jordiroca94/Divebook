import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00308F",
        secondary: "#4db5ff",
        darkBlue: "#002D62",
        red: "#ED4337",
        white: "#ffffff",
        black: "#000000",
        gray: "#707070",
        mediumGray: "#E8E9E8",
        lightGray: "#FCFCFC",
      },
      padding: {
        header: "76px",
      },
    },
  },
  plugins: [],
};
export default config;
