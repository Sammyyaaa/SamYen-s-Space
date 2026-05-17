<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '@/composables/useLenis'
import AppNav from '@/components/ui/AppNav.vue'
import AppFooter from '@/components/ui/AppFooter.vue'
import ParticleBackground from '@/components/ui/ParticleBackground.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'

gsap.registerPlugin(ScrollTrigger)

const { lenis } = useLenis()

// 唯一 Lenis 驅動源：GSAP ticker，確保每幀只更新一次
onMounted(() => {
  if (!lenis.value) return
  lenis.value.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.value?.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
})
</script>

<template>
  <div class="layout">
    <!-- 粒子背景：fixed canvas，在 grid 之上、頁面內容之下 -->
    <ParticleBackground />
    <AppNav />
    <main class="layout__main">
      <slot />
    </main>
    <AppFooter />
    <ScrollToTop />
  </div>
</template>

<style scoped>
@reference "@/styles/main.css";

.layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  /* 建立 stacking context，確保內容在 canvas (z-index:0) 之上 */
  position: relative;
  z-index: 1;
}

.layout__main {
  flex: 1;
}
</style>
