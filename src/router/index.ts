import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/loginPage.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/mainPage.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
