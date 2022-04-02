import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import 'virtual:windi.css'

// 全局通用css
import '@/assets/css/common.css'
// 导入动画css
import '@/assets/css/animation.css'

// Mitt
import mitt from 'mitt'

// Antd
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// ICON
import * as Icons from '@ant-design/icons-vue'

window.$message = message

// Mitt
const emitter = mitt()
window.$emitter = emitter

const app = createApp(App).use(store).use(router).use(Antd)
// 获取原型
const prototype = app.config.globalProperties
// 绑定参数
prototype.name = 'Jerry'

// 注册图标组件
// TODO: 优化此处的导入
for (const i in Icons) {
  // @ts-ignore
  app.component(i, Icons[i])
}

if (process.env.NODE_ENV === 'development') {
  window.$isDev = true
} else {
  window.$isDev = false
}

app.mount('#app')
