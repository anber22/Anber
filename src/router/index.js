/*
* 路由对象模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'

/* 引入pages*/
const Index = () => import('../../src/views/Index')
// const Profile = () => import('../pages/Profile/profile')
// const Patient = () => import('../pages/Patient/Patient')

// 申明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Index,
      meta: {
        showFooter: true
      }
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
