<template>
  <!-- LayOut -->
  <div class="my_app">
    <!-- 头部 -->
    <header>12312</header>
    <!-- 下部分 -->
    <div class="content">
      <!-- 左侧导航栏 -->
      <div class="left_menu">
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
      </div>
      <!-- 右侧内容区域 -->
      <div class="right_content">
        <!-- Tab栏部分 -->
        <div class="tab"><MyTab /></div>
        <!-- 面包屑导航部分 -->
        <div class="navigation">navigation</div>
        <!-- 内容部分 -->
        <div class="content">
          <router-view v-slot="{ Component }">
            <keep-alive :exclude="store.state.Exclude.exclude">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'
import { push_route } from '@/utils'
import { IMenu } from '@/types/common'
import { IMenuClick } from '@/types/pages/Main'
import MyTab from '@/pages/Main/components/Tab.vue'
const store = useStore()
// const route = useRoute()

const menu_list = ref<IMenu[]>([]) // 菜单列表

const openKeys = ref([]) // 展开的菜单
const selectedKeys = ref([]) // 当前选中的菜单项
const collapsed = ref(false) // 是否收起

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
<style lang="less" scoped>
.my_app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  header {
    width: 100%;
    height: 65px;
    background-color: #001529;
  }
  .content {
    display: flex;
    .left_menu {
      min-height: calc(100vh - 65px);
      background-color: #001529;
    }
    .right_content {
      padding: 10px;
      flex: 1;
    }
  }
}
</style>
