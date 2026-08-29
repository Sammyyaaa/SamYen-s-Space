<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { useCursor } from '~/composables/useCursor'

const { isTouch } = useCursor()
const store = useCursorStore()

const dotRef = ref<HTMLDivElement | null>(null)
const ringRef = ref<HTMLDivElement | null>(null)

// 追蹤 GSAP 內部位置（避免每幀讀取 ref.value 造成 getter 開銷）
let dotX = 0,
  dotY = 0
let ringX = 0,
  ringY = 0
let setDotX: (v: number) => void
let setDotY: (v: number) => void
let setRingX: (v: number) => void
let setRingY: (v: number) => void

function tick() {
  // 點：直接賦值 → 與原生游標同等即時
  dotX = store.x
  dotY = store.y

  // 環：低 lerp 因子 → 滯後感
  ringX += (store.x - ringX) * 0.12
  ringY += (store.y - ringY) * 0.12

  setDotX(dotX)
  setDotY(dotY)
  setRingX(ringX)
  setRingY(ringY)
}

onMounted(() => {
  if (isTouch) return

  // xPercent / yPercent 只設定一次用於置中，之後 GSAP 不會再動這兩個屬性
  gsap.set(dotRef.value, { xPercent: -50, yPercent: -50 })
  gsap.set(ringRef.value, { xPercent: -50, yPercent: -50, scale: 0.25 })

  setDotX = gsap.quickSetter(dotRef.value, 'x', 'px') as (v: number) => void
  setDotY = gsap.quickSetter(dotRef.value, 'y', 'px') as (v: number) => void
  setRingX = gsap.quickSetter(ringRef.value, 'x', 'px') as (v: number) => void
  setRingY = gsap.quickSetter(ringRef.value, 'y', 'px') as (v: number) => void

  gsap.ticker.add(tick)
})

onBeforeUnmount(() => gsap.ticker.remove(tick))

// 基礎尺寸 160px = 最大顯示尺寸，預設縮到 0.25 = 40px
// GPU 紋理以 160px 建立，scale 只做縮小/還原，永不放大 → 保持銳利
// ringBorder 補償：視覺線寬 = CSS border × scale，保持約 1.5px 外觀
const variants = {
  default: { ringScale: 0.25, ringOpacity: 0.6, dotScale: 1, ringBorder: 6 },
  hover: { ringScale: 0.45, ringOpacity: 0.9, dotScale: 0.4, ringBorder: 3.3 },
  text: { ringScale: 0.7, ringOpacity: 0.4, dotScale: 0, ringBorder: 2.1 },
  link: { ringScale: 0.5, ringOpacity: 0.9, dotScale: 1.2, ringBorder: 3 },
  project: { ringScale: 0.875, ringOpacity: 0.7, dotScale: 0.4, ringBorder: 1.7 },
  drag: { ringScale: 0.55, ringOpacity: 0.7, dotScale: 0.3, ringBorder: 2.7 },
  title: { ringScale: 0.8, ringOpacity: 0.85, dotScale: 0.3, ringBorder: 1.9 },
} as const

watch(
  () => store.variant,
  (v) => {
    if (!ringRef.value || !dotRef.value) return
    const cfg = variants[v] ?? variants.default

    gsap.to(ringRef.value, {
      scale: cfg.ringScale,
      opacity: cfg.ringOpacity,
      borderWidth: cfg.ringBorder,
      duration: 0.45,
      ease: 'power3.out',
    })

    gsap.to(dotRef.value, {
      scale: cfg.dotScale,
      duration: 0.3,
      ease: 'power3.out',
    })
  }
)
</script>

<template>
  <template v-if="!isTouch">
    <!--
      不使用 :style 綁定位置 — 位置完全交由 GSAP RAF 驅動，
      避免 Vue reactive 更新與 GSAP scale 動畫互相覆蓋 transform。
    -->
    <div
      ref="dotRef"
      aria-hidden="true"
      class="cursor-dot"
      :class="{ 'cursor--hidden': !store.isVisible }"
    />
    <div
      ref="ringRef"
      aria-hidden="true"
      class="cursor-ring"
      :class="{ 'cursor--hidden': !store.isVisible }"
    />
  </template>
</template>

<style scoped>
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  mix-blend-mode: difference;
}

.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 6px solid #ffffff;
  pointer-events: none;
  z-index: 9998;
  will-change: transform;
  mix-blend-mode: difference;
}

.cursor--hidden {
  opacity: 0 !important;
}

/* 觸控裝置（手機、平板）強制隱藏 */
@media (pointer: coarse) {
  .cursor-dot,
  .cursor-ring {
    display: none !important;
  }
}
</style>
