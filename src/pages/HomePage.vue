<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import MarqueeSection from '@/components/sections/MarqueeSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>

<template>
  <DefaultLayout>
    <HeroSection />
    <MarqueeSection />
    <ProjectsSection />
    <MarqueeSection />
    <AboutSection />
    <ContactSection />
  </DefaultLayout>
</template>
