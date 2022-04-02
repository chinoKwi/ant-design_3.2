<template>
  <keep-alive>
    <a-config-provider>
      <RouterView />
    </a-config-provider>
  </keep-alive>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
// import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
// :locale="zhCN"
const store = useStore()
store.commit('Menu/SET_menu', [
  {
    _id: '60dd203cd5e4a02a54085fc1',
    path: 'welcome',
    icon: 'user-outlined',
    name: 'welcome'
  },
  {
    _id: '60dd203cd5e4a02a54085fc5',
    path: 'father_api',
    icon: 'user-outlined',
    name: '用户中心',
    children: [
      {
        _id: '60dd1f863648f041805b42c8',
        path: '/hello',
        icon: 'appstore-outlined',
        name: 'Hello',
        component: 'Hello'
      }
    ]
  }
])
</script>
