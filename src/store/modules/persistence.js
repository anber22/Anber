import Api from '@/api/communal.js'
const typeList = [
  // 隐患类型列表
  'hazardType',
  // 网点类型列表
  'placeType',
  // 设备类型列表
  'equipType',
  // 物联网平台列表
  'platformList'
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
    equipType: [],
    // 物联网平台列表
    platformList: []
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
    },
    SET_PLATFORM_LIST: (state, data) => { // 设备类型列表
      state.platformList = data
    }
  },
  actions: {
    /**
     * 根据变量名发送请求获取对应的数据
     * @param {*} param0
     * @param {*} param
     */
    async  getDataByHttp({ commit }, param) {
      // 生成相应的请求方法集合，生成的requests只要调用相应属性的方法即可
      const requests = genRequest(commit)
      requests[param]()
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

const genRequest = (commit) => {
  // 柯里化生成相应函数
  const requestByType =  (typeRequest, commitType, param) => {
    return async () => {
      const reqParam = param === undefined ? undefined : param
      const result = await typeRequest(reqParam)
      if (result.code === 200) {
        commit(commitType, result.data)
      }
    }
  }

  return {
    hazardType: requestByType(Api.hazardTypeList, 'SET_HAZARD_TYPE', 0),
    placeType: requestByType(Api.placeTypeList, 'SET_PLACE_TYPE'),
    equipType: requestByType(Api.equipTypeList, 'SET_EQUIP_TYPE', 0),
    platformList: requestByType(Api.platformList, 'SET_PLATFORM_LIST')
  }
}

export default persistence
