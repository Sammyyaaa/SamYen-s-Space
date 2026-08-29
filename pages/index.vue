<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  keywords: () => t('seo.keywords'),
  ogTitle: () => t('seo.home.ogTitle'),
  ogDescription: () => t('seo.home.description'),
  ogUrl: 'https://samyen-s-space.vercel.app',
  ogImage: 'https://samyen-s-space.vercel.app/og-image.png',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.home.twitterTitle'),
  twitterDescription: () => t('seo.home.twitterDescription'),
  twitterImage: 'https://samyen-s-space.vercel.app/og-image.png',
})

onMounted(() => {
  nextTick(() => ScrollTrigger.refresh())
})
</script>

<template>
  <div>
    <HeroSection />
    <MarqueeSection />
    <ProjectsSection />
    <MarqueeSection />
    <LazyAboutSection />
    <LazyContactSection />
  </div>
</template>
