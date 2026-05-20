import { onMounted, onBeforeUnmount, ref } from 'vue'
import Lenis from 'lenis'
import { isTouchDevice } from '@/utils/helpers'

let lenisInstance: Lenis | null = null

/**
 * Singleton Lenis smooth scroll.
 * 不啟動自己的 RAF，由外層（DefaultLayout）透過 GSAP ticker 統一驅動，
 * 避免每幀雙重呼叫 lenis.raf() 造成滾動異常。
 */
export function useLenis() {
  const lenis = ref<Lenis | null>(null)

  function initLenis() {
    if (isTouchDevice()) return
    if (lenisInstance) {
      lenis.value = lenisInstance
      return
    }

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenis.value = lenisInstance
  }

  function destroyLenis() {
    lenisInstance?.destroy()
    lenisInstance = null
    lenis.value = null
  }

  onMounted(initLenis)
  onBeforeUnmount(destroyLenis)

  return { lenis }
}

export function getLenis(): Lenis | null {
  return lenisInstance
}
