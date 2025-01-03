import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        kaiglo_grey: {
          base: "#475467",
          disabled: "#EAECF0",
          placeholder: "#A3A3A3",
          50: "#F9FAFB",
          100: "#F2F4F7",
          500: "#98A2B3",
          700: "#344054",
        },
        kaiglo_brand: {
          base: "#007A49",
          900: "#006139",
          800: "#008F53",
          700: "#00BD6E",
          600: "#00EB89",
          500: "#1AFF9F",
          400: "#47FFB3",
          300: "#75FFC6",
          200: "#A3FFD9",
          100: "#D1FFEC",
          50: "#E5FFF4",
        },
        kaiglo_info: {
          base: "#1C73DC",
          900: "#0B2E56",
          800: "#10447E",
          700: "#165AA7",
          600: "#1B6FD0",
          500: "#3486E5",
          400: "#5D9EEA",
          300: "#85B7EF",
          200: "#AECFF4",
          100: "#D6E7FA",
          50: "#E8F2FC",
        },
        kaiglo_success: {
          base: "#008000",
          900: "#006100",
          800: "#008F00",
          700: "#00BD00",
          600: "#00EB00",
          500: "#1AFF1A",
          400: "#47FF47",
          300: "#75FF75",
          200: "#A3FFA3",
          100: "#D1FFD1",
          50: "#E5FFE5",
        },
        kaiglo_attention: {
          base: "#FF6617",
          900: "#612000",
          800: "#8F3000",
          700: "#BD3F00",
          600: "#EB4E00",
          500: "#FF661A",
          400: "#FF8547",
          300: "#FFA375",
          200: "#FFC2A3",
          100: "#FFE0D1",
          50: "#FFEEE5",
        },
        kaiglo_critical: {
          base: "#FF242C",
          900: "#610005",
          800: "#8F0007",
          700: "#BD0009",
          600: "#EB000C",
          500: "#FF1A25",
          400: "#FF4751",
          300: "#FF757C",
          200: "#FFA3A8",
          100: "#FFD1D3",
          50: "#FFE5E7",
        },
        kaiglo_accent: {
          base: "#FFC12E",
          900: "#614400",
          800: "#8F6400",
          700: "#BD8400",
          600: "#EBA400",
          500: "#FFBA1A",
          400: "#FFC847",
          300: "#FFD675",
          200: "#FFE3A3",
          100: "#FFF1D1",
          50: "#FFF7E5",
        },
        kaiglo_purple: {
          base: "#8312C9",
          900: "#3A0859",
          800: "#550C83",
          700: "#7110AD",
          600: "#8C14D7",
          500: "#A22DEB",
          400: "#B557EF",
          300: "#DAABF7",
          200: "#DAABF7",
          100: "#ECD5FB",
          50: "#F5E8FD",
        },
        kaiglo_pink: {
          base: "#FE019A",
          900: "#60003C",
          800: "#8E0158",
          700: "#BC0174",
          600: "#E90190",
          500: "#FE1BA7",
          400: "#FE1BA7",
          300: "#FE76CA",
          200: "#FFA4DC",
          100: "#FFD1ED",
          50: "#FFE6F5",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/aspect-ratio"),
  ],
} satisfies Config;

export default config;
