import store from '../store'
const getters = {
  permission_routers: state => state.permission.routers,
  menu_data: state => state.equip.menuData,
  active_equiptype: state => state.equip.activeEquipType,
  addRouters: state => state.permission.addRouters,
  nextPath: state => state.permission.addRouters[0],
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  hazardType: state => get(state, 'hazardType'),
  placeType: state => get(state, 'placeType'),
  equipType: state => get(state, 'equipType')
}
/**
 * 判断对应的值是否为空，如果有直接返回。如果没有就去获取
 * @param {*} state
 * @param {*} param
 * @returns
 */
async function get(state, param) {
  if (state.persistence[param].length > 0) {
    return state.persistence[param]
  } else {
    // 调用persistence的action的GeneratePersistence方法
    await store.dispatch('getDataByHttp', param)
    return state.persistence[param]
  }
}
export default getters
