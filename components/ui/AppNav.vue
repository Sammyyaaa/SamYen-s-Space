<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { useWindowScroll } from '@vueuse/core'
import { setCursorVariant, useMagnetic } from '@/composables/useCursor'
import { useTheme } from '~/composables/useTheme'

const router = useRouter()
const route = useRoute()

const { y: scrollY } = useWindowScroll()
const isScrolled = ref(false)
const isMenuOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)
const { elRef: menuBtnRef } = useMagnetic(0.3)
const { isDark, toggleTheme, initTheme } = useTheme()
const transitionStore = useTransitionStore()
const { t, locale, setLocale } = useI18n()

// Desktop center links (Contact 移至右側 CTA)
const navLinks = computed(() => [
  { label: t('nav.work'), href: '#projects' },
  { label: t('nav.about'), href: '#about' },
  { label: t('nav.skills'), href: '#skills' },
])

function toggleLocale() {
  setLocale(locale.value === 'zh-tw' ? 'en' : 'zh-tw')
}

watch(scrollY, (y) => {
  isScrolled.value = y > 50
})

const isDesktop = import.meta.client ? window.innerWidth >= 1024 : false

onMounted(() => {
  initTheme()
  if (!navRef.value || !isDesktop) return
  gsap.fromTo(
    navRef.value,
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
  )
})

function goHome() {
  if (route.name === 'index') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    transitionStore.isReturningHome = true
    router.push({ name: 'index' })
  }
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function scrollTo(href: string) {
  closeMenu()
  if (route.name !== 'index') {
    transitionStore.isReturningHome = true
    transitionStore.pendingScrollTarget = href
    router.push({ name: 'index' })
  } else {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <nav
    ref="navRef"
    role="navigation"
    aria-label="Main navigation"
    class="nav-bar"
    :class="{ 'nav-bar--scrolled': isScrolled }"
  >
    <div class="nav-inner">
      <!-- Logo -->
      <a
        href="/"
        class="nav-logo"
        aria-label="SamYen home"
        @click.prevent="goHome"
        @mouseenter="setCursorVariant('hover')"
        @mouseleave="setCursorVariant('default')"
      >
        <span class="nav-logo__first">Sam</span><span class="nav-logo__last">Yen</span>
      </a>

      <!-- Desktop links — 絕對置中 -->
      <ul class="nav-links" role="list">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            class="nav-link"
            @click.prevent="scrollTo(link.href)"
            @mouseenter="setCursorVariant('hover')"
            @mouseleave="setCursorVariant('default')"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- 右側群組：亮暗切換 + Contact CTA + 漢堡 -->
      <div class="nav-right">
        <!-- Theme toggle -->
        <button
          class="nav-theme-toggle"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
          @mouseenter="setCursorVariant('hover')"
          @mouseleave="setCursorVariant('default')"
        >
          <svg
            v-if="isDark"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="3" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="21" />
            <line x1="3" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="21" y2="12" />
            <line x1="5.64" y1="5.64" x2="7.05" y2="7.05" />
            <line x1="16.95" y1="16.95" x2="18.36" y2="18.36" />
            <line x1="5.64" y1="18.36" x2="7.05" y2="16.95" />
            <line x1="16.95" y1="7.05" x2="18.36" y2="5.64" />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <!-- Language switch -->
        <button
          class="nav-lang-toggle"
          :aria-label="t('nav.toggleLanguage')"
          @click="toggleLocale"
          @mouseenter="setCursorVariant('hover')"
          @mouseleave="setCursorVariant('default')"
        >
          {{ locale === 'zh-tw' ? 'EN' : '中' }}
        </button>

        <!-- Contact CTA -->
        <a
          href="#contact"
          class="nav-cta"
          @click.prevent="scrollTo('#contact')"
          @mouseenter="setCursorVariant('hover')"
          @mouseleave="setCursorVariant('default')"
        >
          {{ t('nav.contact') }}
        </a>

        <!-- Mobile hamburger -->
        <button
          ref="menuBtnRef"
          class="nav-hamburger"
          :class="{ 'nav-hamburger--open': isMenuOpen }"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <span class="nav-hamburger__bar" />
          <span class="nav-hamburger__bar" />
          <span class="nav-hamburger__bar" />
        </button>
      </div>
    </div>
  </nav>

  <!-- Teleport to body to avoid backdrop-filter/transform stacking context issues -->
  <Teleport to="body">
    <Transition name="mobile-menu">
      <div v-if="isMenuOpen" class="nav-mobile" role="dialog" aria-modal="true">
        <ul class="nav-mobile__links" role="list">
          <li
            v-for="(link, i) in navLinks"
            :key="link.href"
            class="nav-mobile__item"
            :style="{ transitionDelay: `${i * 0.06}s` }"
          >
            <a :href="link.href" class="nav-mobile__link" @click.prevent="scrollTo(link.href)">
              {{ link.label }}
            </a>
          </li>
          <!-- Contact 補回行動版選單 -->
          <li class="nav-mobile__item" :style="{ transitionDelay: `${navLinks.length * 0.06}s` }">
            <a href="#contact" class="nav-mobile__link" @click.prevent="scrollTo('#contact')">
              {{ t('nav.contact') }}
            </a>
          </li>
          <li
            class="nav-mobile__item"
            :style="{ transitionDelay: `${(navLinks.length + 1) * 0.06}s` }"
          >
            <button class="nav-mobile__lang" @click="toggleLocale">
              {{ locale === 'zh-tw' ? 'English' : '繁體中文' }}
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@reference "~/assets/styles/main.css";

@keyframes nav-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.5rem 2rem;
  transition:
    background 0.4s ease,
    padding 0.4s ease,
    backdrop-filter 0.4s ease;
}

@media (min-width: 1024px) {
  .nav-bar {
    opacity: 0;
  }
}

@media (max-width: 1023px) {
  .nav-bar {
    opacity: 0;
    animation: nav-fade-in 0.8s 0.1s ease forwards;
  }
}

.nav-bar--scrolled {
  @apply bg-surface-950/85 backdrop-blur-xl;
  border-bottom: 1px solid var(--nav-scrolled-border);
  padding: 1rem 2rem;
}

.nav-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
}

.nav-logo {
  display: flex;
  align-items: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  @apply text-surface-50;
  transition: opacity 0.3s;
}

.nav-logo:hover {
  opacity: 0.75;
}

.nav-logo__first {
  @apply text-surface-50;
}

.nav-logo__last {
  @apply text-surface-400;
}

/* Theme toggle */
.nav-theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  @apply text-surface-300 rounded-full;
  background: none;
  border: none;
  cursor: none;
  transition:
    color 0.3s,
    background 0.3s;
}

.nav-theme-toggle:hover {
  @apply text-surface-50 bg-surface-800;
}

.nav-theme-toggle svg {
  width: 18px;
  height: 18px;
}

/* Language toggle */
.nav-lang-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  @apply text-surface-300 text-xs font-semibold rounded-full;
  background: none;
  border: none;
  cursor: none;
  transition:
    color 0.3s,
    background 0.3s;
}

.nav-lang-toggle:hover {
  @apply text-surface-50 bg-surface-800;
}

.nav-links {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    /* 絕對置中：不受 logo / 右側群組寬度影響 */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}

/* 右側群組 */
.nav-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  @apply text-surface-300 text-sm font-medium tracking-wide;
  position: relative;
  transition: color 0.3s;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  @apply bg-brand-500;
  transition: width 0.3s ease;
}

.nav-link:hover {
  @apply text-surface-50;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-cta {
  display: none;
  @apply text-sm font-medium text-surface-50 rounded-full;
  border: 1px solid var(--nav-cta-border);
  padding: 0.5rem 1.25rem;
  transition:
    background 0.3s,
    border-color 0.3s;
}

@media (min-width: 768px) {
  .nav-cta {
    display: block;
  }
}

.nav-cta:hover {
  background: var(--nav-cta-hover-bg);
  border-color: var(--nav-cta-hover-border);
}

.nav-hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: none;
  padding: 4px;
}

@media (min-width: 768px) {
  .nav-hamburger {
    display: none;
  }
}

.nav-hamburger__bar {
  display: block;
  width: 24px;
  height: 1.5px;
  @apply bg-surface-50;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  transform-origin: center;
}

.nav-hamburger--open .nav-hamburger__bar:nth-child(1) {
  transform: translateY(6.5px) rotate(45deg);
}
.nav-hamburger--open .nav-hamburger__bar:nth-child(2) {
  opacity: 0;
}
.nav-hamburger--open .nav-hamburger__bar:nth-child(3) {
  transform: translateY(-6.5px) rotate(-45deg);
}

.nav-mobile {
  @apply bg-surface-950/95 backdrop-blur-2xl;
  position: fixed;
  inset: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-mobile__links {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.nav-mobile__item {
  overflow: hidden;
}

.nav-mobile__link {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 10vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  @apply text-surface-200;
  padding: 0.5rem 0;
  transition: color 0.3s;
}

.nav-mobile__link:hover {
  @apply text-surface-50;
}

.nav-mobile__lang {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  @apply text-surface-400;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.3s;
}

.nav-mobile__lang:hover {
  @apply text-surface-50;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
