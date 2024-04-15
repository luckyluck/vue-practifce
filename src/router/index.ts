import { createRouter, createWebHistory } from 'vue-router'

import CoachesList from '@/pages/coaches/CoachesList.vue'
import NotFound from '@/pages/NotFound.vue'
import { useAuthStore } from '@/stores'

const ContactCoach = () => import('@/pages/requests/ContactCoach.vue')
const CoachDetails = () => import('@/pages/coaches/CoachDetails.vue')
const CoachRegistration = () => import('@/pages/coaches/CoachRegistration.vue')
const RequestsReceived = () => import('@/pages/requests/RequestsReceived.vue')
const UserAuth = () => import('@/pages/auth/UserAuth.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true }
    },
    { path: '/auth', component: UserAuth, meta: { requiresAnonymous: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresAnonymous && authStore.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
