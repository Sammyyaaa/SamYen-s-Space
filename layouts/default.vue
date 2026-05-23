<script setup lang="ts">
import AppFooter from '~/components/ui/AppFooter.vue'
import ScrollToTop from '~/components/ui/ScrollToTop.vue'
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
@reference "~/assets/styles/main.css";

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
