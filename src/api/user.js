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
}
export default new User()
