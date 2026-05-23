import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-23',

  srcDir: '.',

  devtools: { enabled: true },

  css: ['~/assets/styles/main.css'],

  modules: [
    '@pinia/nuxt',
  ],

  components: {
    dirs: [{ path: '~/components', pathPrefix: false }],
  },

  nitro: {
    experimental: {
      websocket: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('gsap'))     return 'vendor-gsap'
            if (id.includes('@iconify')) return 'vendor-ui'
          },
        },
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-TW' },
      title: "SamYen's Space",
      meta: [
        { name: 'description', content: "SamYen 的前端工程作品集：專注金融保險系統開發，擅長 Vue 3 / Angular 生態系與 UI/UX 設計對接。" },
        { name: 'keywords', content: 'portfolio, frontend engineer, Vue, Angular, TypeScript, Nuxt, SamYen' },
        { property: 'og:title', content: "SamYen's Space" },
        { property: 'og:description', content: "SamYen 的前端工程作品集：專注金融保險系統開發，擅長 Vue 3 / Angular 生態系與 UI/UX 設計對接。" },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap',
          media: 'print',
          onload: "this.media='all'",
        },
      ],
    },
  },
})
