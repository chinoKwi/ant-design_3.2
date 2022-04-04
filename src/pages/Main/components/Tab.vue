<template>
  <a-tabs
    v-model:activeKey="activeKey"
    :tabBarGutter="10"
    hide-add
    size="large"
    type="editable-card"
  >
    <a-tab-pane v-for="pane in panes_list" :tab="pane.title" :key="pane.key">
    </a-tab-pane>
    <template #rightExtra>
      <a-button>Right Extra Action</a-button>
    </template>
  </a-tabs>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { IMenu } from '@/types/common'
const store = useStore()

interface IPane {
  title: string
  content: string
  key: string
  closable?: boolean
}

const activeKey = ref('') // 选中的Key
const panes_list = ref<IPane[]>([
  {
    title: 'sadadaaa',
    content: '123',
    key: '123'
  }
]) // Tab列表
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

// const add_pane = () => {}
// const remove_pane = (key: string) => {}
// const reload_components = () => {}
// const change_components = (key: string) => {}
// const close_other = () => {}
// 监控路由变化
watch(
  () => store.state.Menu.menu,
  (val) => {
    fomat_route(val)
  },
  { immediate: true, deep: true }
)
</script>
