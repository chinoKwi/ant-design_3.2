// 配置 axios
import axios, { AxiosRequestConfig, Method } from 'axios'
import http_config from '../utils/config'

// 导入进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from '@/router'
NProgress.configure({ showSpinner: false })

/**
 * 请求失败后的错误统一处理
 * @param { Number } status 请求失败的状态码
 * @param { String } msg 消息
 */
const errorHandle = (status: number, msg: string) => {
  // 状态码判断
  switch (status) {
    case 401: // 登录失效
      window.$message.error(msg)
      window.localStorage.removeItem('token') // 移除token
      router.replace({ path: '/login' })
      return
    default:
      window.$message.error(msg)
  }
}

// 定义接口
interface PendingType {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: any
}

const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken

const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      list.cancel('请勿频繁操作')
      pending.splice(item, 1)
    }
  }
}

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin-Type': '*'
  },
  timeout: 1000 * 30,
  baseURL: http_config.Base_url,
  withCredentials: false
})

instance.interceptors.request.use(
  (config) => {
    removePending(config)
    config.cancelToken = new CancelToken((c) => {
      pending.push({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
        cancel: c
      })
    })
    if (config.headers) {
      config.headers.authorization = window.localStorage.getItem('token') || ''
    }
    NProgress.start()
    return config
  },
  (error) => {
    NProgress.done()
    console.log('请求出错了', error)
    window.$message.error('请求出错了!')
    return {}
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (config) => {
    removePending(config.config)
    const resultData = config.data // 返回的数据
    // 请求成功
    if (resultData.meta.status !== 200) {
      NProgress.done()
      errorHandle(resultData.meta.status, resultData.meta.msg)
    } else {
      NProgress.done()
    }
    return resultData
  },
  (error) => {
    console.log('响应出错', error)
    // 请求失败
    NProgress.done()
    const { response } = error
    if (response) {
      removePending(response.config)
      errorHandle(response.status, `${response.status} ${response.statusText}`)
      return {
        meta: { stata: response.status, msg: response.statusText },
        data: {}
      }
    } else {
      if (error.message) {
        return window.$message.error(error.message)
      }
      // 处理断网的情况
      window.$message.error('网络错误')
    }
  }
)

export default instance
