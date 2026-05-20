<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePortfolioStore } from '@/stores/portfolioStore'
import { setCursorVariant, useMagnetic } from '@/composables/useCursor'
import { getLenis } from '@/composables/useLenis'
import { isProjectToProject } from '@/composables/usePageTransition'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()
const router = useRouter()
const store = usePortfolioStore()

const project = computed(() =>
  store.getProject(route.params.id as string),
)

if (!project.value) {
  router.replace('/')
}

const { elRef: backBtnRef } = useMagnetic(0.3)

function navigateToProject(id: string) {
  const lenis = getLenis()
  isProjectToProject.value = true
  if (lenis && window.scrollY > 80) {
    lenis.scrollTo(0, {
      duration: 0.7,
      onComplete: () => router.push({ name: 'project', params: { id } }),
    })
  } else {
    router.push({ name: 'project', params: { id } })
  }
}
</script>

<template>
  <DefaultLayout>
    <article v-if="project" class="project-detail">
      <!-- Back button -->
      <div class="project-detail__back-wrap">
        <button
          ref="backBtnRef"
          class="project-detail__back"
          aria-label="Back to all projects"
          @click="router.back()"
          @mouseenter="setCursorVariant('hover')"
          @mouseleave="setCursorVariant('default')"
        >
          ← Back
        </button>
      </div>

      <!-- Content -->
      <div class="project-detail__content">
        <div class="project-detail__meta">
          <span
            class="project-detail__badge"
            :class="{
              'project-detail__badge--company':  project.category === 'company',
              'project-detail__badge--personal': project.category === 'personal',
              'project-detail__badge--team':     project.category === 'team',
            }"
          >
            {{ project.category === 'company' ? '公司專案' : project.category === 'team' ? '團隊作品' : '個人作品' }}
          </span>
          <span class="project-detail__period">{{ project.period ?? project.year }}</span>
          <span class="project-detail__category">{{ project.subtitle }}</span>
        </div>

        <h1 class="project-detail__title">{{ project.title }}</h1>

        <!-- CTA -->
        <a
          v-if="project.link"
          :href="project.link"
          class="project-detail__link"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="setCursorVariant('hover')"
          @mouseleave="setCursorVariant('default')"
        >
          前往查看 ↗
        </a>
        <button
          v-else
          class="project-detail__link project-detail__link--disabled"
          disabled
          aria-disabled="true"
        >
          前往查看
        </button>

        <p class="project-detail__desc">{{ project.description }}</p>

        <!-- Feature sections -->
        <div v-if="project.sections?.length" class="project-detail__sections">
          <div
            v-for="section in project.sections"
            :key="section.title"
            class="project-detail__section"
          >
            <h2 class="project-detail__section-title">{{ section.title }}</h2>
            <ul class="project-detail__section-list">
              <li
                v-for="item in section.items"
                :key="item"
                class="project-detail__section-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Tech tags -->
        <div class="project-detail__tags-wrap">
          <h2 class="project-detail__tags-title">前端技術與套件</h2>
          <div class="project-detail__tags">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="project-detail__tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Dev tools -->
        <div v-if="project.tools?.length" class="project-detail__tags-wrap">
          <h2 class="project-detail__tags-title">開發工具</h2>
          <div class="project-detail__tags">
            <span
              v-for="tool in project.tools"
              :key="tool"
              class="project-detail__tag project-detail__tag--tool"
            >
              {{ tool }}
            </span>
          </div>
        </div>

      </div>

      <!-- Related -->
      <div class="project-detail__related">
        <h2 class="project-detail__related-title">More Work</h2>
        <div class="project-detail__related-grid">
          <button
            v-for="p in store.projects.filter(p => p.id !== project!.id).slice(0, 3)"
            :key="p.id"
            class="project-detail__related-card"
            @click="navigateToProject(p.id)"
            @mouseenter="setCursorVariant('project')"
            @mouseleave="setCursorVariant('default')"
          >
            <div class="project-detail__related-info">
              <span class="project-detail__related-name">{{ p.title }}</span>
              <div class="project-detail__related-tags">
                <span
                  v-for="tag in p.tags.slice(0, 3)"
                  :key="tag"
                  class="project-detail__related-tag"
                >{{ tag }}</span>
              </div>
            </div>
            <div
              class="project-detail__related-accent"
              :style="{ background: `linear-gradient(90deg, ${p.color}, transparent)` }"
            />
          </button>
        </div>
      </div>
    </article>
  </DefaultLayout>
</template>

<style scoped>
@reference "@/styles/main.css";

.project-detail {
  min-height: 100dvh;
  padding-top: 6rem;
}

.project-detail__back-wrap {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 2rem 0;
}

.project-detail__back {
  @apply text-sm text-surface-400 font-medium;
  background: none;
  border: none;
  cursor: none;
  transition: color 0.3s;
}

.project-detail__back:hover {
  @apply text-surface-50;
}

/* Content */
.project-detail__content {
  max-width: 760px;
  margin: 0 auto;
  padding: 3rem 2rem 4rem;
}

.project-detail__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
  margin-bottom: 1.5rem;
}

.project-detail__badge {
  @apply text-xs font-medium rounded-full;
  padding: 0.2rem 0.75rem;
}

.project-detail__badge--company {
  color: var(--badge-company-color);
  background: var(--badge-company-bg);
  border: 1px solid var(--badge-company-border);
}

.project-detail__badge--personal {
  color: var(--badge-personal-color);
  background: var(--badge-personal-bg);
  border: 1px solid var(--badge-personal-border);
}

.project-detail__badge--team {
  color: var(--badge-team-color);
  background: var(--badge-team-bg);
  border: 1px solid var(--badge-team-border);
}

.project-detail__period,
.project-detail__category {
  @apply text-sm text-surface-300;
}

.project-detail__period::before {
  content: '·';
  margin-right: 1.25rem;
  @apply text-surface-500;
}

.project-detail__title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  @apply text-surface-50;
  margin-bottom: 1rem;
}

.project-detail__desc {
  @apply text-surface-300 text-lg leading-relaxed;
  margin-bottom: 2rem;
}

/* Feature sections */
.project-detail__sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.project-detail__section {
  @apply border border-surface-800 rounded-2xl;
  background: var(--card-bg);
  backdrop-filter: var(--card-blur);
  -webkit-backdrop-filter: var(--card-blur);
  box-shadow: var(--card-shine);
  padding: 1.5rem;
}

.project-detail__section-title {
  font-family: var(--font-display);
  @apply text-sm font-semibold text-brand-400 tracking-widest uppercase;
  margin-bottom: 1rem;
}

.project-detail__section-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.project-detail__section-item {
  @apply text-surface-300 text-sm leading-relaxed;
  padding-left: 1.25rem;
  position: relative;
}

.project-detail__section-item::before {
  content: '▸';
  position: absolute;
  left: 0;
  @apply text-brand-500;
  font-size: 0.6rem;
  top: 0.3em;
}

/* Tags */
.project-detail__tags-wrap {
  margin-bottom: 2.5rem;
}

.project-detail__tags-title {
  font-family: var(--font-display);
  @apply text-sm font-semibold text-surface-300 tracking-widest uppercase;
  margin-bottom: 0.875rem;
}

.project-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-detail__tag {
  @apply text-sm text-surface-200 bg-surface-800 border border-surface-700 rounded-full;
  padding: 0.35rem 0.875rem;
}

.project-detail__tag--tool {
  @apply text-surface-300 bg-surface-900 border-surface-800;
}

.project-detail__link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  @apply text-surface-50 rounded-full font-semibold text-sm;
  padding: 0.75rem 1.75rem;
  margin-bottom: 2rem;
  transition: opacity 0.3s, box-shadow 0.3s;
  background: var(--cta-primary-bg);
  color: var(--cta-primary-text);
  border: none;
  cursor: none;
}

.project-detail__link:hover {
  box-shadow: 0 0 30px var(--cta-primary-shadow);
  opacity: 0.9;
}

.project-detail__link--disabled {
  opacity: 0.35;
  pointer-events: none;
}

/* Related */
.project-detail__related {
  max-width: 1440px;
  margin: 0 auto;
  padding: 4rem 2rem 8rem;
}

.project-detail__related-title {
  font-family: var(--font-display);
  @apply text-2xl text-surface-50 font-bold;
  letter-spacing: -0.03em;
  margin-bottom: 2rem;
}

.project-detail__related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.project-detail__related-card {
  @apply border border-surface-800 rounded-2xl overflow-hidden;
  background: var(--card-bg);
  backdrop-filter: var(--card-blur);
  -webkit-backdrop-filter: var(--card-blur);
  box-shadow: var(--card-shine);
  cursor: none;
  text-align: left;
  transition: border-color 0.3s, box-shadow 0.4s;
  display: flex;
  flex-direction: column;
}

.project-detail__related-card:hover {
  @apply border-surface-600;
  box-shadow: var(--card-shine-hover);
}

.project-detail__related-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.project-detail__related-name {
  font-family: var(--font-display);
  @apply text-surface-50 font-semibold text-base;
  letter-spacing: -0.02em;
}

.project-detail__related-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.project-detail__related-tag {
  @apply text-xs text-surface-300 bg-surface-800 border border-surface-700 rounded-full;
  padding: 0.15rem 0.55rem;
}

.project-detail__related-accent {
  height: 2px;
  width: 0;
  transition: width 0.4s ease;
}

.project-detail__related-card:hover .project-detail__related-accent {
  width: 100%;
}
</style>
