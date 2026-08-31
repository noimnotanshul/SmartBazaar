import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: "#FF9933",
        "india-blue": "#2874F0",
        "india-green": "#388E3C",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["Poppins", "Noto Sans Devanagari", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "block-print": "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\"><rect width=\"20\" height=\"20\" fill=\"%23FF9933\" opacity=\"0.05\"/><rect x=\"20\" width=\"20\" height=\"20\" fill=\"%232874F0\" opacity=\"0.05\"/><rect y=\"20\" width=\"20\" height=\"20\" fill=\"%232874F0\" opacity=\"0.05\"/><rect x=\"20\" y=\"20\" width=\"20\" height=\"20\" fill=\"%23388E3C\" opacity=\"0.05\"/></svg>')",
      },
      keyframes: {
        "spin-wheel": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scratch-off": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "spin-wheel": "spin-wheel 3s linear",
        "scratch-off": "scratch-off 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
