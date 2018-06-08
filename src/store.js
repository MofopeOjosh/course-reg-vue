import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    user: localStorage.getItem('role')
  },
  mutations: {
    LOGIN (state) {
      state.pending = true
    },
    LOGIN_SUCCESS (state) {
      state.isLoggedIn = true
      state.pending = false
      state.user = localStorage.getItem('role')
    },
    LOGOUT (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login ({commit}, creds) {

      commit('LOGIN')      
      // return new Promise( resolve =>
      return axios.post('http://127.0.0.1:5000/api/auth/login', {
        'id': creds.id,
        'password': creds.password
      },
      {withCredentials: true}, {
        headers:
        {'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': 'http://127.0.0.1:5000', 'Accept': 'application/json', 'Content-Type': 'application/json'}
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('role', response.data.role)
          commit('LOGIN_SUCCESS')
          return true
        }
        return false
      })
      .catch(e => {
        console.log(e)
        return false
      })
      // })
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      commit('LOGOUT')
    }
  }
})

export default store
