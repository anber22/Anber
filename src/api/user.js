import request from '@/utils/request'

class User {
  //  用户账号密码登录接口
  async postUserLogin(param) {
    return await request({
      url: '/apis/login',
      method: 'post',
      data: {
        loginType: 0,
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
      url: `/apis/login/phone/'${param.phone}'/code/'${param.code}'?loginType=0`,
      method: 'get'
    })
  }
}
export default new User()