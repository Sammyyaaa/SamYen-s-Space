<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setCursorVariant } from '@/composables/useCursor'
import { formatIndex } from '@/utils/helpers'
import type { Project } from '@/types'

const props = defineProps<{
  project: Project
  index: number
}>()

const router = useRouter()
const cardRef = ref<HTMLElement | null>(null)

function onEnter() { setCursorVariant('project') }
function onLeave() { setCursorVariant('default') }

function navigateToProject() {
  router.push({ name: 'project', params: { id: props.project.id } })
}
</script>

<template>
  <article
    ref="cardRef"
    class="project-card"
    role="button"
    tabindex="0"
    :aria-label="`View project: ${project.title}`"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @click="navigateToProject"
    @keydown.enter="navigateToProject"
    @keydown.space.prevent="navigateToProject"
  >
    <!-- Meta -->
    <div class="project-card__meta">
      <div class="project-card__header">
        <span class="project-card__index">{{ formatIndex(index) }}</span>
        <div class="project-card__header-right">
          <span
            class="project-card__badge"
            :class="{
              'project-card__badge--company':  project.category === 'company',
              'project-card__badge--personal': project.category === 'personal',
              'project-card__badge--team':     project.category === 'team',
            }"
          >
            {{ project.category === 'company' ? '公司專案' : project.category === 'team' ? '團隊作品' : '個人作品' }}
          </span>
          <span class="project-card__year">{{ project.period ?? project.year }}</span>
        </div>
      </div>
      <h3 class="project-card__title">{{ project.title }}</h3>
      <p class="project-card__subtitle">{{ project.subtitle }}</p>
      <ul class="project-card__tags" role="list" aria-label="Technologies used">
        <li v-for="tag in project.tags.slice(0, 3)" :key="tag" class="project-card__tag">
          {{ tag }}
        </li>
      </ul>
    </div>

    <!-- Accent line -->
    <div
      class="project-card__accent"
      :style="{ background: `linear-gradient(90deg, ${project.color}, transparent)` }"
      aria-hidden="true"
    />
  </article>
</template>

<style scoped>
@reference "@/styles/main.css";

.project-card {
  position: relative;
  @apply rounded-2xl overflow-hidden;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  cursor: none;
  transition: border-color 0.4s;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  border-color: var(--card-border-hover);
}

/* Meta */
.project-card__meta {
  padding: 1.5rem;
  flex: 1;
}

.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.project-card__header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
}

.project-card__index {
  @apply text-xs text-surface-300 font-mono;
}

.project-card__year {
  @apply text-xs text-surface-300;
}

.project-card__badge {
  @apply text-xs font-medium rounded-full;
  padding: 0.15rem 0.6rem;
}

.project-card__badge--company {
  color: var(--badge-company-color);
  background: var(--badge-company-bg);
  border: 1px solid var(--badge-company-border);
}

.project-card__badge--personal {
  color: var(--badge-personal-color);
  background: var(--badge-personal-bg);
  border: 1px solid var(--badge-personal-border);
}

.project-card__badge--team {
  color: var(--badge-team-color);
  background: var(--badge-team-bg);
  border: 1px solid var(--badge-team-border);
}

.project-card__title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--card-title-color);
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-card__subtitle {
  @apply text-sm text-surface-200;
  margin-bottom: 1rem;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-card__tag {
  @apply text-xs text-surface-300 bg-surface-800 border border-surface-700 rounded-full;
  padding: 0.2rem 0.6rem;
}

/* Bottom accent line */
.project-card__accent {
  height: 2px;
  width: 0;
  transition: width 0.4s ease;
}

.project-card:hover .project-card__accent {
  width: 100%;
}
</style>
