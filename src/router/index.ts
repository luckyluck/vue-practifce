import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

// @ts-ignore
import CoachesList from '@/pages/coaches/CoachesList.vue'
import NotFound from '@/pages/NotFound.vue'

// @ts-ignore
const ContactCoach = () => import('@/pages/requests/ContactCoach.vue')
// @ts-ignore
const CoachDetails = () => import('@/pages/coaches/CoachDetails.vue')
// @ts-ignore
const CoachRegistration = () => import('@/pages/coaches/CoachRegistration.vue')
// @ts-ignore
const RequestsReceived = () => import('@/pages/requests/RequestsReceived.vue')
// @ts-ignore
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
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresAnonymous && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
