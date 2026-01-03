import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#020617",
        card: "#0F172A",
        primary: "#6366F1",
        secondary: "#8B5CF6",
        muted: "#94A3B8",
      },
    },
  },
  plugins: [],
};

export default config;
