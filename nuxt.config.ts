// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    baseURL: '/pinecone.github.io/',
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: "src/",
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@pinia/nuxt',
  ],
  css: ['~/assets/scss/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  typescript: {
    typeCheck: true
  },
  icon: {
    serverBundle: {
      collections: ['uil']
    }
  }
})