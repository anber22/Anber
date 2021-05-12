import { getToken, setToken, removeToken } from '@/utils/auth'
import User from '@/api/user'
// import store from '@/store'
// import router from '@/router'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    REMOVE_TOKEN: (state, token) => {
      state.token = ''
      removeToken()
    }
  },

  actions: {
    async Login({ commit }, param) {
      // const token = ''
      const res = await User.postUserLogin(param)
      if (res.code === 200) {
        // commit('SET_TOKEN', res.data.token)
        // setToken(res.data.token)
        if (Reflect.has(param, 'data')) {
          setToken(res.data.token, param.data)
        } else {
          setToken(res.data.token)
        }
        return res
      } else {
        return res
      }
    },
    async LoginByCode({ commit }, param) {
      // const roles = ''
      const res = await User.getUserLoginByCode(param)
      if (res.code === 200) {
        // commit('SET_TOKEN', res.data.token)
        // setToken(res.data.token)

        if (Reflect.has(param, 'data')) {
          setToken(res.data.token, param.data)
        } else {
          setToken(res.data.token)
        }
        return res
      } else {
        return res
      }
    },

    GetInfo({ commit, state }) {
      const roles = ''
      commit('SET_ROLES', roles)
    },
    RemoveToken({commit, state}) {
      commit('REMOVE_TOKEN')
    }
  }
}

export default user
