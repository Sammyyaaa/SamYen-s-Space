import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import type { CursorVariant } from '@/types'
import { isTouchDevice } from '@/utils/helpers'

const cursorX = ref(0)
const cursorY = ref(0)
const cursorVariant = ref<CursorVariant>('default')
const isVisible = ref(false)

/**
 * Global custom cursor state & magnetic interaction.
 * Call once at App root; use setCursorVariant anywhere.
 */
export function useCursor() {
  const isTouch = isTouchDevice()

  function onMouseMove(e: MouseEvent) {
    cursorX.value = e.clientX
    cursorY.value = e.clientY
    if (!isVisible.value) isVisible.value = true
  }

  function onMouseLeave() {
    isVisible.value = false
  }

  function onMouseEnter() {
    isVisible.value = true
  }

  onMounted(() => {
    if (isTouch) return
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
  })

  onBeforeUnmount(() => {
    if (isTouch) return
    window.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseleave', onMouseLeave)
    document.removeEventListener('mouseenter', onMouseEnter)
  })

  return {
    cursorX,
    cursorY,
    cursorVariant,
    isVisible,
    isTouch,
  }
}

/** Reactive setter — call from any component */
export function setCursorVariant(variant: CursorVariant) {
  cursorVariant.value = variant
}

/**
 * Magnetic hover effect for a DOM element.
 * Attach to the element ref via useMagnetic(el).
 */
export function useMagnetic(strength = 0.4) {
  const elRef = ref<HTMLElement | null>(null)
  let bounds: DOMRect

  function onMove(e: MouseEvent) {
    if (!elRef.value) return
    const { left, top, width, height } = bounds
    const x = e.clientX - left - width / 2
    const y = e.clientY - top - height / 2
    gsap.to(elRef.value, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  function onEnter() {
    if (!elRef.value) return
    bounds = elRef.value.getBoundingClientRect()
    elRef.value.addEventListener('mousemove', onMove)
  }

  function onLeave() {
    if (!elRef.value) return
    elRef.value.removeEventListener('mousemove', onMove)
    gsap.to(elRef.value, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  onMounted(() => {
    if (!elRef.value || isTouchDevice()) return
    elRef.value.addEventListener('mouseenter', onEnter)
    elRef.value.addEventListener('mouseleave', onLeave)
  })

  onBeforeUnmount(() => {
    if (!elRef.value) return
    elRef.value.removeEventListener('mouseenter', onEnter)
    elRef.value.removeEventListener('mouseleave', onLeave)
    elRef.value.removeEventListener('mousemove', onMove)
  })

  return { elRef }
}
