export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-01-09',
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/device', 'shadcn-nuxt'],
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      ggUrl: process.env.GG_URL,
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
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
