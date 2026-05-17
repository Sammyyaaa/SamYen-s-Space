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
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
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
