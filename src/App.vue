<template>
  <a-config-provider :locale="zhCN">
    <a-spin
      :spinning="globalLoading"
      tip="请稍后, 路由加载中..."
      size="large"
      wrapperClassName="globalLoadingCss"
    >
      <ChangeTheme v-if="config.change_theme" />
      <RouterView />
    </a-spin>
  </a-config-provider>
</template>

<script setup lang="ts">
import 'moment/dist/locale/zh-cn'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import ChangeTheme from '@/components/ChangeTheme/index.vue'
// @ts-ignore
import { toggleTheme } from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js'
import { globalLoading } from '@/utils'
import config from '@/utils/config'

window.$emitter.on('change_theme', (theme: string) => {
  if (!config.change_theme) return
  console.log('切换主题为', theme)

  toggleTheme({
    scopeName: theme
  })
})
</script>
<style lang="less">
.globalLoadingCss {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
