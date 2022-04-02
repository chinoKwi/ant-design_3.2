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

// 配置 router 拦截
// 前置
router.beforeEach(async (to, from, next) => {
  const path = to.path.substr(1)
  window.localStorage.setItem('path', path)
  if (path === 'login') {
    next()
  } else {
    if (!window.localStorage.getItem('token')) {
      return next({ path: '/login' })
    } else {
      // if (store.state.Menu.menu && store.state.Menu.menu.length > 0) {
      //   next()
      // } else {
      //   await store.dispatch('Menu/FEACT_menu')
      //   next()
      // }
      next()
    }
  }
})

export default router
