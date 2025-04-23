import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { 
      fontSize: {
        "2xs": "8px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0000FF",
        secondary: "#FF00FF", // ✅ Use a valid color here
        customGray: "#0000FF",
        boxColor: "#E9F2FF",
        boxColor2: "#C5D8F6",
        fotColor: "#0A0B5C",
        emailColor: "#E8F1FF",
        colorGradient: "#01E4FF",
      },
      fontFamily: {
        cinzel: ['Cinzel Decorative', 'sans-serif'],
        mona: ['Mona Sans', 'sans-serif'],
      },
    },
    screens: {
      xsm: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
} satisfies Config;
