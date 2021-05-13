import request from '@/utils/request'

class PersonalCenter {
  async personInfo() {
    return await request({
      url: `/apis/user/info`,
      method: 'get'
    })
  }
}

export default new PersonalCenter()
