<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppFooter from '@/components/ui/AppFooter.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.ticker.lagSmoothing(500, 33)
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
