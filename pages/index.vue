<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
