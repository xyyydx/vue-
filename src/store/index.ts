import { createStore, createLogger } from 'vuex'

export default createStore({
  state: {
    use_info: {
      isLogin: false,
      token: localStorage.getItem('token') || '',
      user: ''
    }
  },
  getters: {
  },
  mutations: {
    SET_USER_TOKEN(state, userData) {
      state.use_info = Object.assign({}, state.use_info, userData)
      localStorage.setItem('token', state.use_info.token)
      console.log(state.use_info)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createLogger()]
})
