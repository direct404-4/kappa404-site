import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05050a",
        panel: "#0d1021",
        line: "#1f2a58",
        cyan: "#7df2ff",
        violet: "#9f7bff",
        gold: "#ffb14a"
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
