import {getToken} from "@/utils/auth";
import {setToken, removeToken} from "@/utils/auth";
import {ActionTree, MutationTree} from 'vuex'

interface UserState {
  token: string,
  roles: string[]
}

const state = {
  token: getToken(),
  roles: []
}

const mutations:MutationTree<any> = {
  SET_TOKEN: (state, token:string) => {
    state.token = token
  },
  SET_ROLES: (state, roles:string[]) => {
    state.roles = roles
  }
}

const actions:ActionTree<any, any> = {
  login({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '11111-11111')
      setToken('11111-11111')
      // @ts-ignore
      resolve()
    })
  },
  getInfo({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      commit('SET_ROLES', ['admin'])
      // @ts-ignore
      resolve({roles: ['admin']})
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      // @ts-ignore
      resolve()
    })
  },
}

export default  {
  namespaced: true,
  state,
  mutations,
  actions
}
