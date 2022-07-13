<template>
  <a-dropdown :trigger="['hover']" class="change_theme" placement="topCenter">
    <a-avatar class="avatar" :src="themeImg" :size="50" />
    <template #overlay>
      <a-menu @click="handleClick" v-model:selectedKeys="current">
        <a-menu-item key="theme-default">默认主题</a-menu-item>
        <a-menu-item key="theme-dark">暗色主题</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { IMenuClick } from '@/types/pages/Main'
import themeImg from '@/assets/img/theme.png'
const current = ref(['theme-default'])

const handleClick = (data: IMenuClick) => {
  current.value = [data.key]
  window.$emitter.emit('change_theme', data.key)
}
</script>
<style lang="less" scoped>
.change_theme {
  position: fixed;
  bottom: 100px;
  right: 40px;
}
.avatar {
  padding: 10px;
  background-color: #fff !important;
}
</style>
