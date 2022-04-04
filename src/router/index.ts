import store from '@/store'
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
router.beforeEach(async (to, from, next) => {
  const path = to.path.substr(1)
  window.localStorage.setItem('path', path)
  if (path === 'login') {
    next()
  } else {
    if (!window.localStorage.getItem('token')) {
      // return next({ path: '/login' })
    }

    if (store.state.Menu.menu && store.state.Menu.menu.length > 0) {
      next()
    } else {
      console.log('添加路由')

      try {
        store.dispatch('Menu/FEACT_menu', [
          {
            _id: '60dd203cd5e4a02a54085fc5',
            path: 'father_api',
            icon: 'user-outlined',
            name: '用户中心',
            children: [
              {
                _id: '60dd1f863648f041805b42c8',
                path: 'hello',
                icon: 'appstore-outlined',
                name: 'Hello',
                component: 'Hello'
              }
            ]
          }
        ])
        next()
        console.log('路由放行')
      } catch (error) {
        console.log('路由错误')
      }
    }
  }
})

export default router
