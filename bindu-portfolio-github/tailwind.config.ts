import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        jet: {
          DEFAULT: "#08090D",
          deep: "#040507",
          surface: "#0E1017",
          border: "#1C2030",
        },
        blackberry: {
          DEFAULT: "#171B3A",
          light: "#212752",
          dark: "#0F1226",
          surface: "#1A1F42",
          border: "#2A3166",
        },
        royal: {
          DEFAULT: "#3B82F6",
          glow: "#60A5FA",
          dark: "#2563EB",
          muted: "rgba(59, 130, 246, 0.15)",
        },
        hyacinth: {
          DEFAULT: "#8B5CF6",
          glow: "#A78BFA",
          dark: "#7C3AED",
          muted: "rgba(139, 92, 246, 0.15)",
        },
        brand: {
          white: "#FFFFFF",
          muted: "#94A3B8",
          subtle: "#64748B",
          dark: "#08090D",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
        "brand-gradient-hover": "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
        "radial-glow": "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 80%)",
        "card-gradient": "linear-gradient(180deg, rgba(23, 27, 58, 0.7) 0%, rgba(15, 18, 38, 0.8) 100%)",
      },
      boxShadow: {
        "glow-royal": "0 0 25px -5px rgba(59, 130, 246, 0.35)",
        "glow-hyacinth": "0 0 25px -5px rgba(139, 92, 246, 0.35)",
        "glow-brand": "0 0 35px -5px rgba(99, 102, 241, 0.35)",
        "card-ambient": "0 20px 40px -15px rgba(8, 9, 13, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.05)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "glow-pulse": "glow 3s ease-in-out infinite alternate",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
