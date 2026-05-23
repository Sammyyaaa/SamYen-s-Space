export default defineNuxtRouteMiddleware((to, from) => {
  const cursor = useCursorStore()
  const transition = useTransitionStore()

  cursor.setVariant('default')

  if (import.meta.client) {
    if (from?.name === 'index') {
      transition.savedHomeScrollY = window.scrollY
    }
  }

  if (to.name === 'index') {
    transition.isReturningHome = true
  }
})
