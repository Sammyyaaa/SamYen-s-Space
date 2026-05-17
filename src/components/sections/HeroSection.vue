<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { setCursorVariant, useMagnetic } from '@/composables/useCursor'
import { useParallax } from '@/composables/useScrollAnimation'

const typedText = ref('')
const eyebrowFull = 'Frontend Engineer · Precision · Craft · Reliable · Systematic · Detail-Driven'
let alive = false
let typingTimer: ReturnType<typeof setTimeout> | null = null

function sleep(ms: number) {
  return new Promise<void>(resolve => { typingTimer = setTimeout(resolve, ms) })
}

async function runTypewriter() {
  await sleep(600)
  while (alive) {
    for (let i = 0; i <= eyebrowFull.length && alive; i++) {
      typedText.value = eyebrowFull.slice(0, i)
      await sleep(38)
    }
    if (!alive) break
    await sleep(3500)
    for (let i = eyebrowFull.length; i >= 0 && alive; i--) {
      typedText.value = eyebrowFull.slice(0, i)
      await sleep(18)
    }
    if (!alive) break
    await sleep(500)
  }
}

const sectionRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const scrollHintRef = ref<HTMLElement | null>(null)
const { elRef: ctaBtnRef } = useMagnetic(0.5)
const { elRef: titleWord1Ref } = useMagnetic(0.2)
const { elRef: titleWord2Ref } = useMagnetic(0.2)

// Background parallax on scroll
useParallax(sectionRef, bgRef, { speed: 0.4 })

// Hero entrance animation
onMounted(() => {
  const tl = gsap.timeline({ delay: 0.2 })

  // Stagger title words
  tl.from('.hero-title__word', {
    y: '100%',
    opacity: 0,
    duration: 1.2,
    stagger: 0.12,
    ease: 'power4.out',
  })
  .from(
    subtitleRef.value,
    { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out' },
    '-=0.6',
  )
  .from(
    ctaRef.value,
    { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' },
    '-=0.5',
  )
  .from(
    scrollHintRef.value,
    { opacity: 0, duration: 1, ease: 'power2.out' },
    '-=0.2',
  )

  alive = true
  runTypewriter()

  // Floating CTA loop
  gsap.to(ctaRef.value, {
    y: -8,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 2,
  })

})

onBeforeUnmount(() => {
  alive = false
  if (typingTimer) clearTimeout(typingTimer)
})

function scrollToSection(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToProjects() {
  scrollToSection('#projects')
}
</script>

<template>
  <section
    ref="sectionRef"
    id="hero"
    class="hero"
    aria-label="Hero section"
  >
    <!-- Orbs (grid 由 body 全頁提供) -->
    <div ref="bgRef" class="hero-bg" aria-hidden="true">
      <div class="hero-orb hero-orb--blue" />
      <div class="hero-orb hero-orb--purple" />
    </div>

    <!-- Content -->
    <div class="hero-content">
      <!-- Eyebrow -->
      <p class="hero-eyebrow">
        <span class="hero-eyebrow__dot" aria-hidden="true" />
        <span class="hero-eyebrow__typed">{{ typedText }}</span><span class="hero-eyebrow__cursor" aria-hidden="true" />
      </p>

      <!-- Title — split into words for stagger -->
      <h1 ref="titleRef" class="hero-title" aria-label="SAMYEN'S SPACE">
        <span class="hero-title__line">
          <span
            ref="titleWord1Ref"
            class="hero-title__word"
            @mouseenter="setCursorVariant('hover')"
            @mouseleave="setCursorVariant('default')"
          >SAMYEN'S</span>
        </span>
        <span class="hero-title__line">
          <span
            ref="titleWord2Ref"
            class="hero-title__word"
            @mouseenter="setCursorVariant('hover')"
            @mouseleave="setCursorVariant('default')"
          >SPACE.</span>
        </span>
      </h1>

      <!-- Subtitle -->
      <p ref="subtitleRef" class="hero-subtitle">
        A collection of thoughts, code, and digital experiments.<br class="hidden md:block" />
        Where design meets engineering.
      </p>

      <!-- CTA group -->
      <div ref="ctaRef" class="hero-cta-group">
        <button
          ref="ctaBtnRef"
          class="hero-cta hero-cta--primary"
          @click="scrollToProjects"
          @mouseenter="setCursorVariant('hover')"
          @mouseleave="setCursorVariant('default')"
        >
          <span>Explore Work</span>
          <svg class="hero-cta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <a
          href="#contact"
          class="hero-cta hero-cta--secondary"
          @click.prevent="scrollToSection('#contact')"
          @mouseenter="setCursorVariant('link')"
          @mouseleave="setCursorVariant('default')"
        >
          Get in Touch
        </a>
      </div>


    </div>

    <!-- Scroll hint -->
    <div ref="scrollHintRef" class="hero-scroll-hint" aria-hidden="true">
      <div class="hero-scroll-hint__mouse">
        <div class="hero-scroll-hint__wheel" />
      </div>
      <span class="hero-scroll-hint__text">Scroll</span>
    </div>
  </section>
</template>

<style scoped>
@reference "@/styles/main.css";

.hero {
  position: relative;
  height: 100dvh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Background */
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  will-change: transform;
}


.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.hero-orb--blue {
  width: 600px;
  height: 600px;
  background: var(--orb-primary);
  top: -10%;
  right: -5%;
  animation: orb-float 8s ease-in-out infinite;
}

.hero-orb--purple {
  width: 500px;
  height: 500px;
  background: var(--orb-secondary);
  bottom: -10%;
  left: -5%;
  animation: orb-float 10s ease-in-out infinite reverse;
}

@keyframes orb-float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -30px); }
}

/* Content */
.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Eyebrow */
.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  @apply text-sm text-surface-400 font-medium tracking-wider uppercase;
  min-height: 1.5em;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fade-up 0.8s 0.1s ease forwards;
}

.hero-eyebrow__dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

.hero-eyebrow__typed {
  letter-spacing: inherit;
}

:global(html.light-mode .hero-eyebrow__cursor) {
  background: #374151;
}

.hero-eyebrow__cursor {
  display: inline-block;
  width: 2px;
  height: 0.85em;
  background: #ffffff;
  margin-left: 3px;
  vertical-align: middle;
  border-radius: 1px;
  animation: blink-cursor 0.6s step-end infinite;
}

@keyframes blink-cursor {
  0%, 45% { opacity: 1; }
  55%, 100% { opacity: 0; }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}

/* Title */
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 9vw, 9rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  @apply text-surface-50;
  margin-bottom: 2rem;
  overflow: hidden;
}

.hero-title__line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.05em;
}

.hero-title__word {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: var(--hero-title-gradient);
}

/* Subtitle */
.hero-subtitle {
  @apply text-surface-300 text-lg md:text-xl;
  line-height: 1.7;
  max-width: 540px;
  margin-bottom: 2.5rem;
}

/* CTA */
.hero-cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 3rem;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 100px;
  padding: 0.875rem 2rem;
  transition: all 0.3s ease;
  cursor: none;
  border: none;
}

.hero-cta--primary {
  background: var(--cta-primary-bg);
  color: var(--cta-primary-text);
}

.hero-cta--primary:hover {
  box-shadow: 0 0 40px var(--cta-primary-shadow);
  transform: scale(1.03);
}

.hero-cta__icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s;
}

.hero-cta--primary:hover .hero-cta__icon {
  transform: translateX(3px);
}

.hero-cta--secondary {
  @apply text-surface-200;
  background: var(--cta-secondary-bg);
  border: 1px solid var(--cta-secondary-border);
  backdrop-filter: blur(8px);
}

.hero-cta--secondary:hover {
  @apply text-surface-50;
  border-color: var(--cta-primary-shadow);
}

/* Tags */
.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.hero-tag {
  @apply text-xs text-surface-500 border border-surface-700 rounded-full;
  padding: 0.25rem 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Scroll hint */
.hero-scroll-hint {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  z-index: 1;
}

.hero-scroll-hint__mouse {
  width: 24px;
  height: 36px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.hero-scroll-hint__wheel {
  width: 4px;
  height: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  animation: scroll-wheel 1.8s ease-in-out infinite;
}

@keyframes scroll-wheel {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(12px); opacity: 0; }
}

.hero-scroll-hint__text {
  @apply text-xs text-surface-500 tracking-widest uppercase;
}

:global(html.light-mode .hero-scroll-hint__mouse) {
  border-color: rgba(0, 0, 0, 0.35);
}

:global(html.light-mode .hero-scroll-hint__wheel) {
  background: rgba(0, 0, 0, 0.5);
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
