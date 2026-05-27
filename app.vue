<script setup lang="ts">
import AppCursor from '~/components/ui/AppCursor.vue'
import AppNav from '~/components/ui/AppNav.vue'
import { usePageTransition } from '~/composables/usePageTransition'

const { enter, leave } = usePageTransition()

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            name: 'SamYen',
            jobTitle: 'Frontend Engineer',
            description:
              '前端工程師，有金融保險前台與客戶端管理後台的開發與維護的經驗。擅長 Vue / Nuxt / Angular 生態系與 UI/UX 設計對接。',
            url: 'https://samyen-s-space.vercel.app',
            email: 'x0710078@gmail.com',
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
            name: "SamYen's Space",
            url: 'https://samyen-s-space.vercel.app',
            description:
              'SamYen 的前端工程作品集：金融保險系統開發經驗，主要以 Vue / Nuxt / Angular 生態系與 UI/UX 設計對接。',
            author: { '@type': 'Person', name: 'SamYen' },
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
