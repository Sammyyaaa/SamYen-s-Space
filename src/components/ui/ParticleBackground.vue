<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId = 0
let ctx: CanvasRenderingContext2D | null = null
let isMobile = false
let lastFrame = 0

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number   // radius
  o: number   // opacity
}

let particles: Particle[] = []

const MAX_SPEED    = 0.38
const CONNECT_DIST = 130
const CONNECT_SQ   = CONNECT_DIST * CONNECT_DIST

function count(w: number, h: number) {
  return isMobile
    ? Math.min(Math.floor((w * h) / 20000), 40)
    : Math.min(Math.floor((w * h) / 13000), 100)
}

function init(w: number, h: number) {
  particles = Array.from({ length: count(w, h) }, () => ({
    x:  Math.random() * w,
    y:  Math.random() * h,
    vx: (Math.random() - 0.5) * MAX_SPEED,
    vy: (Math.random() - 0.5) * MAX_SPEED,
    r:  Math.random() * 1.2 + 0.4,
    o:  Math.random() * 0.35 + 0.15,
  }))
}

function onResize() {
  if (!canvasRef.value) return
  canvasRef.value.width  = window.innerWidth
  canvasRef.value.height = window.innerHeight
  init(canvasRef.value.width, canvasRef.value.height)
}

function tick(ts: number) {
  if (!ctx || !canvasRef.value) return

  // On mobile, throttle to ~30fps to reduce CPU load
  if (isMobile && ts - lastFrame < 33) {
    animId = requestAnimationFrame(tick)
    return
  }
  lastFrame = ts

  const w = canvasRef.value.width
  const h = canvasRef.value.height
  const isLight = document.documentElement.classList.contains('light-mode')
  const rgb     = isLight ? '10,10,10' : '255,255,255'
  const margin  = 80

  ctx.clearRect(0, 0, w, h)

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    // Brownian nudge
    p.vx += (Math.random() - 0.5) * 0.014
    p.vy += (Math.random() - 0.5) * 0.014

    // Soft edge repulsion — keep particles away from viewport boundary
    if (p.x < margin)     p.vx += 0.008
    if (p.x > w - margin) p.vx -= 0.008
    if (p.y < margin)     p.vy += 0.008
    if (p.y > h - margin) p.vy -= 0.008

    // Speed cap
    const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
    if (spd > MAX_SPEED) {
      p.vx = (p.vx / spd) * MAX_SPEED
      p.vy = (p.vy / spd) * MAX_SPEED
    }

    p.x += p.vx
    p.y += p.vy

    // Draw particle dot
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${rgb},${p.o})`
    ctx.fill()

    // Connecting lines: skip on mobile (O(n²) is too costly for mobile CPUs)
    if (!isMobile) {
      for (let j = i + 1; j < particles.length; j++) {
        const q  = particles[j]
        const dx = p.x - q.x
        const dy = p.y - q.y
        const dSq = dx * dx + dy * dy
        if (dSq < CONNECT_SQ) {
          const lineO = (1 - Math.sqrt(dSq) / CONNECT_DIST) * 0.13
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(q.x, q.y)
          ctx.strokeStyle = `rgba(${rgb},${lineO})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
  }

  animId = requestAnimationFrame(tick)
}

onMounted(() => {
  if (!canvasRef.value) return
  isMobile = window.matchMedia('(pointer: coarse)').matches
  ctx = canvasRef.value.getContext('2d')
  onResize()

  // Respect prefers-reduced-motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animId = requestAnimationFrame(tick)
  }

  window.addEventListener('resize', onResize, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <canvas ref="canvasRef" class="particle-canvas" aria-hidden="true" />
</template>

<style scoped>
.particle-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
