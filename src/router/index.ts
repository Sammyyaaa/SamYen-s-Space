import { createRouter, createWebHistory } from 'vue-router'
import { setCursorVariant } from '@/composables/useCursor'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
      meta: { title: "SamYen's Space" },
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('@/pages/ProjectDetailPage.vue'),
      meta: { title: 'Project — SamYen' },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(to) {
    // 捲動位置完全由 usePageTransition 管理，僅保留 hash 錨點導航
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return false
  },
})

router.beforeEach(() => {
  setCursorVariant('default')
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  if (title) document.title = title
})

export default router
