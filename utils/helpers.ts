// ── Math helpers ──

/** Linear interpolation */
export const lerp = (start: number, end: number, factor: number): number =>
  start + (end - start) * factor

/** Clamp value between min and max */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

/** Map value from one range to another */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin

// ── DOM helpers ──

/** Check if element is in viewport */
export const isInViewport = (el: Element, threshold = 0): boolean => {
  const rect = el.getBoundingClientRect()
  return (
    rect.top <= window.innerHeight * (1 - threshold) &&
    rect.bottom >= window.innerHeight * threshold
  )
}

/** Get element's offset from top of document */
export const getOffsetTop = (el: HTMLElement): number => {
  let top = 0
  let element: HTMLElement | null = el
  while (element) {
    top += element.offsetTop
    element = element.offsetParent as HTMLElement | null
  }
  return top
}

// ── String helpers ──

/** Pad number with leading zeros */
export const padNumber = (n: number, digits = 2): string => String(n).padStart(digits, '0')

/** Format project index for display */
export const formatIndex = (index: number): string => padNumber(index + 1)

// ── Device detection ──

/** Check if device supports touch */
export const isTouchDevice = (): boolean => {
  if (!import.meta.client) return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/** Check if reduced motion is preferred */
export const prefersReducedMotion = (): boolean => {
  if (!import.meta.client) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
