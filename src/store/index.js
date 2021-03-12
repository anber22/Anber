import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import equip from './modules/equip'
import permission from './modules/permission'
import persistence from './modules/persistence'

import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    equip,
    user,
    permission,
    persistence
  },
  getters
})

export default store
