<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import MarqueeSection from '@/components/sections/MarqueeSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import { isReturningHome } from '@/composables/usePageTransition'

const belowFoldReady = ref(false)

onMounted(() => {
  if (isReturningHome.value) {
    // 返回首頁：立即 mount 所有 section，讓 enter() 的 nextTick scroll 還原能讀到完整 DOM
    belowFoldReady.value = true
    nextTick(() => ScrollTrigger.refresh())
  } else {
    // 首次載入：延遲渲染重量級 section（Iconify API + orb 動畫），避免阻塞主執行緒
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    })
    setTimeout(async () => {
      belowFoldReady.value = true
      await nextTick()
      ScrollTrigger.refresh()
    }, 2500)
  }
})
</script>

<template>
  <DefaultLayout>
    <HeroSection />
    <MarqueeSection />
    <ProjectsSection />
    <MarqueeSection />
    <template v-if="belowFoldReady">
      <AboutSection />
      <ContactSection />
    </template>
  </DefaultLayout>
</template>
