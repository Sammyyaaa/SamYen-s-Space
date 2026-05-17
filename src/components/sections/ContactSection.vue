<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { useReveal } from '@/composables/useScrollAnimation'
import { setCursorVariant, useMagnetic } from '@/composables/useCursor'
import { lerp, prefersReducedMotion } from '@/utils/helpers'

const isDesktop = window.innerWidth >= 1024

const sectionRef   = ref<HTMLElement | null>(null)
const contentRef   = ref<HTMLElement | null>(null)
const { elRef: githubBtnRef } = useMagnetic(0.7)
const { elRef: emailBtnRef  } = useMagnetic(0.7)

useReveal(contentRef, { y: 60, duration: 1.2, stagger: 0 })

// ── 引力追蹤球 ──
const orbRefs = ref<HTMLElement[]>([])

interface OrbConfig {
  lerpFactor: number
  idleAmpX: number; idleAmpY: number
  idleFreqX: number; idleFreqY: number
  idlePhaseX: number; idlePhaseY: number
  orbitPhase: number  // 環繞時的起始角度偏移（rad）
}

const ORB_CONFIGS: readonly OrbConfig[] = [
  { lerpFactor: 0.20, idleAmpX: 110, idleAmpY:  55, idleFreqX: 0.0008, idleFreqY: 0.0011, idlePhaseX: 0,   idlePhaseY: 0.5,  orbitPhase: 0           },
  { lerpFactor: 0.12, idleAmpX:  80, idleAmpY:  90, idleFreqX: 0.0012, idleFreqY: 0.0009, idlePhaseX: 1.2, idlePhaseY: 2.1,  orbitPhase: Math.PI / 2 },
  { lerpFactor: 0.07, idleAmpX: 130, idleAmpY:  45, idleFreqX: 0.0007, idleFreqY: 0.0015, idlePhaseX: 2.5, idlePhaseY: 0.8,  orbitPhase: Math.PI     },
  { lerpFactor: 0.04, idleAmpX:  55, idleAmpY: 110, idleFreqX: 0.0015, idleFreqY: 0.0007, idlePhaseX: 4.1, idlePhaseY: 3.3,  orbitPhase: Math.PI * 1.5 },
] as const

const ORBIT_RADIUS = 56      // 環繞半徑 px
const ORBIT_SPEED  = 0.00314 // rad/ms ≈ 1 圈 / 2s

const orbX = [0, 0, 0, 0]
const orbY = [0, 0, 0, 0]
const blendState  = { factor: 0 }  // 0=idle, 1=cursor tracking
const orbitBlend  = { factor: 0 }  // 0=cursor tracking, 1=orbiting
const targetState = { x: 0, y: 0 } // 游標相對 section 中心

let orbitCenterX = 0
let orbitCenterY = 0
let isInSection  = false
let rafId = 0

function tick() {
  const now = performance.now()
  for (let i = 0; i < 4; i++) {
    const cfg = ORB_CONFIGS[i]
    const el  = orbRefs.value[i]
    if (!el) continue

    // Idle sine（持續計算）
    const idleX = Math.sin(now * cfg.idleFreqX + cfg.idlePhaseX) * cfg.idleAmpX
    const idleY = Math.sin(now * cfg.idleFreqY + cfg.idlePhaseY) * cfg.idleAmpY

    // 游標追蹤目標
    const trackX = lerp(idleX, targetState.x, blendState.factor)
    const trackY = lerp(idleY, targetState.y, blendState.factor)

    // 環繞目標（以 GitHub 為圓心）
    const angle  = now * ORBIT_SPEED + cfg.orbitPhase
    const orbitX = orbitCenterX + Math.cos(angle) * ORBIT_RADIUS
    const orbitY = orbitCenterY + Math.sin(angle) * ORBIT_RADIUS

    // 最終目標：追蹤 ↔ 環繞 平滑混合
    const desiredX = lerp(trackX, orbitX, orbitBlend.factor)
    const desiredY = lerp(trackY, orbitY, orbitBlend.factor)

    // lerp factor：環繞時加快，讓圓形更流暢
    const f = lerp(lerp(0.08, cfg.lerpFactor, blendState.factor), 0.18, orbitBlend.factor)

    orbX[i] += (desiredX - orbX[i]) * f
    orbY[i] += (desiredY - orbY[i]) * f

    gsap.set(el, { x: orbX[i], y: orbY[i] })
  }
  rafId = requestAnimationFrame(tick)
}

// ── Section 事件 ──
function onSectionEnter() {
  isInSection = true
  setCursorVariant('drag')
  gsap.killTweensOf(blendState)
  gsap.to(blendState, { factor: 1, duration: 0.6, ease: 'power2.out' })
}

function onSectionLeave() {
  isInSection = false
  setCursorVariant('default')
  gsap.killTweensOf(blendState)
  gsap.killTweensOf(targetState)
  gsap.to(blendState,  { factor: 0, duration: 0.8, ease: 'power3.out' })
  gsap.to(targetState, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' })
}

function onSectionMouseMove(e: MouseEvent) {
  const rect = sectionRef.value?.getBoundingClientRect()
  if (!rect) return
  targetState.x = e.clientX - rect.left - rect.width  / 2
  targetState.y = e.clientY - rect.top  - rect.height / 2
}

// ── 通用：icon hover 觸發環繞 ──
function onIconEnter(elRef: { value: HTMLElement | null }) {
  setCursorVariant('hover')
  const sectionRect = sectionRef.value?.getBoundingClientRect()
  const iconEl      = elRef.value as HTMLElement | null
  if (!sectionRect || !iconEl) return
  const r = iconEl.getBoundingClientRect()
  orbitCenterX = (r.left + r.width  / 2) - (sectionRect.left + sectionRect.width  / 2)
  orbitCenterY = (r.top  + r.height / 2) - (sectionRect.top  + sectionRect.height / 2)
  gsap.killTweensOf(orbitBlend)
  gsap.to(orbitBlend, { factor: 1, duration: 0.5, ease: 'power2.out' })
}

function onIconLeave() {
  setCursorVariant(isInSection ? 'drag' : 'default')
  gsap.killTweensOf(orbitBlend)
  gsap.to(orbitBlend, { factor: 0, duration: 0.6, ease: 'power2.out' })
}

const onGithubEnter = () => onIconEnter(githubBtnRef as { value: HTMLElement | null })
const onGithubLeave = onIconLeave
const onEmailEnter  = () => onIconEnter(emailBtnRef  as { value: HTMLElement | null })
const onEmailLeave  = onIconLeave

onMounted(() => {
  if (!sectionRef.value || !isDesktop) return
  orbRefs.value.forEach(el => {
    if (el) gsap.set(el, { xPercent: -50, yPercent: -50 })
  })
  if (!prefersReducedMotion()) rafId = requestAnimationFrame(tick)
  sectionRef.value.addEventListener('mouseenter', onSectionEnter)
  sectionRef.value.addEventListener('mouseleave', onSectionLeave)
  sectionRef.value.addEventListener('mousemove',  onSectionMouseMove, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  gsap.killTweensOf(blendState)
  gsap.killTweensOf(orbitBlend)
  gsap.killTweensOf(targetState)
  if (sectionRef.value) {
    sectionRef.value.removeEventListener('mouseenter', onSectionEnter)
    sectionRef.value.removeEventListener('mouseleave', onSectionLeave)
    sectionRef.value.removeEventListener('mousemove',  onSectionMouseMove)
  }
})
</script>

<template>
  <section
    ref="sectionRef"
    id="contact"
    class="contact-section noise-overlay"
    aria-labelledby="contact-title"
  >
    <div class="contact-bg" aria-hidden="true" />

    <!-- 引力追蹤球（桌機限定） -->
    <template v-if="isDesktop">
      <div
        v-for="(cfg, i) in ORB_CONFIGS"
        :key="i"
        :ref="(el) => { if (el) orbRefs[i] = el as HTMLElement }"
        :class="`contact-orb contact-orb--${i + 1}`"
        aria-hidden="true"
      />
    </template>

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
  background: rgba(255, 255, 255, 0.008);
  backdrop-filter: blur(24px) saturate(1.6);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
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

/* 引力追蹤球 */
.contact-orb {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
  filter: blur(2px);
  z-index: 0;
}

.contact-orb--1 {
  width: 16px;
  height: 16px;
  background: rgba(68, 97, 242, 0.9);
  box-shadow: 0 0 12px 4px rgba(68, 97, 242, 0.6), 0 0 28px 8px rgba(68, 97, 242, 0.25);
}

.contact-orb--2 {
  width: 13px;
  height: 13px;
  background: rgba(168, 85, 247, 0.8);
  box-shadow: 0 0 10px 3px rgba(168, 85, 247, 0.55), 0 0 24px 7px rgba(168, 85, 247, 0.2);
}

.contact-orb--3 {
  width: 11px;
  height: 11px;
  background: rgba(68, 97, 242, 0.65);
  box-shadow: 0 0 9px 3px rgba(68, 97, 242, 0.4), 0 0 20px 6px rgba(68, 97, 242, 0.15);
}

.contact-orb--4 {
  width: 9px;
  height: 9px;
  background: rgba(6, 182, 212, 0.55);
  box-shadow: 0 0 8px 3px rgba(6, 182, 212, 0.4), 0 0 18px 5px rgba(6, 182, 212, 0.15);
}

@media (prefers-reduced-motion: reduce) {
  .contact-orb { filter: none; }
}
</style>
