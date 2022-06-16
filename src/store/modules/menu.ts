import router from '@/router'
import { IMenu } from '@/types/common'

const list: IMenu[] = [
  {
    path: 'welcome',
    icon: 'SmileOutlined',
    name: 'welcome',
    component: 'Welcome'
  }
]

const state = () => ({
  menu: []
})

const mutations = {
  SET_menu(state: { menu: IMenu[] }, data: IMenu[]) {
    state.menu = data
  }
}

const actions = {
  FEACT_menu(
    context: { commit: (arg0: string, arg1: IMenu[]) => void },
    menu_data: IMenu[]
  ) {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      const all_menu_list: IMenu[] = list.concat(menu_data)
      context.commit('SET_menu', all_menu_list)

      menu_data.forEach((ele) => {
        if (ele.children && ele.children.length) {
          ele.children?.forEach((child_ele) => {
            router.addRoute('Main', {
              path: child_ele.path,
              component: () =>
                import(
                  `../../pages/${child_ele.component}/${child_ele.component}.vue`
                ),
              meta: {
                meta: { needLogin: true }
              }
            })
          })
        } else {
          router.addRoute('Main', {
            path: ele.path,
            component: () =>
              import(`../../pages/${ele.component}/${ele.component}.vue`),
            meta: {
              meta: { needLogin: true }
            }
          })
        }
      })
      router.addRoute({
        path: '/:pathMatch(.*)',
        name: 'NotFind',
        component: () => import('../../pages/404/404.vue')
      })
      resolve('ok')
      // }, 3000)
    })
  }
}

const getters = {
  GET_menu(state: { menu: IMenu[] }) {
    return state.menu
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
