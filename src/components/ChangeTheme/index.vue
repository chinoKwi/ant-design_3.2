<template>
  <a-dropdown :trigger="['click']" class="change_theme" placement="topCenter">
    <a-avatar src="https://joeschmoe.io/api/v1/random" />
    <template #overlay>
      <a-menu @click="handleClick">
        <a-menu-item key="theme-default">默认主题</a-menu-item>
        <a-menu-item key="theme-dark">暗色主题</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts">
import { IMenuClick } from '@/types/pages/Main'
const handleClick = (data: IMenuClick) => {
  window.$emitter.emit('change_theme', data.key)
}
</script>
<style lang="less" scoped>
.change_theme {
  position: fixed;
  bottom: 100px;
  right: 40px;
}
</style>
