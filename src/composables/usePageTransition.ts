import { ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from '@/composables/useLenis'
import router from '@/router'

const isTransitioning = ref(false)
export const isReturningHome = ref(false)
export const isProjectToProject = ref(false)
export const pendingScrollTarget = ref<string | null>(null)
let savedHomeScrollY = 0

// 離開首頁時記錄捲動位置；導向首頁時標記為返回狀態
router.beforeEach((to, from) => {
  if (from.name === 'home') {
    savedHomeScrollY = window.scrollY
  }
  if (to.name === 'home') {
    isReturningHome.value = true
  }
})

/**
 * 頁面過渡動畫。
 *
 * enter 只做 opacity，不加 y transform。
 * 原因：y transform 作用於頁面根元素時，所有子元素的 getBoundingClientRect 會帶入
 * 偏移量，導致 ScrollTrigger 在使用者捲動期間計算位置錯誤，section 動畫無法即時觸發。
 *
 * 重要：enter 動畫結束後必須用 clearProps: 'all' 清除 GSAP 殘留的 inline opacity。
 */
export function usePageTransition() {
  function enter(el: Element, done: () => void) {
    const isHome = router.currentRoute.value.name === 'home'

    gsap.set(el, { opacity: 0 })

    if (isHome && savedHomeScrollY > 0 && !pendingScrollTarget.value) {
      // 延後至 nextTick，讓 HomePage 先 mount 所有 deferred section（belowFoldReady），
      // 確保 DOM 完整後再還原捲動位置與 refresh ScrollTrigger
      nextTick(() => {
        window.scrollTo(0, savedHomeScrollY)
        getLenis()?.scrollTo(savedHomeScrollY, { immediate: true })
        ScrollTrigger.refresh()
      })
    } else if (!isHome) {
      window.scrollTo(0, 0)
      getLenis()?.scrollTo(0, { immediate: true })
      ScrollTrigger.refresh()
    } else {
      ScrollTrigger.refresh()
    }

    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        clearProps: 'all',
        onComplete: () => {
          isTransitioning.value = false
          isReturningHome.value = false
          isProjectToProject.value = false
          if (pendingScrollTarget.value) {
            const target = document.querySelector(pendingScrollTarget.value)
            const lenis = getLenis()
            if (lenis && target) {
              lenis.scrollTo(target, { duration: 0.9 })
            } else if (target) {
              target.scrollIntoView({ behavior: 'smooth' })
            }
            pendingScrollTarget.value = null
          }
          done()
        },
      },
    )
  }

  function leave(el: Element, done: () => void) {
    isTransitioning.value = true
    if (isProjectToProject.value) {
      gsap.to(el, {
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in',
        onComplete: done,
      })
    } else {
      gsap.to(el, {
        opacity: 0,
        y: -16,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: done,
      })
    }
  }

  return { enter, leave, isTransitioning }
}
