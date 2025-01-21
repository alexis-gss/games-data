export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-01-09',
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/device'],
  router: {
    options: {
      hashMode: true
    }
  },
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
    }
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/themes.css'],
  tailwindcss: {
    configPath: '~/tailwind.config.js'
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})
