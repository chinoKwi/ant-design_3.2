import router from '@/router'
const state = () => ({
  menu: []
})

const mutations = {
  SET_menu(state: any, data: any) {
    state.menu = data
    data.forEach((ele: any) => {
      ele.children?.forEach((child_ele: any) => {
        router.addRoute('Main', {
          path: child_ele.path,
          component: () =>
            import(
              `../../pages/${child_ele.component}/${child_ele.component}.vue`
            )
        })
      })
    })
  }
}

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
