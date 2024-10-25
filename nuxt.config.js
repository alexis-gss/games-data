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
      igdbClientId: process.env.IGDB_CLIENT_ID,
      igdbClientSecret: process.env.IGDB_CLIENT_SECRET,
    }
  },
  css: ['~/assets/css/tailwind.css'],
  tailwindcss: {
    configPath: '~/tailwind.config.js'
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})