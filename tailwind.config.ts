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
        primary: "#4db5ff",
        secondary: "#2c2c6c",
        red: "#ED4337",
        white: "#ffffff",
        black: "#000000",
        mediumGray: "#E8E9E8",
        lightGray: "#FCFCFC",
      },
    },
  },
  plugins: [],
};
export default config;
