// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    // baseURL: "/pinecone.github.io/",
    // buildAssetsDir: "assets",
    head: {
      title: "Pinecone",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  srcDir: "src/",
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
  ],
  css: ["~/assets/scss/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    typeCheck: true,
  },
  icon: {
    serverBundle: {
      collections: ["uil"],
    },
  },
  fonts: {
    assets: {
      prefix: "/fonts/",
    },
  },
  i18n: {
    // baseUrl: "/pinecone.github.io/",
    defaultLocale: "en",
    locales: [
      { code: "en", language: "en-US", name: "English", file: "en.json" },
      { code: "sr", language: "sr-RS", name: "Srpski", file: "sr.json" },
    ],
    strategy: "no_prefix",
  },
  veeValidate: {
    autoImports: true,
  },
});
