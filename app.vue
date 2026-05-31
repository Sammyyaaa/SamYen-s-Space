<script setup lang="ts">
import AppCursor from '~/components/ui/AppCursor.vue'
import AppNav from '~/components/ui/AppNav.vue'
import { usePageTransition } from '~/composables/usePageTransition'

const { enter, leave } = usePageTransition()

const SITE_URL = 'https://samyen-s-space.vercel.app'

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ProfilePage',
            '@id': `${SITE_URL}/#profilepage`,
            name: "SamYen's Space — Frontend Engineer Portfolio",
            url: SITE_URL,
            description:
              'SamYen 的前端工程作品集：金融保險系統開發經驗，主要以 Vue / Nuxt / Angular 生態系與 UI/UX 設計對接。',
            inLanguage: 'zh-TW',
            datePublished: '2025-01-01',
            dateModified: '2026-06-01',
            mainEntity: { '@id': `${SITE_URL}/#person` },
          },
          {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'SamYen',
            jobTitle: 'Frontend Engineer',
            description:
              '前端工程師，有金融保險前台與客戶端管理後台的開發與維護的經驗。擅長 Vue / Nuxt / Angular 生態系與 UI/UX 設計對接。',
            url: SITE_URL,
            email: 'x0710078@gmail.com',
            image: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/og-image.png`,
              width: 1200,
              height: 630,
            },
            sameAs: ['https://github.com/Sammyyaaa'],
            knowsAbout: [
              'Vue',
              'Nuxt',
              'Angular',
              'TypeScript',
              'Frontend Development',
              'Tailwind CSS',
              'Pinia',
              'RxJS',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: "SamYen's Space",
            url: SITE_URL,
            description:
              'SamYen 的前端工程作品集：金融保險系統開發經驗，主要以 Vue / Nuxt / Angular 生態系與 UI/UX 設計對接。',
            inLanguage: 'zh-TW',
            author: { '@id': `${SITE_URL}/#person` },
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <!--
    AppCursor 必須在 NuxtPage / Transition 之外：
    若放在 DefaultLayout（Transition 的目標元素）內，
    GSAP 的頁面過渡會對 layout 根元素套用 transform，
    使所有 position: fixed 子元素的基準變為 layout 而非 viewport，
    導致捲動後游標與導覽列偏移至可視區域外。
  -->
  <ClientOnly><AppCursor /></ClientOnly>
  <AppNav />

  <NuxtLayout>
    <NuxtPage
      :transition="{
        mode: 'out-in',
        css: false,
        onEnter: enter,
        onLeave: leave,
      }"
    />
  </NuxtLayout>
</template>
