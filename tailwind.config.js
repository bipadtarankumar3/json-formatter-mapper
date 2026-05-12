/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#38bdf8",
          glow: "rgba(56, 189, 248, 0.4)",
        },
        secondary: "#0f172a",
        accent: {
          DEFAULT: "#8b5cf6",
          glow: "rgba(139, 92, 246, 0.4)",
        },
        success: "#10b981",
        muted: "#94a3b8",
        glass: {
          DEFAULT: "rgba(15, 23, 42, 0.7)",
          border: "rgba(255, 255, 255, 0.08)",
        }
      },
      boxShadow: {
        premium: "0 0 50px -12px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
        'blob-float': 'blob-float 20s infinite alternate cubic-bezier(0.45, 0, 0.55, 1)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(56, 189, 248, 0.4))', transform: 'scale(1)' },
          '50%': { filter: 'drop-shadow(0 0 15px #38bdf8)', transform: 'scale(1.05)' },
        },
        'blob-float': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(50px, 100px) scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
