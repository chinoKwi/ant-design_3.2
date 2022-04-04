const state = () => ({
  exclude: ['Redirect', 'Welcome']
})

const mutations = {
  SET_exclude(state: any, data: any) {
    state.exclude.push(data)
  },
  INIT_exclude(state: any) {
    state.exclude = ['Redirect', 'Welcome']
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
