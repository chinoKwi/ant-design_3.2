import { createStore } from 'vuex'
import Menu from './modules/menu'
import Exclude from './modules/exclude'
const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Menu,
    Exclude
  }
})

export default store
