<template>
  <!-- <keep-alive> -->
  <a-config-provider>
    <RouterView />
  </a-config-provider>
  <!-- </keep-alive> -->
  <!-- <router-view v-slot="{ Component }">
    <keep-alive :exclude="store.state.Exclude.exclude">
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
</template>

<script setup lang="ts">
// import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
// :locale="zhCN"
// import { useStore } from 'vuex'
// const store = useStore()
</script>
