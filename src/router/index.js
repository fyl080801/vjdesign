import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/default',
    name: 'default',
    component: () =>
      import(/* webpackChunkName: "demo-default" */ '@/views/Default')
  },
  {
    path: '/antd',
    name: 'antd',
    component: () => import(/* webpackChunkName: "demo-antd" */ '@/views/Antd')
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
