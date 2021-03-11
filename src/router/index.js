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

export default new VueRouter({
  mode: 'history',
  base: '/mobile',
  routes: [
    {
      path: '/',
      component: Tabbar,
      meta: {
      },
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: () => import('@/views/index/index'),
          meta: {
          }
        },
        {
          path: '/home',
          component: () => import('@/views/home/home'),
          meta: {
          }
        }, {
          path: '/personalCenter',
          component: () => import('@/views/personalCenter/personalCenter'),
          meta: {
          }
        }
      ]
    },
    {
      path: '/aiot',
      component: Navbar,
      meta: {
      },
      redirect: '/iotApp',
      children: [
        {

          path: '/iotApp',
          component: () => import('@/views/aiot/iotApp'),
          meta: {
            title: '物联应用'
          }
        },
        {

          path: '/iotAppDetail',
          component: () => import('@/views/aiot/iotAppDetail'),
          meta: {
            title: '设备详情'
          }
        },
        {
          path: '/placeResourse',
          component: () => import('@/views/placeResourse/placeResourse'),
          meta: {
            title: '网点管理'
          }
        },
        {
          path: '/hazard',
          component: () => import('@/views/hazard/hazard'),
          meta: {
            title: '隐患管理'
          }
        },
        {
          path: '/video',
          component: () => import('@/views/video/video'),
          meta: {
            title: '智慧视觉'
          }
        },
        {
          path: '/videoPlayer',
          component: () => import('@/views/videoPlayer/videoPlayer'),
          meta: {
            title: '视频播放'
          }
        },
        {
          name: 'PlaceResourcDetail',
          path: '/placeResourcDetail',
          component: () => import('@/views/placeResourcDetail/placeResourcDetail'),
          meta: {
            title: '网点详情'
          }
        },
        { path: '/hazardDetail',
          name: 'HazardDetail',
          component: () => import('@/views/hazardDetail/hazardDetail'),
          meta: {
            showFooter: true,
            title: '隐患详情'
          }
        }]
    },
    {
      path: '/login',
      component: () => import('@/views/login/login'),
      meta: {}
    }
  ]

})
