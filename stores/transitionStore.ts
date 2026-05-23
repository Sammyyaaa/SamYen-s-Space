export const useTransitionStore = defineStore('transition', () => {
  const isTransitioning = ref(false)
  const isReturningHome = ref(false)
  const isProjectToProject = ref(false)
  const pendingScrollTarget = ref<string | null>(null)
  const savedHomeScrollY = ref(0)

  return {
    isTransitioning,
    isReturningHome,
    isProjectToProject,
    pendingScrollTarget,
    savedHomeScrollY,
  }
})
