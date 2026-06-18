/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00A86B", // Nextdoor-like green as primary
        primaryHover: "#008F5A",
        primaryLight: "#E6F7F0",
        secondary: "#1E3A8A", // Deep blue for accent
        accent: "#F59E0B", // Warm amber for highlights
        background: "#F8FAFC",
        card: "#FFFFFF",
        border: "#E2E8F0",
        text: {
          DEFAULT: "#0F172A",
          secondary: "#64748B",
          muted: "#94A3B8"
        }
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
};
