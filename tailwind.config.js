/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        showroom: {
          bg: "#FAF9F6",
          card: "#FFFFFF",
          surface: "#F3F1EA",
          border: "#E5E2D9",
          borderDark: "#333330",
          text: "#181716",
          muted: "#666460",
          accent: "#2A362B", // Muted Deep Olive / Forest
          accentHover: "#1E271F",
          cognac: "#8C5238",
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
