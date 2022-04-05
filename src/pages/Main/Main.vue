<template>
  <!-- LayOut -->
  <div class="my_app">
    <!-- 头部 -->
    <header><Heade /></header>
    <!-- 下部分 -->
    <div class="content">
      <!-- 左侧导航栏 -->
      <div class="left_menu">
        <Menu />
      </div>
      <!-- 右侧内容区域 -->
      <div class="right_content">
        <!-- Tab栏部分 -->
        <div class="tab">
          <MyTab :watch_menu="watch_menu" :watch_path="watch_path" />
        </div>
        <!-- 面包屑导航部分 -->
        <div class="pl-10px pr-10px pb-10px">
          <Navigation :watch_menu="watch_menu" :watch_path="watch_path" />
        </div>
        <!-- 内容部分 -->
        <div class="content pl-10px pr-10px">
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
import { useRoute } from 'vue-router'
import { IMenu } from '@/types/common'
import Menu from './components/Menu.vue'
import MyTab from '@/pages/Main/components/Tab.vue'
import Heade from './components/Heade.vue'
import Navigation from './components/Navigation.vue'

const store = useStore()
const route = useRoute()

const watch_menu = ref<IMenu[]>([])
const watch_path = ref<string>('')

// 监控菜单
watch(
  () => store.state.Menu.menu,
  (val) => {
    watch_menu.value = val
  },
  { immediate: true, deep: true }
)
// 监控路由
watch(
  () => route.path,
  (val) => {
    watch_path.value = val
  }
)
</script>
<style lang="less" scoped>
.my_app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  header {
    position: relative;
    width: 100%;
    height: 65px;
    background-color: #001529;
    box-shadow: 0 3px 4px rgb(0 0 0 / 30%);
  }
  .content {
    display: flex;
    .left_menu {
      min-height: calc(100vh - 65px);
      background-color: #001529;
    }
    .right_content {
      flex: 1;
      background-color: #f0f2f5;
      .tab {
        background-color: #ffffff;
        padding: 10px 10px 0px 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
