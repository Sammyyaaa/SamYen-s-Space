<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '@/composables/useScrollAnimation'
import { setCursorVariant, useMagnetic } from '@/composables/useCursor'

const contentRef = ref<HTMLElement | null>(null)
const { elRef: githubBtnRef } = useMagnetic(1.2)
const { elRef: emailBtnRef  } = useMagnetic(1.2)

useReveal(contentRef, { y: 60, duration: 1.2, stagger: 0 })

const onGithubEnter = () => setCursorVariant('hover')
const onGithubLeave = () => setCursorVariant('default')
const onEmailEnter  = () => setCursorVariant('hover')
const onEmailLeave  = () => setCursorVariant('default')
</script>

<template>
  <section
    id="contact"
    class="contact-section noise-overlay"
    aria-labelledby="contact-title"
  >
    <div class="contact-bg" aria-hidden="true" />

    <div ref="contentRef" class="contact-content">
      <span class="section-eyebrow">Contact</span>

      <h2 id="contact-title" class="contact-title">
        Let's build something<br />
        <span class="text-gradient">extraordinary</span>
      </h2>

      <p class="contact-desc">
        需要聯繫或只是想打個招呼？<br class="hidden md:block" />
        歡迎透過 Email 或 GitHub 找我。
      </p>

      <!-- Contact icons -->
      <div class="contact-links">
        <!-- Email button -->
        <a
          ref="emailBtnRef"
          href="mailto:x0710078@gmail.com"
          class="contact-icon-btn"
          aria-label="Email: x0710078@gmail.com"
          @mouseenter="onEmailEnter"
          @mouseleave="onEmailLeave"
        >
          <svg
            class="contact-icon-btn__icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>

        <!-- GitHub button -->
        <a
          ref="githubBtnRef"
          href="https://github.com/Sammyyaaa"
          class="contact-icon-btn"
          aria-label="GitHub: Sammyyaaa"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="onGithubEnter"
          @mouseleave="onGithubLeave"
        >
          <svg
            class="contact-icon-btn__icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c.957.004 1.983.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "@/styles/main.css";

.contact-section {
  position: relative;
  padding: 10rem 2rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: var(--card-blur);
  -webkit-backdrop-filter: var(--card-blur);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.contact-bg {
  position: absolute;
  inset: 0;
  background: var(--contact-bg);
  pointer-events: none;
}

.contact-content {
  position: relative;
  z-index: 1;
  max-width: 1440px;
  margin: 0 auto;
  text-align: center;
}

.section-eyebrow {
  display: inline-block;
  @apply text-xs text-brand-400 font-mono tracking-widest uppercase;
  margin-bottom: 1.5rem;
}

.contact-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.05;
  @apply text-surface-50;
  margin-bottom: 1.5rem;
}

.contact-desc {
  @apply text-surface-400 text-lg;
  line-height: 1.8;
  margin-bottom: 3rem;
}

/* Contact icons row */
.contact-links {
  display: inline-flex;
  align-items: center;
  gap: 5rem;
}

.contact-icon-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  @apply text-surface-50;
  transition: opacity 0.3s, transform 0.3s;
}

.contact-icon-btn:hover {
  opacity: 0.75;
  transform: scale(1.06);
}

.contact-icon-btn__icon {
  width: 48px;
  height: 48px;
}

</style>
