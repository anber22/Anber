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
        meta: { title: '首页', permissions: [] }
      },
      {
        path: '/index',
        name: 'HomepageScreen',
        component: () => import('@/views/index/index'),
        meta: { title: '智慧高投', permissions: [] }
      }, {
        path: '/personalCenter',
        name: 'PersonInfo',
        component: () => import('@/views/personalCenter/personalCenter'),
        meta: { title: '我的', permissions: [] }
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
        name: 'iotApp',
        component: () => import('@/views/aiot/iotApp'),
        meta: { title: '物联应用', permissions: [] }
      },
      {
        path: '/iotAppDetail',
        name: 'iotAppDetail',
        component: () => import('@/views/aiot/iotAppDetail'),
        meta: { title: '设备详情', permissions: [] }
      },
      {
        path: '/placeResourse',
        name: 'placeResource',
        component: () => import('@/views/placeResourse/placeResourse'),
        meta: { title: '网点管理', permissions: [] }
      },
      {
        path: '/hazard',
        name: 'statistics',
        component: () => import('@/views/hazard/hazard'),
        meta: { title: '隐患管理' , permissions: [] }
      },
      {
        path: '/video',
        name: 'WisdomVisual',
        component: () => import('@/views/video/video'),
        meta: { title: '智慧视觉', permissions: [] }
      },
      {
        path: '/videoPlayer',
        name: 'videoPlayer',
        component: () => import('@/views/videoPlayer/videoPlayer'),
        meta: { title: '视频播放', permissions: [] }
      },
      {
        name: 'PlaceResourcDetail',
        path: '/placeResourcDetail',
        component: () => import('@/views/placeResourcDetail/placeResourcDetail'),
        meta: { title: '网点详情', permissions: [] }
      },
      { path: '/hazardDetail',
        name: 'HazardDetail',
        component: () => import('@/views/hazardDetail/hazardDetail'),
        meta: { showFooter: true, title: '隐患详情', permissions: [] }
      },
      {
        path: '/propertyPlate',
        name: 'PropertyPlate',
        component: () => import('@/views/plate/plate'),
        meta: { showFooter: true, title: '物业看板', permissions: [] }
      },
      { 
        path: '/safetyCommitteePlate',
        name: 'SafetyCommitteePlate',
        component: () => import('@/views/plate/plate'),
        meta: { showFooter: true, title: '安委看板', permissions: [] }
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
const routesName = Reflect.ownKeys(config.router.routes)
// 读取 config.json中动态路由中对应的权限对象
const routes = config.router.routes

// TODO: 检索路由是否在 config.json列表中
const isInList = (route) => {
  // 加载 config.json中拥有的路由

  // 404页面默认添加 (特殊页面)
  if (route.name === '404') {
    return true
  }

  // 判断是否在 config.json当中 any
  if (routesName.some((routeName, index) => {
    if (routeName === route.name) {
      // 同步处理已经遍历的名字, 减轻当存在大量配置路由的情况性能骤减的情况
      routesName.splice(index, 1)
      return true
    }
  })) {
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

