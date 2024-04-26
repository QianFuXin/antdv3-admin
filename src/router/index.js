import { createRouter, createWebHistory } from 'vue-router'
import { message } from 'ant-design-vue'

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
          path: '/hello',
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
  const token = sessionStorage.getItem('token')

  if (requiresAuth && !token) {
    message.error('请登录！')
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
