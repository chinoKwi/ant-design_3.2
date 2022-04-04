<template>
  <a-tabs
    v-model:activeKey="activeKey"
    :tabBarGutter="5"
    hide-add
    size="large"
    type="editable-card"
  >
    <a-tab-pane v-for="pane in panes_list" :key="pane.key">
      <template #tab>
        <div @click="change_components(pane.key)">
          <!-- 标题 -->
          {{ pane.title }}
          <!-- 刷新 -->
          <ReloadOutlined
            class="myicon"
            v-if="activeKey == pane.key"
            @click.stop="reload_components"
          />
          <!-- 关闭 -->
          <CloseOutlined
            class="myicon close"
            @click.stop="remove_pane(pane.key)"
          />
        </div>
      </template>
    </a-tab-pane>
    <!-- TODO:迁移V3版本注意此处更名 -->
    <template #tabBarExtraContent>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          操作
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu @click="menu_click">
            <a-menu-item key="1"> 关闭其他 </a-menu-item>
            <a-menu-item key="2"> 刷新当前页面 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </a-tabs>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { push_route } from '@/utils'
import { IMenu } from '@/types/common'
import { IMenuClick, IPane } from '@/types/pages/Main'

const store = useStore()
const route = useRoute()

const activeKey = ref('') // 选中的Key
const panes_list = ref<IPane[]>([]) // Tab列表
const route_list = ref<IMenu[]>([]) // 路由列表

// 整理路由
const fomat_route = (list: IMenu[]) => {
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

// 添加
const add_pane = (path: string) => {
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
const remove_pane = (key: string) => {
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
const reload_components = () => {
  let item: IMenu = {
    path: '',
    icon: '',
    name: '',
    component: ''
  }
  route_list.value.forEach((ele) => {
    if (ele.path === route.path.substr(1)) return (item = ele)
  })
  if (item) {
    store.commit('Exclude/SET_exclude', item.component)
    push_route(`/redirect?to=${item.path}&component=${item.component}`)
  }
}
// 切换
const change_components = (key?: string) => {
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
const menu_click = (data: IMenuClick) => {
  console.log(data)
  switch (data.key) {
    case '1':
      close_other()
      break
    case '2':
      reload_components()
      break
  }
}
// 监控菜单变化
watch(
  () => store.state.Menu.menu,
  (val) => {
    fomat_route(val)
    add_pane(route.path.substr(1))
  },
  { immediate: true, deep: true }
)
// 监控路由变化
watch(
  () => route.path,
  (val) => {
    add_pane(val.substr(1))
  }
)
</script>
<style lang="less" scoped>
.myicon {
  :deep(svg) {
    width: 12px !important;
    height: 12px !important;
  }
  transition: all 0.3s;
  margin-left: 8px;
  margin-right: 0px !important;
  color: #939393;
}
.myicon:hover {
  font-size: 16px;
  font-weight: bold;
  color: #1890ff;
  transform: rotate(360deg);
}
.close {
  margin-left: 8px;
}
.close:hover {
  transform: rotate(180deg);
}
</style>
