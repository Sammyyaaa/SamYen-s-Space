import { nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function usePageTransition() {
  const route = useRoute()
  const store = useTransitionStore()

  function enter(el: Element, done: () => void) {
    const isHome = route.name === 'index'

    gsap.set(el, { opacity: 0 })

    if (isHome && store.savedHomeScrollY > 0 && !store.pendingScrollTarget) {
      // 延後至 nextTick，讓 HomePage 先 mount 所有 deferred section（belowFoldReady），
      // 確保 DOM 完整後再還原捲動位置與 refresh ScrollTrigger
      nextTick(() => {
        window.scrollTo(0, store.savedHomeScrollY)
        ScrollTrigger.refresh()
      })
    } else if (!isHome) {
      window.scrollTo(0, 0)
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
          store.isTransitioning = false
          store.isReturningHome = false
          store.isProjectToProject = false
          if (store.pendingScrollTarget) {
            const target = document.querySelector(store.pendingScrollTarget)
            if (target) target.scrollIntoView({ behavior: 'smooth' })
            store.pendingScrollTarget = null
          }
          done()
        },
      },
    )
  }

  function leave(el: Element, done: () => void) {
    store.isTransitioning = true
    if (store.isProjectToProject) {
      gsap.to(el, { opacity: 0, duration: 0.35, ease: 'power3.in', onComplete: done })
    } else {
      gsap.to(el, { opacity: 0, y: -16, duration: 0.35, ease: 'power2.in', onComplete: done })
    }
  }

  return { enter, leave }
}
