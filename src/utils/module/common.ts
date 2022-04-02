import router from '@/router'

/**
 * 跳转路由
 * @param nowpath 当前路劲
 * @param topath 需要跳转的路径
 */
export const push_route = (nowpath: string, topath: string) => {
  if (nowpath === topath) return
  console.log('router', router)

  router.push(topath)
}
