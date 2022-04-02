const state = () => ({
  exclude: ['Redirect']
})

const mutations = {
  SET_exclude(state: any, data: any) {
    // //console.log("SET_exclude");
    state.exclude.push(data)
  },
  INIT_exclude(state: any) {
    state.exclude = ['Redirect']
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
