// 菜单点击返回值
export interface IMenuClick {
  domEvent: MouseEvent
  key: string
  keyPath: string[]
}

export interface IPane {
  title: string
  content?: string
  key: string
  closable?: boolean
}
