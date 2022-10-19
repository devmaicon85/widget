/** @type {import('tailwindcss').Config} */
const tailwindcss = require("tailwindcss");
const plugin = require("tailwindcss/plugin");
module.exports = {
    content: ["./src/**/*.{tsx,html,jsx}"],
    safelist: [
        {
            pattern: /theme-([0-9]?[0-9])/,
            variants: ["bg", "focus", "hover", "ring"],
        },
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                theme: {
                    0: "#bd191f",
                    1: "#f44336",
                    2: "#e91e63",
                    3: "#9c27b0",
                    4: "#8257e5",
                    5: "#3f51b5",
                    6: "#2196f3",
                    7: "#03a9f4",
                    8: "#00bcd4",
                    9: "#006f85",
                    10: "#4caf50",
                    11: "#8bc34a",
                    12: "#cddc39",
                    13: "#edaf34",
                    14: "#ffc107",
                    15: "#ff9800",
                    16: "#ff5722",
                    17: "#795548",
                    18: "#607d8b",
                    19: "#585858",
                    20: "#191919",
                },

                dark: {
                    background: "#1f1f1f",
                    surface: {
                        primary: "#18181B",
                        secondary: "#27272A",
                        "secondary-hover": "#3F3F46",
                    },
                    text: {
                        primary: "#F4F4F5",
                        secondary: "#A1A1AA",
                    },
                    stroke: "#52525B",
                },
                light: {
                    background: "#fefefe",
                    surface: {
                        primary: "#FFFFFF",
                        secondary: "#F4F4F5",
                        "secondary-hover": "#E4E4E7",
                    },
                    text: {
                        primary: "#27272A",
                        secondary: "#71717A",
                    },
                    stroke: "#D4D4D8",
                },
            },
        },
    },

    plugins: [
        require("@tailwindcss/forms"),
        require("tailwind-scrollbar"),
        require("@tailwindcss/typography"),
    ],
};
