import axios from 'axios'

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 60000,
  withCredentials: false
})

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
instance.interceptors.response.use((res) => {
  // 对响应数据做些事
  return Promise.resolve(res)
}, (error) => {
  console.log('网络异常')
  console.log(error)
  return Promise.reject(error)
})

export default instance
