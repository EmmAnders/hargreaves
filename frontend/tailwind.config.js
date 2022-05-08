module.exports = {
  purge: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`,
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        theme: {
          background: "var(--themeBackground)",
          color: "var(--themeColor)",
          hover: "var(--themeHover)",
          grey: "var(--themeGrey)",
          "acccent-color": "var(--themeAccentColor)",
        },
      },
      screens: {
        "3xl": "1440px",
        "4xl": "1680px",
        "5xl": "1920px",
        "6xl": "2560px",
      },
      gap: {
        100: "30vh",
      },

      spacing: {
        "2/3": "66.666667%",
      },
    },
  },

  variants: {
    rotate: ["responsive", "hover", "focus", "active", "group-hover"],
  },
  /*   plugins: [require("tailwindcss-aspect-ratio")], */
};
