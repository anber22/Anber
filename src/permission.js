import Vue from 'vue'
import router from '@/router'
import { getToken, setUserInfo, getUserInfo } from '@/utils/auth'
import UserApi from '@/api/user'
import store from '@/store'
import Socket from '@/utils/socket'

// NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login']// no redirect whitelist

// TODO: 过滤请求路径
router.beforeEach((to, from, next) => {
  // 检查是否存在 token
  if (getToken()) {
    if (Vue.prototype.$socket === undefined) {
      Vue.prototype.$socket = new Socket()
    }
    if (!getUserInfo()) {
      UserApi.personInfo().then(res => {
        if (res.code === 200) {
          // 缓存userInfo
          setUserInfo({ ...res.data })
        }
      })
    }
    // 跳过登陆
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      // 此处获取userInfo个人信息,检查权限信息是否存在
      if (store.getters.permissions.length === 0) {
        // 加载权限 (这里应该是请求后端接口, 进行加载权限列表) 下面手动 set到对应的值内了
        let permissions = []
        UserApi.permissionList().then(res => {
          if (res.code === 200) {
            permissions = res.data
            // ['NetworkApplication', '0', '1', '2', '4']
            store.commit('SET_PERMISSIONS', permissions)
            // 初始化权限对应的路由到动态路由当中
            store.dispatch('GenerateRoutes', { permissions }).then(() => {
              store.getters.addRouters.forEach(item => {
                router.addRoute(item)
              })
              next({ ...to, replace: true })
            })
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
      return next('/login')
    }
  }
})

router.afterEach(() => {
  // NProgress.done()
})
