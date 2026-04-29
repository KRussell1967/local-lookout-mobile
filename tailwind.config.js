/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        foreground: "#f8fafc",
        card: "#1e293b",
        "card-foreground": "#f8fafc",
        muted: "#334155",
        "muted-foreground": "#94a3b8",
        primary: "#3b82f6",
        "primary-foreground": "#ffffff",
        border: "#334155",
        destructive: "#ef4444"
      }
    }
  },
  plugins: []
};
