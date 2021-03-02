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
  routes: [
    {
      path: '/',
      component: Tabbar,
      meta: {
      },
      redirect: '/iotAppDetail',
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
      children: [{

        path: '/iotApp',
        component: () => import('@/views/aiot/iotApp'),
        meta: {
          title: '智慧物联'
        }
      }, {

        path: '/iotAppDetail',
        component: () => import('@/views/aiot/iotAppDetail'),
        meta: {
          title: '设备详情'
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
        path: '/placeResourcDetail',
        component: () => import('@/views/placeResourcDetail/placeResourcDetail'),
        meta: {
          title: '网点详情'
        }
      }]
    },
    {
      path: '/login',
      component: () => import('@/views/login/login'),
      meta: {
      }
    }

    // {
    //   path: '/profile',
    //   component: Profile,
    //   meta: {
    //     showFooter: true
    //   }
    // },
    // {
    //   path: '/patient',
    //   component: Patient,
    //   meta: {
    //     showFooter: false
    //   }
    // },
    // {
    //   path: '/',
    //   redirect: '/msite' // 系统默认页
    // }
  ]
})
