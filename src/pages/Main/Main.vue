<template>
  <!-- LayOut -->
  <div class="my_app">
    <!-- 头部 -->
    <header>12312</header>
    <!-- 下部分 -->
    <div class="content">
      <!-- 左侧导航栏 -->
      <div class="left_menu"><Menu /></div>
      <!-- 右侧内容区域 -->
      <div class="right_content">
        <!-- Tab栏部分 -->
        <div class="tab"><MyTab /></div>
        <!-- 面包屑导航部分 -->
        <div class="pl-10px pr-10px pb-10px">navigation</div>
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
import { useStore } from 'vuex'
import Menu from './components/Menu.vue'
import MyTab from '@/pages/Main/components/Tab.vue'
const store = useStore()
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
