import tailwindcss from '@tailwindcss/vite'

const SITE_URL = 'https://samyen-s-space.vercel.app' // ← 部署後確認並替換為實際 Vercel URL

export default defineNuxtConfig({
  compatibilityDate: '2025-05-23',

  srcDir: '.',

  devtools: { enabled: true },

  css: ['~/assets/styles/main.css'],

  modules: ['@pinia/nuxt', '@nuxtjs/sitemap', '@nuxt/eslint'],

  site: {
    url: SITE_URL,
    name: "SamYen's Space",
  },

  sitemap: {
    urls: [
      '/',
      '/project/nanshan-life-insurance',
      '/project/nanshan-property-insurance',
      '/project/nanshan-sales-platform',
      '/project/blog-nuxt3',
      '/project/social-vue',
      '/project/foomosa',
      '/project/architect-website',
    ],
  },

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
            if (id.includes('gsap')) return 'vendor-gsap'
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
        {
          name: 'description',
          content:
            'SamYen 的前端工程作品集：金融保險系統開發經驗，主要以 Vue / Nuxt / Angular 生態系與 UI/UX 設計對接。',
        },
        {
          name: 'keywords',
          content: 'portfolio, frontend engineer, Vue, Angular, TypeScript, Nuxt, SamYen',
        },
        { property: 'og:title', content: "SamYen's Space" },
        {
          property: 'og:description',
          content:
            'SamYen 的前端工程作品集：金融保險系統開發經驗，主要以 Vue / Nuxt / Angular 生態系與 UI/UX 設計對接。',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: SITE_URL },
        { property: 'og:site_name', content: "SamYen's Space" },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: "SamYen's Space" },
        {
          name: 'twitter:description',
          content:
            'SamYen 的前端工程作品集：金融保險系統開發經驗，主要以 Vue / Nuxt / Angular 生態系與 UI/UX 設計對接。',
        },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'canonical', href: SITE_URL },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
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
