<script setup lang="ts">
// 一份完整的技術關鍵字組
const words = [
  // Basics
  'HTML5', '·', 'CSS3', '·', 'RWD', '·', 'JavaScript ES6+', '·', 'TypeScript', '·', 'jQuery', '·',
  // Styling
  'Sass', '·', 'Bootstrap', '·', 'Tailwind CSS', '·',
  // Frameworks
  'Vue', '·', 'Nuxt 3', '·', 'Angular', '·',
  // State Management
  'Vuex', '·', 'Pinia', '·', 'RxJS', '·',
  // Building Tools
  'Vite', '·', 'npm', '·', 'Yarn', '·',
  // API
  'Ajax', '·', 'Axios', '·', 'Fetch', '·', 'RESTful', '·', 'TanStack Query', '·',
  // UI/UX
  'Photoshop', '·', 'Illustrator', '·', 'Figma', '·',
  // Dev Tools
  'ESLint', '·', 'Prettier', '·', 'Git', '·', 'GitHub', '·', 'SourceTree', '·', 'Postman', '·',
  // AI Development Tools
  'Claude Code', '·', 'GitHub Copilot', '·', 'Codex CLI', '·', 'Spec-driven Development', '·', 'Sandbox', '·',
]

// 三份確保任何螢幕寬度都不中斷
// 動畫跑 -33.333%（一份長度），第二份對齊起點，完美無縫
const track = [...words, ...words, ...words]
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <span
        v-for="(word, i) in track"
        :key="i"
        class="marquee__word"
        :class="{ 'marquee__word--dot': word === '·' }"
      >
        {{ word }}
      </span>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/styles/main.css";

.marquee {
  overflow: hidden;
  padding: 1.25rem 0;
  @apply border-y border-surface-800;
  position: relative;
  user-select: none;
}

.marquee::before,
.marquee::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 6rem;
  z-index: 1;
  pointer-events: none;
}

.marquee::before {
  left: 0;
  background: linear-gradient(90deg, var(--color-surface-950), transparent);
}

.marquee::after {
  right: 0;
  background: linear-gradient(-90deg, var(--color-surface-950), transparent);
}

.marquee__track {
  display: flex;
  gap: 1.25rem;
  width: max-content;
  /* 3 份內容，動畫跑 -33.333% = 一份長度，第二份對齊起點 → 無縫 */
  animation: marquee-scroll 75s linear infinite;
}

.marquee__word {
  @apply text-xs font-medium text-surface-300 whitespace-nowrap tracking-wider uppercase;
  flex-shrink: 0;
}

.marquee__word--dot {
  @apply text-surface-200;
  font-size: 0.75rem;
  line-height: 1.4;
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-33.333%); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
</style>
