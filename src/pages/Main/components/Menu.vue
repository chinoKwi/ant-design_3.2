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
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {
  openKeys,
  selectedKeys,
  collapsed,
  menu_list,
  select_menu,
  menu_click
} from '../hooks/useMenu'

const store = useStore()
const route = useRoute()

// 监控菜单
watch(
  () => store.state.Menu.menu,
  (val) => {
    menu_list.value = val
    select_menu()
  },
  { immediate: true, deep: true }
)

// 监控路由
watch(
  () => route.path,
  () => {
    select_menu()
  }
)
</script>
