<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useReveal } from '@/composables/useScrollAnimation'
import { setCursorVariant } from '@/composables/useCursor'
import { isTouchDevice } from '@/utils/helpers'

const store = usePortfolioStore()
const sectionRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const skillsRef = ref<HTMLElement | null>(null)

useReveal(textRef, { y: 50, duration: 1.1, stagger: 0 })
useReveal(statsRef, { y: 40, duration: 1, stagger: 0.1, start: 'top 80%' })
useReveal(skillsRef, { y: 30, duration: 0.9, stagger: 0.06, start: 'top 82%' })

const skillCategories = ['basics', 'styling', 'frameworks', 'state', 'build', 'api', 'uiux', 'devtools', 'aitools'] as const
type SkillCategory = typeof skillCategories[number]

const categoryLabel: Record<SkillCategory, string> = {
  basics: 'Basics',
  styling: 'Styling',
  frameworks: 'Frameworks',
  state: 'State Management',
  build: 'Building Tools',
  api: 'API',
  uiux: 'UI/UX',
  devtools: 'Dev Tools',
  aitools: 'AI Development Tools',
}

const skillIconMap: Record<string, string> = {
  'HTML5': 'logos:html-5',
  'CSS3': 'logos:css-3',
  'JavaScript ES6+': 'logos:javascript',
  'TypeScript': 'logos:typescript-icon',
  'jQuery': 'logos:jquery',
  'Sass': 'logos:sass',
  'Bootstrap': 'logos:bootstrap',
  'Tailwind CSS': 'logos:tailwindcss-icon',
  'Vue': 'logos:vue',
  'Nuxt 3': 'logos:nuxt-icon',
  'Angular': 'logos:angular-icon',
  'Pinia': 'logos:pinia',
  'RxJS': 'logos:reactivex',
  'Vite': 'logos:vitejs',
  'npm': 'logos:npm-icon',
  'Yarn': 'logos:yarn',
  'Axios': 'logos:axios',
  'Figma': 'logos:figma',
  'Photoshop': 'logos:adobe-photoshop',
  'Illustrator': 'logos:adobe-illustrator',
  'ESLint': 'logos:eslint',
  'Prettier': 'logos:prettier',
  'Git': 'logos:git-icon',
  'GitHub': 'logos:github-icon',
  'SourceTree': 'logos:sourcetree',
  'Postman': 'logos:postman-icon',
}

const iconSkills = computed(() =>
  store.skills.filter(s => skillIconMap[s.name])
)
const iconSkillsLoop = computed(() => [...iconSkills.value, ...iconSkills.value])

const stripRef = ref<HTMLElement | null>(null)
const iconsInnerRef = ref<HTMLElement | null>(null)

// Marquee state — single source of truth
let marqueeX = 0
let halfWidth = 0
let lastTs: number | null = null
let rafId: number | null = null
const MARQUEE_SPEED = 80 // px/s

// Interaction state
let isDragging = false
let isHoveringStrip = false
let pointerStartX = 0
let dragStartX = 0

function tickMarquee(ts: number) {
  rafId = requestAnimationFrame(tickMarquee)
  const inner = iconsInnerRef.value
  if (!inner) return

  if (!halfWidth) halfWidth = inner.scrollWidth / 2

  if (!isDragging && !isHoveringStrip) {
    if (lastTs !== null) {
      const dt = (ts - lastTs) / 1000
      marqueeX -= MARQUEE_SPEED * dt
      if (marqueeX <= -halfWidth) marqueeX += halfWidth
    }
    inner.style.transform = `translateX(${marqueeX}px)`
  }
  lastTs = ts
}

onMounted(() => {
  if (isTouchDevice()) {
    // On touch devices, use CSS animation instead of RAF to avoid jank
    iconsInnerRef.value?.classList.add('is-css-marquee')
  } else {
    rafId = requestAnimationFrame(tickMarquee)
  }
})
onBeforeUnmount(() => { if (rafId !== null) cancelAnimationFrame(rafId) })

function onIconEnter() {
  if (!isDragging) setCursorVariant('hover')
}
function onIconLeave() {
  if (!isDragging) setCursorVariant('default')
}

function onStripMouseEnter() {
  isHoveringStrip = true
  lastTs = null  // reset so no time jump on resume
}
function onStripMouseLeave() {
  isHoveringStrip = false
  lastTs = null
  if (!isDragging) setCursorVariant('default')
}

function onStripPointerDown(e: PointerEvent) {
  const strip = stripRef.value
  if (!strip) return
  e.preventDefault()
  isDragging = true
  pointerStartX = e.clientX
  dragStartX = marqueeX
  if (iconsInnerRef.value) {
    iconsInnerRef.value.style.pointerEvents = 'none'
    if (!halfWidth) halfWidth = iconsInnerRef.value.scrollWidth / 2
  }
  strip.setPointerCapture(e.pointerId)
  setCursorVariant('drag')
}

function onStripPointerMove(e: PointerEvent) {
  if (!isDragging || !iconsInnerRef.value || !halfWidth) return
  const delta = e.clientX - pointerStartX
  marqueeX = dragStartX + delta
  // Keep within loop range so it continues seamlessly after release
  while (marqueeX > 0) marqueeX -= halfWidth
  while (marqueeX <= -halfWidth) marqueeX += halfWidth
  iconsInnerRef.value.style.transform = `translateX(${marqueeX}px)`
}

function onStripPointerUp(e?: PointerEvent) {
  if (!isDragging) return
  isDragging = false
  if (iconsInnerRef.value) iconsInnerRef.value.style.pointerEvents = ''
  const strip = stripRef.value
  if (strip && e && strip.hasPointerCapture && strip.hasPointerCapture(e.pointerId)) {
    strip.releasePointerCapture(e.pointerId)
  }
  lastTs = null  // reset so rAF picks up from here without time jump
  setCursorVariant(isHoveringStrip ? 'hover' : 'default')
}
</script>

<template>
  <section
    ref="sectionRef"
    id="about"
    class="about-section"
    aria-labelledby="about-title"
  >
    <!-- Section eyebrow -->
    <span class="section-eyebrow">About</span>

    <div class="about-grid">
      <!-- Left: Text -->
      <div ref="textRef" class="about-text">
        <h2 id="about-title" class="about-title">
          Hi, I'm<br />
          <span class="text-gradient">SamYen</span>
        </h2>
        <div class="about-body">
          <p>
            前端工程師，曾任職於毅聲科技有限公司，專注於金融保險前台與客戶端管理後台的開發與維護。
          </p>
          <p>
            擅長依照產品規格文件進行切版，開發前端模組與共用元件；與 UI/UX 設計師討論設計可行性並根據 Figma 設計稿完成實作；與後端工程師串接 API，負責文件對接與測試，以及專案上版與上線部署流程。
          </p>
        </div>
      </div>

      <!-- Right: Stats -->
      <div ref="statsRef" class="about-stats">
        <div
          v-for="stat in store.stats"
          :key="stat.label"
          class="about-stat"
        >
          <span class="about-stat__value">{{ stat.value }}</span>
          <span class="about-stat__label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Skills -->
    <div id="skills" class="about-skills">
      <h3 class="about-skills__title">Tech Stack</h3>

      <!-- Tech Icons Marquee -->
      <div
        ref="stripRef"
        class="tech-icons-strip"
        @mouseenter="onStripMouseEnter"
        @mouseleave="onStripMouseLeave"
        @pointerdown="onStripPointerDown"
        @pointermove="onStripPointerMove"
        @pointerup="onStripPointerUp"
        @pointercancel="onStripPointerUp"
      >
        <div ref="iconsInnerRef" class="tech-icons-inner">
          <div
            v-for="(skill, idx) in iconSkillsLoop"
            :key="`${skill.name}-${idx}`"
            class="tech-icon-item"
            @mouseenter="onIconEnter"
            @mouseleave="onIconLeave"
          >
            <div class="tech-icon-wrap">
              <Icon :icon="skillIconMap[skill.name]" class="tech-icon" />
            </div>
            <span class="tech-icon-label">{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <div ref="skillsRef" class="about-skills__grid">
        <div
          v-for="category in skillCategories"
          :key="category"
          class="about-skills__category"
        >
          <span class="about-skills__cat-label">{{ categoryLabel[category] }}</span>
          <div class="about-skills__list">
            <span
              v-for="skill in store.skills.filter(s => s.category === category)"
              :key="skill.name"
              class="about-skills__chip"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "@/styles/main.css";

.about-section {
  padding: 8rem 2rem;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
}

.section-eyebrow {
  display: inline-block;
  @apply text-xs text-brand-400 font-mono tracking-widest uppercase;
  margin-bottom: 1.5rem;
}

/* Grid layout */
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  margin-bottom: 6rem;
}

@media (min-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

/* Text */
.about-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.05;
  @apply text-surface-50;
  margin-bottom: 2rem;
}

.about-body {
  @apply text-surface-300 text-base leading-relaxed;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 520px;
}

/* Stats */
.about-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.about-stat {
  @apply border border-surface-800 rounded-2xl;
  background: var(--card-bg);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.about-stat__value {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: var(--accent-gradient);
  line-height: 1;
}

.about-stat__label {
  @apply text-sm text-surface-400;
}

/* Skills */
.about-skills {
  scroll-margin-top: 6rem;
}

/* Tech Icons Strip */
.tech-icons-strip {
  overflow-x: clip;
  padding-top: 0.75rem;
  margin-bottom: 2.5rem;
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  touch-action: pan-y;
  cursor: none;
  user-select: none;
}

.tech-icons-inner {
  display: flex;
  width: max-content;
  will-change: transform;
}

@keyframes marquee-scroll {
  from { transform: translateX(0) }
  to   { transform: translateX(-50%) }
}

.tech-icons-inner.is-css-marquee {
  animation: marquee-scroll 30s linear infinite;
  will-change: transform;
}

.tech-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
  cursor: none;
  transition: transform 0.2s ease;
}

.tech-icon-item:hover {
  transform: translateY(-4px);
}

.tech-icon-wrap {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  background: var(--tech-icon-bg);
  border: 1px solid var(--tech-icon-border);
  transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.tech-icon-item:hover .tech-icon-wrap {
  background: var(--tech-icon-bg-hover);
  border-color: var(--tech-icon-border-hover);
  box-shadow: 0 0 16px var(--tech-icon-shadow-hover);
}

.tech-icon {
  width: 1.75rem;
  height: 1.75rem;
}

.tech-icon-label {
  font-size: 0.625rem;
  letter-spacing: 0.04em;
  @apply text-surface-400;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.tech-icon-item:hover .tech-icon-label {
  @apply text-surface-100;
}

.about-skills__title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  @apply text-surface-500;
  margin-bottom: 2rem;
}

.about-skills__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .about-skills__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .about-skills__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.about-skills__category {
  @apply border border-surface-800 rounded-2xl;
  background: var(--card-bg);
  padding: 1.25rem 1.5rem;
}

.about-skills__cat-label {
  display: block;
  @apply text-xs text-brand-400 font-mono tracking-widest uppercase;
  margin-bottom: 0.875rem;
  padding-bottom: 0.625rem;
  border-bottom: 1px solid;
  @apply border-surface-800;
}

.about-skills__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.6rem;
  margin-top: 0.625rem;
}

.about-skills__chip {
  @apply text-sm text-surface-300;
  position: relative;
  padding-left: 0.875rem;
}

.about-skills__chip::before {
  content: '·';
  position: absolute;
  left: 0;
  @apply text-brand-500;
}
</style>
