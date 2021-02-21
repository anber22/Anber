import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import equip from './modules/equip'
import permission from './modules/permission'

import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    equip,
    user,
    permission
  },
  getters
})

export default store
