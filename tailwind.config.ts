import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05050a",
        panel: "#0d1021",
        line: "#1f2a58",
        cyan: "#00f2ff",
        violet: "#bc13fe",
        gold: "#ffb14a",
        "primary-fixed": "#74f5ff",
        "on-surface-variant": "#b9cacb",
        "primary-container": "#00f2ff",
        "on-tertiary": "#5e0053",
        "on-error": "#690005",
        "tertiary-fixed": "#ffd7f0",
        "tertiary-container": "#ffcced",
        "surface-container-highest": "#353534",
        "surface-container-high": "#2a2a2a",
        "secondary-fixed": "#f8d8ff",
        "inverse-surface": "#e5e2e1",
        "tertiary-fixed-dim": "#fface8",
        "surface-tint": "#00dbe7",
        "inverse-primary": "#00696f",
        "on-tertiary-fixed": "#3a0032",
        surface: "#131313",
        "on-tertiary-container": "#af009c",
        "on-surface": "#e5e2e1",
        error: "#ffb4ab",
        "primary-fixed-dim": "#00dbe7",
        "error-container": "#93000a",
        "on-primary-fixed-variant": "#004f54",
        "on-secondary-fixed": "#320047",
        background: "#131313",
        primary: "#e1fdff",
        outline: "#849495",
        "on-error-container": "#ffdad6",
        "surface-container-low": "#1c1b1b",
        "surface-dim": "#131313",
        "surface-container-lowest": "#0e0e0e",
        "on-primary": "#00363a",
        "on-background": "#e5e2e1",
        "inverse-on-surface": "#313030",
        "on-primary-container": "#006a71",
        tertiary: "#fff5f8",
        "secondary-fixed-dim": "#ebb2ff",
        "secondary-container": "#b600f8",
        secondary: "#ebb2ff",
        "on-secondary-container": "#fff6fc",
        "on-secondary-fixed-variant": "#74009f",
        "on-secondary": "#520072",
        "on-primary-fixed": "#002022",
        "on-tertiary-fixed-variant": "#840076",
        "outline-variant": "#3a494b",
        "surface-bright": "#3a3939",
        "surface-variant": "#353534",
        "surface-container": "#201f1f"
      },
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px"
      },
      boxShadow: {
        glow: "0 0 60px rgba(125, 242, 255, 0.22)",
        card: "0 24px 60px rgba(4, 7, 20, 0.45)"
      },
      backgroundImage: {
        "mesh-gradient": "radial-gradient(circle at 20% 20%, rgba(102, 187, 255, 0.22), transparent 45%), radial-gradient(circle at 80% 35%, rgba(159, 123, 255, 0.24), transparent 50%), radial-gradient(circle at 50% 85%, rgba(255, 177, 74, 0.16), transparent 46%)"
      }
    }
  },
  plugins: []
};

export default config;
