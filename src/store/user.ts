import { defineStore } from 'pinia'

export const useSiteStore = defineStore('user', {
  state: () => {
    return {
      name: 'KafuuChino'
    }
  },
  getters: {
    getName: (state) => state.name
  },
  actions: {
    UPDATE_DATA() {
      this.name = this.name + String(+new Date())
    }
  }
})
