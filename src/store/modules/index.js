import Api from '@/api/index'
const index = {
  state: {
    applicationEquipList: []
  },

  mutations: {
    SET_APPLICATION_EQUIP_LIST: (state, data) => {
      state.applicationEquipList = data
    }
  },

  actions: {
    async GetApplicationlist({ commit, state }) {
      if (state.applicationEquipList.length < 1) {
        const res = await Api.applicationlist()
        if (res.code === 200) {
          const applicationEquipList = [...res.data]
          commit('SET_APPLICATION_EQUIP_LIST', applicationEquipList)
          return applicationEquipList
        }
      } else {
        return state.applicationEquipList
      }
    }
  }
}

export default index
