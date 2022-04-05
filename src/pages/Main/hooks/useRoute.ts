import { ref } from 'vue'
import { IMenu } from '@/types/common'

export const route_list = ref<IMenu[]>([]) // 路由列表

// 整理路由
export const fomat_route = (list: IMenu[]) => {
  route_list.value = []
  list.forEach((ele) => {
    if (ele.children) {
      ele.children.forEach((child) => {
        route_list.value.push(child)
      })
    } else {
      route_list.value.push(ele)
    }
  })
}
