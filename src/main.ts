import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import 'virtual:windi.css'

// mitt
import mitt from 'mitt'

// Antd
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 全局通用css
// import '@/assets/css/common.css'

window.$message = message

// Mitt
const emitter = mitt()
window.$emitter = emitter

const app = createApp(App).use(router).use(store).use(Antd)
// 获取原型
const prototype = app.config.globalProperties
// 绑定参数
prototype.name = 'Jerry'

if (process.env.NODE_ENV === 'development') {
  window.$isDev = true
} else {
  window.$isDev = false
}

app.mount('#app')
