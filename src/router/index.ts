import store from '@/store'
import routes_list from '@/assets/js/routes'
import { createRouter, createWebHashHistory } from 'vue-router'

// 定义路由配置
const constantRouterMap = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/Login/Login.vue')
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('@/pages/Main/Main.vue'),
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        component: () => import('@/pages/Welcome/Welcome.vue')
      },
      {
        path: 'redirect',
        name: 'redirect',
        component: () => import('@/pages/Redirect/Redirect.vue'),
        hidden: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  routes: constantRouterMap
})

// 前置 拦截
router.beforeEach((to, from, next) => {
  const path = to.path.substr(1)
  window.localStorage.setItem('path', path)
  if (path === 'login') {
    next()
  } else {
    if (!window.localStorage.getItem('token')) {
      // return next({ path: '/login' })
    }

    if (store.getters['Menu/GET_menu'].length > 0) {
      next()
    } else {
      try {
        store.dispatch('Menu/FEACT_menu', routes_list).then(() => {
          next({ path: path })
        })
      } catch (error) {
        console.log('路由错误')
      }
    }
  }
})

export default router
