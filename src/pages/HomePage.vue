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
  const mount = () => { belowFoldReady.value = true }
  // Mount below-fold sections only when browser is idle (hero gets first paint priority)
  // Fallback to 500ms for browsers without requestIdleCallback (old iOS Safari)
  if ('requestIdleCallback' in window) {
    requestIdleCallback(mount, { timeout: 2000 })
  } else {
    setTimeout(mount, 500)
  }
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
