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
        showFooter: true
      },
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: () => import('@/views/index/index'),
          meta: {
            showFooter: true
          }
        },
        {
          path: '/home',
          component: () => import('@/views/home/home'),
          meta: {
            showFooter: true
          }
        }, {
          path: '/personalCenter',
          component: () => import('@/views/personalCenter/personalCenter'),
          meta: {
            showFooter: true
          }
        }
      ]
    },
    {
      path: '/aiot',
      component: Navbar,
      meta: {
        showFooter: true
      },
      redirect: '/iotApp',
      children: [{

        path: '/iotApp',
        component: () => import('@/views/aiot/iotApp'),
        meta: {
          showFooter: true,
          title: '智慧物联'
        }
      },
      {
        path: '/video',
        component: () => import('@/views/video/video'),
        meta: {
          showFooter: true,
          title: '智慧视觉'
        }
      },
      {
        path: '/videoPlayer',
        component: () => import('@/views/videoPlayer/videoPlayer'),
        meta: {
          showFooter: true
        }
      }]
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
