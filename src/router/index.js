/*
* 路由对象模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'

/* 引入pages*/
const Tabbar = () => import('../../src/views/tabbar/tabbar')
// const Profile = () => import('../pages/Profile/profile')
// const Patient = () => import('../pages/Patient/Patient')

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
        showFooter: true
      },
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: () => import('../../src/views/index/index'),
          meta: {
            showFooter: true
          }
        },
        {
          path: '/home',
          component: () => import('../../src/views/home/home'),
          meta: {
            showFooter: true
          }
        }, {
          path: '/personalCenter',
          component: () => import('../../src/views/personalCenter/personalCenter'),
          meta: {
            showFooter: true
          }
        }
      ]
    },
    {
      path: '/iotApp',
      component: () => import('../../src/views/aiot/iotApp'),
      meta: {
        showFooter: true
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
