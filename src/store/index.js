import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import video from './modules/video'
import permission from './modules/permission'
import persistence from './modules/persistence'
import index from './modules/index'

import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    video,
    user,
    permission,
    persistence,
    index
  },
  getters
})

export default store
