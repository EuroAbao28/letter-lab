/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "2xs": "10px",
      },
      colors: {
        customGreen: "#34C759 ",
        customBlue: "#007AFF",
        customRed: "#FF3B30",
        customYellow: "#FFCC00",

        customDarkGray: "#707379",
        customLightGray: "#b8b9bd",
        customMidGray: "#a3a4a8",
      },
      boxShadow: {
        customShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 8px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        customShadowInner: "rgba(0, 0, 0, 1) 2px 2px 11.5px -5px inset",
      },
      keyframes: {
        customBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        customShowing: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        customBounce: "customBounce 3s ease-in-out infinite",
        customShowing: "customShowing .5s ease-in-out forwards",
      },
    },
  },
  plugins: [require("daisyui")],
};
