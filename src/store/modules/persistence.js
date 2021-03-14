import Api from '@/api/communal.js'
const typeList = [
  // 隐患类型列表
  'hazardType',
  // 网点类型列表
  'placeType',
  // 设备类型列表
  'equipType'
]
const persistence = {
  state: {
    // 当前页面加载状态
    loadingStatus: false,
    // 隐患类型列表
    hazardType: [],
    // 网点类型列表
    placeType: [],
    // 设备类型列表
    equipType: []
  },
  mutations: {
    SET_LOADING_STATUS: (state, data) => { // 当前页面加载状态
      state.loadingStatus = data
    },
    SET_HAZARD_TYPE: (state, data) => { // 隐患类型列表
      state.hazardType = data
    },
    SET_PLACE_TYPE: (state, data) => { // 网点类型列表
      state.placeType = data
    },
    SET_EQUIP_TYPE: (state, data) => { // 设备类型列表
      state.equipType = data
    }
  },
  actions: {
    /**
     * 根据变量名发送请求获取对应的数据
     * @param {*} param0
     * @param {*} param
     */
    async  getDataByHttp({ commit }, param) {
      let result = []
      // 判断如果没有值才去请求
      if (persistence.state[param].length < 1) {
        if (param === 'hazardType') {
          result = await Api.hazardTypeList(0)
          if (result.code === 200) {
            commit('SET_HAZARD_TYPE', result.data)
          }
        } else if (param === 'placeType') {
          result = await Api.placeTypeList()
          if (result.code === 200) {
            commit('SET_PLACE_TYPE', result.data)
          }
        } else if (param === 'equipType') {
          result = await Api.equipTypeList(0)
          if (result.code === 200) {
            commit('SET_EQUIP_TYPE', result.data)
          }
        }
      }
    },
    /**
     * 查询全部需要存到vuex的数据
     * @param {*} state
     */
    async generatePersistence({ commit }) {
      // 如果页面加载完成，遍历需要请求的值去请求
      typeList.forEach(param => {
        persistence.actions.getDataByHttp({ commit }, param)
      })
    }
  }
}

export default persistence
