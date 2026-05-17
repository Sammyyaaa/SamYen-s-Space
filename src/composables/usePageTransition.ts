import { ref } from 'vue'
import { gsap } from 'gsap'

const isTransitioning = ref(false)

/**
 * 頁面過渡動畫。
 *
 * 重要：enter 動畫結束後必須用 clearProps: 'all' 清除 GSAP 殘留的 inline transform。
 * 若不清除，layout 根元素會保留 transform: matrix(...) inline style，
 * 使 position: fixed 子元素以 layout 為 containing block，
 * 捲動時偏移至可視區域外。
 */
export function usePageTransition() {
  function enter(el: Element, done: () => void) {
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        clearProps: 'all',   // 清除 transform 與 opacity inline style
        onComplete: () => {
          isTransitioning.value = false
          done()
        },
      },
    )
  }

  function leave(el: Element, done: () => void) {
    isTransitioning.value = true
    gsap.to(el, {
      opacity: 0,
      y: -16,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: done,
    })
  }

  return { enter, leave, isTransitioning }
}
