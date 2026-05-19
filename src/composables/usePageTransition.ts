import { ref } from 'vue'
import { gsap } from 'gsap'
import { getLenis } from '@/composables/useLenis'
import router from '@/router'

const isTransitioning = ref(false)
let savedHomeScrollY = 0

// 離開首頁時立即記錄 Lenis 捲動位置，確保精確還原
router.beforeEach((_, from) => {
  if (from.name === 'home') {
    savedHomeScrollY = window.scrollY
  }
})

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
    const isHome = router.currentRoute.value.name === 'home'

    // 防止進場前的單幀閃爍
    gsap.set(el, { opacity: 0 })

    if (isHome && savedHomeScrollY > 0) {
      // 返回首頁：還原離開時的精確位置
      getLenis()?.scrollTo(savedHomeScrollY, { immediate: true })
      window.scrollTo(0, savedHomeScrollY)
    } else if (!isHome) {
      // 其他頁面：從頂部開始
      getLenis()?.scrollTo(0, { immediate: true })
      window.scrollTo(0, 0)
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        clearProps: 'all',
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
