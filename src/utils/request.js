import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import Vue from 'vue'
import EC from '@/utils/errorCode'
// import IviewMsg from '@/utils/iviewMsg'
import Config from '../../config.json'

// create an request instance
const request = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: process.env.NODE_ENV === 'development' ? Config.url : 'https://www.k8s.ctjt.cn',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

request.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

// request.defaults.headers.post['Content-Type'] = 'application/json';

request.defaults.withCredentials = true
request.defaults.timeout = 60000
// request.defaults.baseURL = process.env.VUE_APP_BASE_API
// request.baseURL = "http://47.106.116.164:8017";

// 请求拦截器
request.interceptors.request.use(
  config => {
    // if (config.method === "post") {
    //   config.data = qs.stringify(config.data);
    // }

    // 查找cookie有没有token ，有则添加token请求头
    if (getToken()) {
      config.headers.token = getToken()
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 错误状态码处理提示
class MessageTip extends Vue {
  messageTipInstance = null;
  constructor() {
    super()
    this.state = { }
  }

  static instance(code) {
    if (!this.messageTipInstance) {
      this.messageTipInstance = new MessageTip()
    }
    this.messageTipInstance.errorInfo(code)
  }

  // 错误码提示
  errorInfo(errorCode) {
    // IviewMsg.msgFun(EC.getMessage(errorCode))
  }
}

// 响应拦截器
request.interceptors.response.use(
  response => {
    if (response.data.status === 401) {
      // IviewMsg.msgFun('登录过期')
      removeToken() // 清除token
      window.location.replace('http://aiot.ctjt.cn/#/login') // 重定向路由地址
    }

    if (response.data.status === 500) {
      // IviewMsg.msgFun(response.data.msg)
    }
    return response.data
  },

  error => {
    MessageTip.instance(error.response.status)
    return Promise.reject(error)
  }
)
export default request
