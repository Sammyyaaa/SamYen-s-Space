<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useSeoMeta({
  title: "SamYen's Space",
  description: 'SamYen 的前端工程作品集：金融保險系統開發經驗，主要以 Vue / Nuxt / Angular 生態系與 UI/UX 設計對接。',
  ogTitle: "SamYen's Space",
  ogDescription: 'SamYen 的前端工程作品集：金融保險系統開發經驗，主要以 Vue / Nuxt / Angular 生態系與 UI/UX 設計對接。',
  ogUrl: 'https://samyen-s-space.vercel.app',
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
