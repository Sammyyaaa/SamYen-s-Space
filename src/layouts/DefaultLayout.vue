<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '@/composables/useLenis'
import AppFooter from '@/components/ui/AppFooter.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'

gsap.registerPlugin(ScrollTrigger)

const { lenis } = useLenis()

// 唯一 Lenis 驅動源：GSAP ticker，確保每幀只更新一次
// 行動端 lenis 為 null（isTouchDevice），直接跳過，使用瀏覽器原生捲動
onMounted(() => {
  if (!lenis.value) return
  lenis.value.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.value?.raf(time * 1000)
  })
})
</script>

<template>
  <div class="layout">
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
  position: relative;
}

.layout__main {
  flex: 1;
}
</style>
