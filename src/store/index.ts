import { createStore } from 'vuex'

import login from './login/login'
import { IRootState } from './types'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'cyan',
      age: 20,
      height: 176
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
