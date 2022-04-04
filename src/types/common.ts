// 响应体
export interface Iresponse {
  meta: {
    status: number
    msg: string
  }
  data: any
}

// 菜单
export interface IMenu {
  path: string // 地址
  icon: string // 图标
  name: string // 名称
  component: string // 组件名称
  children?: IMenu[]
}
