import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        addcart: "var(--addcart)",
        hover: "var(--hover)",
        hover2: "var(--hover2)",
        neutral: "var(--neutral)",
        header: "var(--header)",
        footer: "var(--footer)",
        green: "var(--green)",
        star: "var(--star)",
        shadow: "var(--shadow)",
      },
    },
  },
  plugins: [],
} satisfies Config;
