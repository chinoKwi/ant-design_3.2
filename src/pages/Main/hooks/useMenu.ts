import { ref } from 'vue'
import store from '@/store'
import { push_route } from '@/utils'
import { IMenu } from '@/types/common'
import { IMenuClick } from '@/types/pages/Main'

export const openKeys = ref<string[]>([]) // 展开的菜单
export const selectedKeys = ref<string[]>([]) // 当前选中的菜单项
export const collapsed = ref(false) // 是否收起
export const menu_list = ref<IMenu[]>([]) // 菜单列表

// 菜单点击
export const menu_click = (data: IMenuClick) => {
  push_route(data.key)
}

// 聚焦
export const select_menu = () => {
  const path = window.localStorage.getItem('path')
  store.getters['Menu/GET_menu'].forEach((ele: IMenu) => {
    if (ele.path === path) {
      // 选中的一级菜单
      selectedKeys.value = [path]
      openKeys.value = []
      return
    }
    if (ele.children) {
      ele.children.forEach((child) => {
        if (child.path === path) {
          // 子元素匹配
          selectedKeys.value = [path]
          if (!collapsed.value) {
            openKeys.value = [ele.path]
          } else {
            openKeys.value = []
          }
        }
      })
    }
  })
}
