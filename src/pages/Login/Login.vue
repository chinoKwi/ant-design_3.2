<template>
  <div>LOGIN</div>
  <a-button @click="checkToken">check token</a-button>
</template>
<script setup lang="ts">
import { checkToken } from '@/api/user'
</script>
