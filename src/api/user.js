import request from '@/utils/request'

class User {
  //  用户账号密码登录接口
  async postUserLogin(param) {
    return await request({
      url: '/apis/login',
      method: 'post',
      data: {
        loginType: 2,
        password: param.password,
        phone: param.phone
      }
    })
  }
  //  获取验证码接口
  async getPhoneCode(param) {
    return await request({
      url: `/apis/login/code?phone=${param}`,
      method: 'get'
    })
  }
  //  用户验证码登录接口
  async getUserLoginByCode(param) {
    return await request({
      url: `/apis/login/phone/${param.phone}/code/${param.code}?loginType=2`,
      method: 'get'
    })
  }
  // 获取个人信息 （用token识别id）
  async personInfo() {
    return await request({
      url: `/apis/user/info`,
      method: 'get'
    })
  }
  // 获取用户拥有对应的权限列表 （用token识别id）
  async permissionList() {
    return await request({
      url: `/apis/permission/list`,
      method: 'get'
    })
  }
  // 设置用户的故障推送设置
  async setErrorSetting(param) {
    return await request({
      url: `/apis/user/error/setting${param.userId}`,
      method: 'put',
      data: param.conditions
    })
  }
  // 设置用户的事件推送设置
  async setEventSetting(param) {
    return await request({
      url: `/apis/user/event/setting${param.userId}`,
      method: 'put',
      data: param.conditions
    })
  }
  // 获取用户的故障推送设置
  async getErrorSetting(param) {
    return await request({
      url: `/apis/user/error/setting${param.userId}`,
      method: 'get'
    })
  }
  // 获取用户的事件推送设置
  async getEventSetting(param) {
    return await request({
      url: `/apis/user/event/setting${param.userId}`,
      method: 'get'
    })
  }
  //  获取隐患总数
  async hazardList(param) {
    return await request({
      url: `/apis/heartbeat/equip/type/${param.type}/list/page/${param.page}/size/${param.size}${param.condition}`,
      method: 'get'
    })
  }
}
export default new User()
