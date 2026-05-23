import { onMounted, onBeforeUnmount, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, isTouchDevice } from '@/utils/helpers'

gsap.registerPlugin(ScrollTrigger)

interface RevealOptions {
  /** Y-axis offset before animation (px) */
  y?: number
  /** Opacity start value */
  opacity?: number
  /** Duration in seconds */
  duration?: number
  /** GSAP ease string */
  ease?: string
  /** Stagger between children (seconds) */
  stagger?: number
  /** Delay before animation starts */
  delay?: number
  /** ScrollTrigger start position */
  start?: string
}

/**
 * Reveal a single element or a list of child elements on scroll.
 * Respects prefers-reduced-motion.
 */
export function useReveal(
  containerRef: Ref<HTMLElement | null>,
  options: RevealOptions = {},
) {
  const {
    y = 30,
    opacity = 0,
    duration = 0.7,
    ease = 'power3.out',
    stagger = 0,
    delay = 0,
    start = 'top 85%',
  } = options

  let ctx: gsap.Context

  onMounted(() => {
    if (!containerRef.value) return

    ctx = gsap.context(() => {
      const targets = stagger
        ? containerRef.value!.children
        : containerRef.value

      if (prefersReducedMotion() || isTouchDevice()) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }

      gsap.from(targets, {
        opacity,
        y,
        duration,
        ease,
        delay,
        stagger,
        scrollTrigger: {
          trigger: containerRef.value,
          start,
          once: true,
        },
      })
    })
  })

  onBeforeUnmount(() => ctx?.revert())
}

/**
 * Horizontal text marquee on scroll velocity.
 */
export function useScrollMarquee(
  trackRef: Ref<HTMLElement | null>,
  options: { speed?: number; direction?: 1 | -1 } = {},
) {
  const { speed = 1, direction = -1 } = options
  let ctx: gsap.Context

  onMounted(() => {
    if (!trackRef.value || prefersReducedMotion()) return

    ctx = gsap.context(() => {
      gsap.to(trackRef.value, {
        xPercent: direction * 50,
        ease: 'none',
        scrollTrigger: {
          trigger: trackRef.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: speed,
        },
      })
    })
  })

  onBeforeUnmount(() => ctx?.revert())
}

/**
 * Pin a section and drive animations via scroll progress.
 * Returns the timeline for custom keyframes.
 */
export function useScrollPin(
  sectionRef: Ref<HTMLElement | null>,
  pinLength = '200%',
) {
  let ctx: gsap.Context
  let tl: gsap.core.Timeline

  onMounted(() => {
    if (!sectionRef.value || prefersReducedMotion()) return

    ctx = gsap.context(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top top',
          end: `+=${pinLength}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })
    })
  })

  onBeforeUnmount(() => ctx?.revert())

  return {
    getTimeline: () => tl,
  }
}

/**
 * Parallax depth effect for a child element inside a container.
 */
export function useParallax(
  containerRef: Ref<HTMLElement | null>,
  targetRef: Ref<HTMLElement | null>,
  options: { speed?: number; direction?: 'y' | 'x' } = {},
) {
  const { speed = 0.3, direction = 'y' } = options
  let ctx: gsap.Context

  onMounted(() => {
    if (!containerRef.value || !targetRef.value || prefersReducedMotion() || isTouchDevice()) return

    ctx = gsap.context(() => {
      gsap.to(targetRef.value, {
        [direction]: () =>
          direction === 'y'
            ? containerRef.value!.offsetHeight * speed * -1
            : containerRef.value!.offsetWidth * speed * -1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    })
  })

  onBeforeUnmount(() => ctx?.revert())
}
