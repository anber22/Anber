import Vue from 'vue'
import App from './views/App'
import { setToken } from './utils/auth'
import router from './router' // 引入路由
import VueRouter from 'vue-router'
import Vant from 'vant'
import 'vant/lib/index.css'
import * as echarts from 'echarts'
import request from './utils/request'

// 这里模拟拥有登陆后的状态, 触发权限过滤
setToken('4776dd6b-ff18-4428-8488-4022e48389d0')

Vue.use(Vant)
Vue.use(VueRouter)
Vue.config.debug = true
Vue.prototype.$echarts = echarts
Vue.prototype.$request = request

console.log()

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})
