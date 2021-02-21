const getters = {
  permission_routers: state => state.permission.routers,
  menu_data: state => state.equip.menuData,
  active_equiptype: state => state.equip.activeEquipType,
  addRouters: state => state.permission.addRouters,
  nextPath: state => state.permission.addRouters[0],
  roles: state => state.user.roles,
  permissions: state => state.user.permissions
}

export default getters
