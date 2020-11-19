import Vue from 'vue'
import Router from 'vue-router'
import {} from './'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/default',
    name: 'default',
    component: () => import('@/views/Default')
  },
  {
    path: '/',
    redirect: '/default'
  }
]

const createRouter = () =>
  new Router({
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes: constantRoutes
  })

const router = createRouter()

export default router
