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
    <div
      @click="collapsed = !collapsed"
      class="cursor-pointer w-full h-40px text-center leading-40px font-bold text-light-50"
    >
      <span class="tracking-in-expand-fwd-css" v-show="!collapsed"
        >RABBITAPI</span
      >
      <span class="focus-in-contract-css" v-show="collapsed">RABBIT</span>
    </div>
    <template v-for="item in menu_list">
      <!-- 一级菜单 -->
      <template v-if="!item.children">
        <a-menu-item :key="item.path">
          <template #icon> <renderIcon :name="item.icon" /> </template>
          {{ item.name }}
        </a-menu-item>
      </template>
      <!-- 二级菜单 -->
      <template v-else>
        <a-sub-menu :key="item.path">
          <template #icon>
            <renderIcon :name="item.icon" />
          </template>
          <template #title>{{ item.name }}</template>
          <a-menu-item v-for="child in item.children" :key="child.path">
            <!-- <template #icon>
                    <PieChartOutlined />
                  </template> -->
            {{ child.name }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </template>
    <div
      :style="collapsed ? 'width:80px' : 'width: 190px'"
      class="menu_off_area"
      @click="collapsed = !collapsed"
    >
      <renderIcon
        :name="collapsed ? 'MenuFoldOutlined' : 'MenuUnfoldOutlined'"
      />
    </div>
  </a-menu>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import renderIcon from '@/components/renderIcon.vue'
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
<style lang="less" scoped>
.menu_off_area {
  cursor: pointer;
  position: fixed;
  bottom: 0px;
  height: 50px;
  background-color: #002952;
  padding: 0px 32px;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
}
.menu_off_area:hover {
  background-color: #004081;
}
</style>
