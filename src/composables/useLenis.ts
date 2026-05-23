import { ref } from 'vue'

export function useLenis() {
  return { lenis: ref(null) }
}

export function getLenis() {
  return null
}
