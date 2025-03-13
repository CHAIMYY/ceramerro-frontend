/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}"],
	theme: {
	  extend: {
		colors: {
		  dark: {
			900: "#121212",
			800: "#1A1A1A",
			700: "#282828",
			600: "#404040",
			500: "#585858",
		  },
		  accent: {
			green: "#8FFF00",
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  clay: {
			50: "#faf5f0",
			100: "#f0e6d8",
			200: "#e1ccb4",
			300: "#d2b18f",
			400: "#c3976a",
			500: "#b47d45",
			600: "#9a6436",
			700: "#7d4e2b",
			800: "#613c22",
			900: "#452a18",
		  },
		  terracotta: {
			50: "#fcf4f2",
			100: "#f9e8e3",
			200: "#f3d1c7",
			300: "#ecb9aa",
			400: "#e6a18d",
			500: "#e08970",
			600: "#c76e54",
			700: "#a75743",
			800: "#864434",
			900: "#653226",
		  },
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
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		},
		fontFamily: {
		  display: ["var(--font-playfair)", "serif"],
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
  
  