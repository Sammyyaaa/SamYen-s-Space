<script setup lang="ts">
import { computed } from 'vue'
import AppCursor from '~/components/ui/AppCursor.vue'
import AppNav from '~/components/ui/AppNav.vue'
import { usePageTransition } from '~/composables/usePageTransition'

const { enter, leave } = usePageTransition()
const { t, locale } = useI18n()
const localeHead = useLocaleHead()

const SITE_URL = 'https://samyen-s-space.vercel.app'
const inLanguage = computed(() => (locale.value === 'zh-tw' ? 'zh-TW' : 'en-US'))

useHead({
  htmlAttrs: {
    lang: () => localeHead.value.htmlAttrs.lang,
  },
  script: computed(() => [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ProfilePage',
            '@id': `${SITE_URL}/#profilepage`,
            name: t('seo.profile.pageName'),
            url: SITE_URL,
            description: t('seo.home.description'),
            inLanguage: inLanguage.value,
            datePublished: '2025-01-01',
            dateModified: '2026-06-01',
            mainEntity: { '@id': `${SITE_URL}/#person` },
          },
          {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'SamYen',
            jobTitle: 'Frontend Engineer',
            description: t('seo.profile.personDescription'),
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
            name: t('seo.home.title'),
            url: SITE_URL,
            description: t('seo.home.description'),
            inLanguage: inLanguage.value,
            author: { '@id': `${SITE_URL}/#person` },
          },
        ],
      }),
    },
  ]),
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
