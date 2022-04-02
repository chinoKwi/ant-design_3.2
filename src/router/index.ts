import { createRouter, createWebHashHistory } from 'vue-router'
// 定义路由配置
const constantRouterMap = [
  // {
  //   name: 'Login',
  //   path: '/Login',
  //   component: () => import('@/pages/Login/Login.vue')
  // },
  {
    name: 'Home',
    path: '/',
    component: () => import('@/pages/Main/Main.vue')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  routes: constantRouterMap
})
