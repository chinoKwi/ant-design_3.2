import { ref } from 'vue'
import { push_route } from '@/utils'
import { route_list } from './useRoute'
import store from '@/store'
import { IMenu } from '@/types/common'
import { IMenuClick, IPane } from '@/types/pages/Main'

const now_path = ref('') // 当前路由
export const activeKey = ref('') // 选中的Key
export const panes_list = ref<IPane[]>([]) // Tab列表

// 设置路由
export const set_path = (path: string) => {
  now_path.value = path
}

// 添加
export const add_pane = (path: string) => {
  if (path === 'redirect') return
  route_list.value.forEach((ele) => {
    if (ele.path === path) {
      // 匹配到了
      // 检查中 tab 页  是否已存在此项
      let tab_index = -1
      panes_list.value.forEach((pane, index) => {
        if (pane.key === path) return (tab_index = index)
      })
      if (tab_index === -1) {
        // 将数据添加到 panelist 中
        panes_list.value.push({
          title: ele.name,
          key: ele.path
        })
        tab_index = panes_list.value.length - 1
      }
      activeKey.value = panes_list.value[tab_index].key
    }
  })
}
// 移除
export const remove_pane = (key: string) => {
  if (panes_list.value.length === 1) {
    return window.$message.info('至少保留一个tab页面~')
  }
  panes_list.value.forEach((ele, index) => {
    if (ele.key === key) {
      panes_list.value.splice(index, 1)
    }
  })
  activeKey.value = panes_list.value[panes_list.value.length - 1].key
  change_components()
}

// 重新加载
export const reload_components = (path: string) => {
  let item: IMenu = {
    path: '',
    icon: '',
    name: '',
    component: ''
  }

  route_list.value.forEach((ele) => {
    if (ele.path === path.substr(1)) return (item = ele)
  })
  if (item) {
    store.commit('Exclude/SET_exclude', item.component)
    push_route(`/redirect?to=${item.path}&component=${item.component}`)
  }
}
// 切换
export const change_components = (key?: string) => {
  push_route(key ? '/' + key : activeKey.value)
}
// 关闭其他
const close_other = () => {
  let save_item
  panes_list.value.forEach((ele) => {
    if (ele.key === activeKey.value) {
      return (save_item = ele)
    }
  })
  if (save_item) {
    panes_list.value = [save_item]
  }
}

// 菜单点击
export const menu_click = (data: IMenuClick) => {
  switch (data.key) {
    case '1':
      close_other()
      break
    case '2':
      reload_components(now_path.value)
      break
  }
}
