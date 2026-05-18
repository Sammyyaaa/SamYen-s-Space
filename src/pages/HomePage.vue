<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import MarqueeSection from '@/components/sections/MarqueeSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const belowFoldReady = ref(false)

onMounted(() => {
  // Refresh ScrollTrigger after first paint so ProjectsSection positions are correct
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  })

  // Defer heavy sections (Iconify API + orb animations)
  setTimeout(async () => {
    belowFoldReady.value = true
    await nextTick()
    ScrollTrigger.refresh()
  }, 2500)
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
