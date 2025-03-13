/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "rgb(var(--primary) / 0.05)",
          100: "rgb(var(--primary) / 0.1)",
          200: "rgb(var(--primary) / 0.2)",
          300: "rgb(var(--primary) / 0.3)",
          400: "rgb(var(--primary) / 0.4)",
          500: "rgb(var(--primary) / 0.5)",
          600: "rgb(var(--primary) / 0.6)",
          700: "rgb(var(--primary) / 0.7)",
          800: "rgb(var(--primary) / 0.8)",
          900: "rgb(var(--primary) / 0.9)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "rgb(var(--secondary) / 0.05)",
          100: "rgb(var(--secondary) / 0.1)",
          200: "rgb(var(--secondary) / 0.2)",
          300: "rgb(var(--secondary) / 0.3)",
          400: "rgb(var(--secondary) / 0.4)",
          500: "rgb(var(--secondary) / 0.5)",
          600: "rgb(var(--secondary) / 0.6)",
          700: "rgb(var(--secondary) / 0.7)",
          800: "rgb(var(--secondary) / 0.8)",
          900: "rgb(var(--secondary) / 0.9)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "rgb(var(--accent) / 0.05)",
          100: "rgb(var(--accent) / 0.1)",
          200: "rgb(var(--accent) / 0.2)",
          300: "rgb(var(--accent) / 0.3)",
          400: "rgb(var(--accent) / 0.4)",
          500: "rgb(var(--accent) / 0.5)",
          600: "rgb(var(--accent) / 0.6)",
          700: "rgb(var(--accent) / 0.7)",
          800: "rgb(var(--accent) / 0.8)",
          900: "rgb(var(--accent) / 0.9)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        scroll: "scroll 25s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-250px * 7))" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

