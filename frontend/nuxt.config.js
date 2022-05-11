export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Globaal page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Art by Hargreaves",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/circle.ico" },
      { rel: "stylesheet", href: "https://use.typekit.net/jsv2ezb.css" },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/main.scss"],

  // Pugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  components: [
    "~/components",
    { path: "~/components/navigation" },
    { path: "~/components/icons" },
    { path: "~/components/animations" },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["gsap"],
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BACKEND_URL,
    },
  },
};
