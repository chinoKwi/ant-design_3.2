<template>
  <div class="flex justify-between pl-20px pr-20px items-center h-full">
    <Logo @click.prevent="push_route('/welcome')" />
    <div class="user_header">
      <a-dropdown>
        <a-avatar :size="50" src="https://joeschmoe.io/api/v1/random" />
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { push_route } from '@/utils'
import Logo from '@/components/Logo.vue'
const handleMenuClick = () => {}
</script>
