import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}", // safe even if unused
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
