import router from './router'
import { getToken } from './utils/auth'
import store from './store'

// NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login']// no redirect whitelist

// TODO: 过滤请求路径
router.beforeEach((to, from, next) => {
  // 检查是否存在 token
  if (getToken()) {
    // 跳过登陆

    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      // 此处获取userInfo个人信息,检查权限信息是否存在
      if (store.getters.permissions.length === 0) {
        // 加载权限 (这里应该是请求后端接口, 进行加载权限列表) 下面手动 set到对应的值内了
        const permissions = ['NetworkApplication', '0', '1', '2', '4']
        store.commit('SET_PERMISSIONS', permissions)
        // 初始化权限对应的路由到动态路由当中
        store.dispatch('GenerateRoutes', { permissions }).then(() => {
          router.addRoutes(store.getters.addRouters)
          if (to.path === '/') {
            next({ path: '/home' })
          } else {
            next(to.path)
          }
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  // NProgress.done()
})
