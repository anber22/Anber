import Vue from 'vue'
import App from './views/App'
import router from './router' // 引入路由
import VueRouter from 'vue-router'
import Vant from 'vant'
import 'vant/lib/index.css'
import * as echarts from 'echarts'
import Adaptive from 'cmp/adaptives/Adaptives'
import { Toast } from 'vant'
import Vuex from 'vuex'
import store from './store'
import './utils/extra'
// import video from 'video.js'
// import 'video.js/dist/video-js.css'
// import hls from 'videojs-contrib-hls'
import '@/permission'
// 这里模拟拥有登陆后的状态, 触发权限过滤
import { Loading } from 'vant'
Vue.use(Loading)
Vue.use(Vant)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component('Adaptive', Adaptive)
Vue.config.debug = true
Vue.prototype.$echarts = echarts
Vue.prototype.$Toast = Toast

// Vue.prototype.$video = video
// const hls = require('videojs-contrib-hls')
// Vue.use(hls)

// 开发环境
console.log(`${process.env.NODE_ENV}`, 'process')

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
