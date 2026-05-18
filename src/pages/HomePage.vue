<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import MarqueeSection from '@/components/sections/MarqueeSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const belowFoldReady = ref(false)

onMounted(() => {
  // Fixed 2s delay: ensures all hero CSS animations complete (last one ends at ~1.8s)
  // before below-fold sections mount and stress the main thread
  setTimeout(() => { belowFoldReady.value = true }, 2000)
})
</script>

<template>
  <DefaultLayout>
    <HeroSection />
    <MarqueeSection />
    <template v-if="belowFoldReady">
      <ProjectsSection />
      <MarqueeSection />
      <AboutSection />
      <ContactSection />
    </template>
  </DefaultLayout>
</template>
