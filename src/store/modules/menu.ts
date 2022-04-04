import router from '@/router'
import { IMenu } from '@/types/common'

const list: IMenu[] = [
  {
    path: 'welcome',
    icon: 'user-outlined',
    name: 'welcome',
    component: 'Welcome'
  }
]

const state = () => ({
  menu: []
})

const mutations = {
  SET_menu(state: { menu: IMenu[] }, data: IMenu[]) {
    console.log('SET MENU', data)

    state.menu = data
  }
}

const actions = {
  FEACT_menu(
    context: { commit: (arg0: string, arg1: IMenu[]) => void },
    menu_data: IMenu[]
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const all_menu_list: IMenu[] = list.concat(menu_data)
        context.commit('SET_menu', all_menu_list)

        menu_data.forEach((ele) => {
          ele.children?.forEach((child_ele) => {
            console.log('添加路由', child_ele)

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
        })
        router.addRoute({
          path: '/:pathMatch(.*)',
          name: 'NotFind',
          component: () => import('../../pages/404/404.vue')
        })
        console.log('路由添加完毕')
        resolve('ok')
      }, 3000)
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}