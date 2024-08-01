/** @type {import('tailwindcss').Config} */
// import plugin from "tailwindcss/line-clamp";
import flowbite from "flowbite-react/tailwind";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primarygray: "#f8f8f8",
        // qblack: "#222222",
        // qyellow: "#FFBB38",
        qred: "#EF262C",
        qgray: "#797979",
        qblacktext: "#1D1D1D",
        qgraytwo: "#8E8E8E",
        "qgray-border": "#EFEFEF",
        "qblue-white": "#CBECFF",
        "qh2-green": "#2D6F6D",
        "qh4-pink": "#FDB2BB",
        "qh5-bwhite": "#95D7DE",
        // "qh3-blue": "#1868D5",
        "bleu-logo": "#0678d8",
        "bleu-claire": "#09aef8",
        "qh3-blue": "#1a56db",
        qyellow: "#ffc107",
        qblack: "#000000",
        qwhite: "#ffffff",
      },
      scale: {
        60: "0.6",
      },
    },
  },
  variants: {
    extend: {
      textColor: ["focus-within"],
      borderStyle: ["last"],
    },
  },
  plugins: [require("flowbite-react/tailwind")],
};
