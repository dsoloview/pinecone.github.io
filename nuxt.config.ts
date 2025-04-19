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
      meta: [
        {
          name: "author",
          content: "Pinecone",
        },
      ],
    },
  },
  // debug: true,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  srcDir: "./src",
  serverDir: "./src/server",
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
    "nuxt-swiper",
    "@prisma/nuxt",
    "@nuxt/ui",
    "nuxt-auth-utils",
    "@pinia/nuxt",
  ],
  css: ["~/assets/scss/main.css"],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
    build: {
      sourcemap: true,
    },
    css: {
      devSourcemap: true,
    },
  },
  typescript: {
    typeCheck: false,
  },
  icon: {
    serverBundle: {
      collections: ["uil", "iconoir"],
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
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  veeValidate: {
    autoImports: true,
  },
  experimental: {
    payloadExtraction: false,
  },
  prisma: {
    generateClient: true,
    prismaRoot: "src/server/database",
    prismaSchemaPath: "src/server/database/prisma/schema.prisma",
  },
});
