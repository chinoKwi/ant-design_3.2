export interface IpwdLogin {
  ischooes: boolean // 7天免登录
  password: string // 密码
  randstr: string // 腾讯云滑动验证码返回
  ticket: string // 腾讯云滑动验证码返回
  useremail: string // 邮箱
}
