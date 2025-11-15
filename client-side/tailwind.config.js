/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        prim: "#FF7043",
      },
      // linear-gradient colors for background color
      backgroundImage: {
        grad1: "linear-gradient(to right, #FF7043, #FFDAB9)",
      },
      fontFamily: {
        logofont: ["Pacifico", "cursive"],
      },
      keyframes: {
        rightToLeft: {
          "0%": { transform: "translateX(60px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
    screens: {
      "max-2xl": { max: "1536px" }, // Large screens
      "max-xl": { max: "1280px" }, // Desktops

      "max-1170": { max: "1170px" }, // Custom breakpoint between xl and lg

      "max-lg": { max: "1024px" }, // Small laptops
      "max-md": { max: "768px" }, // Tablets
      "max-sm": { max: "640px" }, // Small tablets
      "max-xs": { max: "480px" }, // Phones (smallest → applied LAST)
    },
  },
  plugins: [],
};
