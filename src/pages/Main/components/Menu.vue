<template>
  <a-menu
    @click="menu_click"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="inline"
    :inlineIndent="24"
    :inline-collapsed="collapsed"
    :style="collapsed ? '' : 'width: 190px'"
  >
    <template v-for="item in menu_list">
      <!-- 一级菜单 -->
      <template v-if="!item.children">
        <a-menu-item :key="item.path">
          <template #icon>
            <PieChartOutlined />
          </template>
          {{ item.name }}
        </a-menu-item>
      </template>
      <!-- 二级菜单 -->
      <template v-else>
        <a-sub-menu :key="item.path">
          <template #icon>
            <PieChartOutlined />
          </template>
          <template #title>{{ item.name }}</template>
          <a-menu-item v-for="child in item.children" :key="child.path">
            <!-- <template #icon>
                    <PieChartOutlined />
                  </template> -->
            {{ item.name }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </template>
  </a-menu>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { push_route } from '@/utils'
import { IMenu } from '@/types/common'
import { IMenuClick } from '@/types/pages/Main'

const store = useStore()

const openKeys = ref([]) // 展开的菜单
const selectedKeys = ref([]) // 当前选中的菜单项
const collapsed = ref(false) // 是否收起
const menu_list = ref<IMenu[]>([]) // 菜单列表

// 菜单点击
const menu_click = (data: IMenuClick) => {
  push_route(data.key)
}

// 监控菜单
watch(
  () => store.state.Menu.menu,
  (val) => {
    menu_list.value = val
  },
  { immediate: true, deep: true }
)
</script>
