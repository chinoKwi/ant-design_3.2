<template>
  <keep-alive>
    <a-config-provider :locale="zhCN">
      <RouterView />
    </a-config-provider>
  </keep-alive>
</template>

<script setup lang="ts"></script>
