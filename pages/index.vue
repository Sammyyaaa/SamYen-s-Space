<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const belowFoldReady = ref(false)
const transitionStore = useTransitionStore()

onMounted(() => {
  if (transitionStore.isReturningHome) {
    // 返回首頁：立即 mount 所有 section，讓 enter() 的 nextTick scroll 還原能讀到完整 DOM
    belowFoldReady.value = true
    nextTick(() => ScrollTrigger.refresh())
  } else {
    // 首次載入：延遲渲染重量級 section，避免阻塞主執行緒
    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh())
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
  <div>
    <HeroSection />
    <MarqueeSection />
    <ProjectsSection />
    <MarqueeSection />
    <template v-if="belowFoldReady">
      <AboutSection />
      <ContactSection />
    </template>
  </div>
</template>
