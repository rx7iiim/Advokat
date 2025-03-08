import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      "primary": "#0000FF",
      "secondary": "#",
      "customGray": "#0000FF",
      "boxColor": "#E9F2FF",
      "boxColor2":"#C5D8F6",
     "fotColor": "#0A0B5C" , 
     "emailColor" : "#E8F1FF", 
     "colorGradient": "#01E4FF",

      },
    },
  },
  plugins: [],
} satisfies Config;
