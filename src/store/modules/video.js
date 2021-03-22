const state = {
  menuData: {},
  activeEquipType: ''
}
const mutations = {
  SET_MENUDATA: (state, data) => { // 设置设备类型菜单数据
    state.menuData = data
  },
  SET_ACTIVEEQUIPTYPE: (state, data) => { // 设置菜单点亮设备类型
    state.activeEquipType = data
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
