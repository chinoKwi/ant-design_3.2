<template>
  <a-breadcrumb class="mb10 breadcrumb">
    <a-breadcrumb-item>RABBITAPI</a-breadcrumb-item>
    <a-breadcrumb-item v-if="breadcrumb_sub1">
      {{ breadcrumb_sub1 }}
    </a-breadcrumb-item>
    <a-breadcrumb-item class="animated fadeInRightBig" v-if="breadcrumb_sub2">{{
      breadcrumb_sub2
    }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IMenu } from '@/types/common'

const route = useRoute()
const store = useStore()

const breadcrumb_sub1 = ref('')
const breadcrumb_sub2 = ref('')

const breadcrumb_change = () => {
  const route_path = route.path.substr(1)
  store.state.Menu.menu.forEach((ele: IMenu) => {
    const now_father = ele // 当前父元素
    if (ele.path === route_path) {
      clear_breadcrumb(now_father)
      // 一级菜单匹配
      setTimeout(() => {
        breadcrumb_sub1.value = now_father.name
        breadcrumb_sub2.value = ''
      }, 0)
    } else {
      if (ele.children && ele.children.length > 0) {
        ele.children.forEach((childele) => {
          if (childele.path === route_path) {
            clear_breadcrumb(now_father)
            // 子路由匹配搭到
            setTimeout(() => {
              breadcrumb_sub1.value = now_father.name
              breadcrumb_sub2.value = childele.name
            }, 0)
          }
        })
      }
    }
  })
}

const clear_breadcrumb = (now_father: IMenu) => {
  if (breadcrumb_sub1.value !== now_father.name) {
    breadcrumb_sub1.value = ''
  }
  breadcrumb_sub2.value = ''
}

watch(
  () => store.state.Menu.menu,
  () => {
    breadcrumb_change()
  },
  { immediate: true, deep: true }
)

watch(
  () => route.path,
  () => {
    breadcrumb_change()
  },
  { immediate: true, deep: true }
)
</script>
