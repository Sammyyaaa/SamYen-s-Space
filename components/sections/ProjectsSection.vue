<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { useReveal } from '@/composables/useScrollAnimation'
import { setCursorVariant } from '@/composables/useCursor'
import { useRouter } from 'vue-router'
import ProjectCard from '@/components/project/ProjectCard.vue'

const store = usePortfolioStore()
const router = useRouter()
const headingRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

const isMobile = import.meta.client ? window.innerWidth < 1024 : false
useReveal(headingRef, { y: 30, duration: 0.7 })
useReveal(gridRef, { y: 30, duration: 0.7, stagger: isMobile ? 0 : 0.1, start: 'top 80%' })

const activeFilter = ref<'all' | 'company' | 'personal' | 'team'>('all')

const visibleProjects = computed(() => {
  if (activeFilter.value === 'company')  return store.projects.filter(p => p.category === 'company')
  if (activeFilter.value === 'personal') return store.projects.filter(p => p.category === 'personal')
  if (activeFilter.value === 'team')     return store.projects.filter(p => p.category === 'team')
  return store.projects
})
</script>

<template>
  <section
    id="projects"
    class="projects-section"
    aria-labelledby="projects-title"
  >
    <!-- Section header -->
    <div ref="headingRef" class="projects-header">
      <span class="section-eyebrow">Selected Work</span>
      <h2 id="projects-title" class="projects-title">
        Things I've<br />
        <span class="projects-title__accent">Built &amp; Shipped</span>
      </h2>
      <p class="projects-desc">
        從概念到產品，每個專案都是一次突破邊界的嘗試。
      </p>

      <!-- Filter tabs -->
      <div class="projects-filter" role="tablist" aria-label="Filter projects">
        <button
          role="tab"
          class="projects-filter__btn"
          :class="{ 'projects-filter__btn--active': activeFilter === 'all' }"
          :aria-selected="activeFilter === 'all'"
          @click="activeFilter = 'all'"
          @mouseenter="setCursorVariant('hover')"
          @mouseleave="setCursorVariant('default')"
        >
          全部
        </button>
        <button
          role="tab"
          class="projects-filter__btn"
          :class="{ 'projects-filter__btn--active': activeFilter === 'company' }"
          :aria-selected="activeFilter === 'company'"
          @click="activeFilter = 'company'"
          @mouseenter="setCursorVariant('hover')"
          @mouseleave="setCursorVariant('default')"
        >
          公司專案
        </button>
        <button
          role="tab"
          class="projects-filter__btn"
          :class="{ 'projects-filter__btn--active': activeFilter === 'personal' }"
          :aria-selected="activeFilter === 'personal'"
          @click="activeFilter = 'personal'"
          @mouseenter="setCursorVariant('hover')"
          @mouseleave="setCursorVariant('default')"
        >
          個人作品
        </button>
        <button
          role="tab"
          class="projects-filter__btn"
          :class="{ 'projects-filter__btn--active': activeFilter === 'team' }"
          :aria-selected="activeFilter === 'team'"
          @click="activeFilter = 'team'"
          @mouseenter="setCursorVariant('hover')"
          @mouseleave="setCursorVariant('default')"
        >
          團隊作品
        </button>
      </div>
    </div>

    <!-- Grid -->
    <div ref="gridRef">
      <TransitionGroup name="project-fade" tag="div" class="projects-grid">
        <ProjectCard
          v-for="(project, i) in visibleProjects"
          :key="project.id"
          :project="project"
          :index="i"
        />
      </TransitionGroup>
    </div>

    <!-- View all CTA -->
    <div class="projects-cta">
      <button
        class="projects-cta__btn"
        @mouseenter="setCursorVariant('hover')"
        @mouseleave="setCursorVariant('default')"
        @click="router.push('/')"
      >
        View Full Archive
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/styles/main.css";

.projects-section {
  padding: 8rem 2rem;
  max-width: 1440px;
  margin: 0 auto;
}

.projects-header {
  margin-bottom: 4rem;
}

.section-eyebrow {
  display: inline-block;
  @apply text-xs text-brand-400 font-mono tracking-widest uppercase;
  margin-bottom: 1rem;
}

.projects-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.05;
  @apply text-surface-50;
  margin-bottom: 1rem;
}

.projects-title__accent {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: var(--accent-gradient);
}

.projects-desc {
  @apply text-surface-400 text-lg;
  margin-bottom: 2rem;
  max-width: 480px;
}

.projects-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.projects-filter__btn {
  @apply text-sm font-medium text-surface-400 border border-surface-700 rounded-full;
  padding: 0.4rem 1.25rem;
  background: none;
  cursor: none;
  transition: all 0.3s;
  white-space: nowrap;
}

@media (max-width: 480px) {
  .projects-filter {
    gap: 0.4rem;
  }
  .projects-filter__btn {
    @apply text-xs;
    padding: 0.35rem 0.875rem;
  }
}

.projects-filter__btn:hover {
  @apply text-surface-50 border-surface-500;
}

.projects-filter__btn--active {
  @apply text-surface-50 border-surface-600;
  background: var(--filter-active-bg);
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-fade-enter-active,
.project-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.project-fade-enter-from,
.project-fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.projects-cta {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}

.projects-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  @apply text-sm font-semibold text-surface-300 border border-surface-700 rounded-full;
  padding: 0.75rem 1.75rem;
  background: none;
  cursor: none;
  transition: all 0.3s;
}

.projects-cta__btn svg {
  width: 16px;
  height: 16px;
  transition: transform 0.3s;
}

.projects-cta__btn:hover {
  @apply text-surface-50 border-surface-500;
}

.projects-cta__btn:hover svg {
  transform: translateX(4px);
}
</style>
