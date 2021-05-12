/*
* 路由对象模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'

/* 引入pages*/
const Tabbar = () => import('../../src/views/tabbar/tabbar')
// const Profile = () => import('../pages/Profile/profile')
// const Patient = () => import('../pages/Patient/Patient')
const Navbar = () => import('../../src/views/navbar/navbar')

// 申明使用插件
Vue.use(VueRouter)
import config from '../../config.json'

// TODO: 默认加载路由, 无需权限1
export const constantRouterMap = [

  {
    path: '/login',
    component: resolve => require(['@/views/login/login'], resolve),
    hidden: true
  }
]
// TODO: 动态路由, 需要判断权限 (或者不配置)
export const asyncRouterMap = [
  {
    path: '/',
    component: Tabbar,
    name: 'Tabbar',
    meta: { permissions: [] },
    redirect: '/index',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/home'),
        meta: { title: '首页', permissions: [], active: '@/assets/images/public/home-active.png', inactive: '@/assets/images/public/home.png' }
      },
      {
        path: '/index',
        name: 'HomepageScreen',
        component: () => import('@/views/index/index'),
        meta: { title: '智慧高投', permissions: [], active: '@/assets/images/public/index-active.png', inactive: '@/assets/images/public/index.png' }
      }, {
        path: '/personalCenter',
        name: 'PersonInfo',
        component: () => import('@/views/personalCenter/personalCenter'),
        meta: { title: '我的', permissions: [], active: '@/assets/images/public/personalCenter-active.png', inactive: '@/assets/images/public/personalCenter.png' }
      }
    ]
  },
  {
    path: '/aiot',
    component: Navbar,
    name: 'Navbar',
    meta: { permissions: [] },
    redirect: '/iotApp',
    children: [
      {
        path: '/iotApp',
        name: 'IotApp',
        component: () => import('@/views/aiot/iotApp'),
        meta: { title: '物联应用', permissions: [], edit: false }
      },
      {
        path: '/iotAppDetail',
        name: 'IotAppDetail',
        component: () => import('@/views/aiot/iotAppDetail'),
        meta: { title: '设备详情', permissions: [], edit: true }
      },
      {
        path: '/placeResource',
        name: 'PlaceResource',
        component: () => import('@/views/placeResource/placeResource'),
        meta: { title: '网点管理', permissions: [], edit: false }
      },
      {
        path: '/hazard',
        name: 'Statistics',
        component: () => import('@/views/hazard/hazard'),
        meta: { title: '隐患管理', permissions: [], edit: false }
      },
      {
        path: '/video',
        name: 'WisdomVisual',
        component: () => import('@/views/video/video'),
        meta: { title: '智慧视觉', permissions: [], edit: false }
      },
      {
        path: '/videoPlayer',
        name: 'VideoPlayer',
        component: () => import('@/views/videoPlayer/videoPlayer'),
        meta: { title: '视频播放', permissions: [], edit: false }
      },
      {
        name: 'PlaceResourceDetail',
        path: '/placeResourceDetail',
        component: () => import('@/views/placeResourceDetail/placeResourceDetail'),
        meta: { title: '网点详情', permissions: [], edit: true }
      },
      { path: '/hazardDetail',
        name: 'HazardDetail',
        component: () => import('@/views/hazardDetail/hazardDetail'),
        meta: { showFooter: true, title: '隐患详情', permissions: [], edit: true }
      },
      {
        path: '/propertyPlate',
        name: 'PropertyPlate',
        component: () => import('@/views/plate/plate'),
        meta: { showFooter: true, title: '物业看板', permissions: [], edit: false }
      },
      {
        path: '/safetyCommitteePlate',
        name: 'SafetyCommitteePlate',
        component: () => import('@/views/plate/plate'),
        meta: { showFooter: true, title: '安委看板', permissions: [], edit: false }
      },
      {
        path: '/editEquip',
        name: 'EditEquip',
        component: () => import('@/views/aiot/editEquip'),
        meta: { showFooter: true, title: '编辑设备', permissions: [], edit: false }
      },
      {
        path: '/unreadEvents',
        name: 'UnreadEvents',
        component: () => import('@/views/unreadEvents/unreadEvents'),
        meta: { showFooter: true, title: '未读事件列表', permissions: [] }
      },
      {
        path: '/bindDevice',
        name: 'BindDevice',
        component: () => import('@/views/bindDevice/bindDevice'),
        meta: { showFooter: true, title: '绑定设备', permissions: [] }
      },
      {
        path: '/placeResourceEditorial',
        name: 'PlaceResourceEditorial',
        component: () => import('@/views/placeResourceEditorial/placeResourceEditorial'),
        meta: { showFooter: true, title: '编辑网点', permissions: [] }
      },
      {
        path: '/hazardEditorial',
        name: 'HazardEditorial',
        component: () => import('@/views/hazardEditorial/hazardEditorial'),
        meta: { showFooter: true, title: '编辑隐患', permissions: [] }
      },
      {
        path: '/placeResourceAddition',
        name: 'PlaceResourceAddition',
        component: () => import('@/views/placeResourceAddition/placeResourceAddition'),
        meta: { showFooter: true, title: '新增网点', permissions: [] }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    meta: {}
  }

]
// TODO: 使用 config.json影响动态路由的内容
// 读取 config.json中动态路由的名字
const routesName = new Set(Reflect.ownKeys(config.router.routes))
// 读取 config.json中动态路由中对应的权限对象
const routes = config.router.routes

// TODO: 检索路由是否在 config.json列表中
const isInList = (route) => {
  // 加载 config.json中拥有的路由

  // 404页面默认添加 (特殊页面)
  if (route.name === '404') {
    return true
  }

  // 判断是否在 config.json当中 
  if (routesName.has(route.name))
  {
    route.meta.permissions = Reflect.get(routes, route.name).permissions
    return true
  } else {
    return false
  }
}

// TODO: 疯狂遍历所有路由
const child = (routes) => {
  // 循环路由数组
  routes.forEach((route, index) => {
    if (isInList(route)) {
      if (Reflect.has(route, 'children')) {
        child(route.children)
      }
      return
    } else {
      // 对不存在 config.json的路由进行删除
      routes.splice(index, 1)
    }
  })
}

// 根据 config.json修改权限
child(asyncRouterMap)
console.log(asyncRouterMap)

export default new VueRouter({
  mode: 'history', // 后端支持可开
  base: '/mobile',
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

