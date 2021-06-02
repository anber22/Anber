import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param Arrya roles
 * @param String route
 */
function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    // 用户拥有的权限, 其中一个被包含在路由所需要的权限即通过
    // return roles.some(role => route.meta.roles.includes(role))
    // 用户拥有的权限必须要大于等于路由所需要的权限才可通过
    return route.meta.permissions.every(role => permissions.includes(role))
  } else {
    return true
  }
}

/**
 * TODO: 过滤子路由是否拥有具体路由
 * @param Array routes
 * @param Array roles
 */
function filterAsyncRouter(routes, permissions) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, permissions)
      }
      res.push(tmp)
    }
  })
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    menus: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routers.concat(constantRouterMap)
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },
  actions: {
    // 初始化路由列表
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { permissions } = data
        let accessedRouters, menus
        // 是否拥有 管理员角色
        if (permissions.includes('SuperAdmin')) {
          // 授予全部权限
          accessedRouters = asyncRouterMap
        } else {
          // 赋予过滤后符合的权限
          accessedRouters = filterAsyncRouter(asyncRouterMap, permissions)
          menus = filterAsyncRouter(accessedRouters, ['Index', 'NetworkApplication', 'SmartView', 'NetworkPointResource', 'AnalysisCounting'])
        }
        // 注册最后的权限列表
        commit('SET_ROUTERS', accessedRouters)
        commit('SET_MENUS', menus)

        resolve()
      })
    }
  }
}

export default permission
