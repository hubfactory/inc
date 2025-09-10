// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],
  css: [
    '~/assets/css/normalize.css',
    '~/assets/css/base.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/variables.scss" as *;'
        }
      }
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap'
        }
      ]
    }
  }
})