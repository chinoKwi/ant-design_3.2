import router from '@/router'

/**
 * 跳转路由
 * @param topath 需要跳转的路径
 */
export const push_route = (topath: string) => {
  console.log('tiaozhuan', topath)

  router.push(topath)
}
