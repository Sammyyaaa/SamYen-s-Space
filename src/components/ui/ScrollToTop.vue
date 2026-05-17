<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { gsap } from 'gsap'
import { useWindowScroll } from '@vueuse/core'
import { setCursorVariant } from '@/composables/useCursor'
import { getLenis } from '@/composables/useLenis'

const { y: scrollY } = useWindowScroll()
const btnRef = ref<HTMLButtonElement | null>(null)

const isVisible = computed(() => scrollY.value > 300)

watch(isVisible, (show) => {
  if (!btnRef.value) return
  if (show) {
    gsap.set(btnRef.value, { pointerEvents: 'auto' })
    gsap.to(btnRef.value, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' })
  } else {
    gsap.to(btnRef.value, {
      opacity: 0,
      y: 14,
      duration: 0.35,
      ease: 'power3.in',
      onComplete: () => gsap.set(btnRef.value, { pointerEvents: 'none' }),
    })
  }
})

onMounted(() => {
  gsap.set(btnRef.value, { opacity: 0, y: 14, pointerEvents: 'none' })
})

function scrollToTop() {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.4 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <button
    ref="btnRef"
    class="scroll-top"
    aria-label="Scroll to top"
    @click="scrollToTop"
    @mouseenter="setCursorVariant('hover')"
    @mouseleave="setCursorVariant('default')"
  >
    <svg class="scroll-top__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
    <span class="scroll-top__label">TOP</span>
  </button>
</template>

<style scoped>
.scroll-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0.7rem 0.8rem;
  border-radius: 20px;
  cursor: none;
  /* iOS Liquid Glass */
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow:
    var(--glass-shadow),
    inset 0 1px 0 var(--glass-inset-top),
    inset 0 -1px 0 rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(24px) saturate(180%) brightness(1.05);
  -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.05);
  color: var(--glass-text);
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.scroll-top:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
  box-shadow:
    var(--glass-shadow-hover),
    inset 0 1px 0 var(--glass-inset-top),
    inset 0 -1px 0 rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.scroll-top__icon {
  width: 15px;
  height: 15px;
  opacity: 0.85;
}

.scroll-top__label {
  font-family: system-ui, sans-serif;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  line-height: 1;
  opacity: 0.75;
}
</style>
