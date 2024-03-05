const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'header-black': '#2C2D31',
        'orange': '#E56643',
        'bg-black': '#15161A',
        'grey': '#1E1F23',
        'text-grey': '#B2B1B1',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        montserrat: 'montserrat',
        cabin: 'cabin',
        inter: 'inter',
      },
      boxShadow: {
        'shadow-block': '8px 8px 0px 0px rgb(229, 102, 67);',
      },
      width: {
        '182': '730px',
        '92': '371px',
        '108': '435px',
        '10%': '10%',
        '20%': '20%',
        '30%': '30%',
        '40%': '40%',
        '50%': '50%',
      },
      height: {
        '182': '730px',
        '92': '371px',
        '108': '455px',
        '100%': '100%',
        '100vh': '100vh',
        '10%': '10%',
        '20%': '20%',
      },
      margin: {
        '10%': '10%',
        '20%': '20%',
        '30%': '30%',
        '40%': '40%',
        '50%': '50%',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        orangeshadow: {
          '0%': { "box-shadow": 'none' },
          '100%': { "box-shadow": '8px 8px 0px 0px rgb(229, 102, 67);' },
        },
        wiggle: {
          '0%, 100%': { "top": '256px' },
          '50%': { "top": '260px' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        orangeshadow: 'orangeshadow 1s ease-in-out forwards',
        wiggle: 'wiggle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
