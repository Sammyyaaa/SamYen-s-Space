import type { CursorVariant } from '~/types'

export const useCursorStore = defineStore('cursor', () => {
  const x = ref(0)
  const y = ref(0)
  const variant = ref<CursorVariant>('default')
  const isVisible = ref(false)

  function setVariant(v: CursorVariant) {
    variant.value = v
  }

  return { x, y, variant, isVisible, setVariant }
})
