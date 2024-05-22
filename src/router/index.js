import { createRouter, createWebHistory } from 'vue-router'
import { notLoginMessage, tokenName } from '@/utils/config.js'
import { error } from '@/utils/message.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/book',
          name: 'Hello',
          component: () => import('@/views/Form.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/table',
          name: 'Table',
          component: () => import('@/views/Table.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const token = sessionStorage.getItem(tokenName)

  if (requiresAuth && !token) {
    error(notLoginMessage)
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
