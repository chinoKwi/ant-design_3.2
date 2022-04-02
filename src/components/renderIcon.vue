<template>
  <!-- 渲染ICON -->
  <!-- 1. 先下载图标库 （ant design的图标库要单独install） -->
  <!-- npm i --save @ant-design/icons-vue -->
  <!-- 2. 下载完成后在 main.js 中添加 -->
  <!-- import * as Icons from '@ant-design/icons-vue' -->
  <!-- // 注册图标组件
  for (const i in Icons) {
    app.component(i, Icons[i])
  } -->
  <component :is="icon" />
</template>
<script setup lang="ts">
interface IProps {
  name: string
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<IProps>(), {
  name: ''
})

const icon = props.name // 在ant design vue 的 icon 里拷贝就可以
</script>
