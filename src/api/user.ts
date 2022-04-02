import axios from './index'
import { IpwdLogin } from '@/types/api/user'
import { Iresponse } from '@/types/common'

// 密码登录
export function pwdLogin(params: IpwdLogin): Promise<Iresponse> {
  return axios.post('user/login', { ...params })
}

// 检测Token是否有效
export function checkToken(): Promise<Iresponse> {
  return axios.post('user/check_token')
}
