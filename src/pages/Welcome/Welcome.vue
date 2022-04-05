<template>
  <a-card class="w-full">
    <h1>hello chino</h1>
    <a-button @click="checkToken">check token</a-button>
  </a-card>
</template>
<script setup lang="ts">
import { checkToken } from '@/api/user'
</script>
<script lang="ts">
export default {
  name: 'Welcome'
}
</script>
