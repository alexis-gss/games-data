export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-01-09',
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/device', 'shadcn-nuxt'],
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      ggUrl: process.env.GG_URL,
      igdbClientId: process.env.IGDB_ID,
      igdbClientSecret: process.env.IGDB_CLIENT_SECRET,
    }
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/themes.css'],
  tailwindcss: {
    configPath: '~/tailwind.config.js'
  },
  shadcn: {
    componentDir: './components/ui'
  }
})
