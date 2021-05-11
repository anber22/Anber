import request from '@/utils/request'

class personalCenter {
  async personInfo () {
    return await request({
      url: `/apis/user/info`,
      method: 'get'
    })
  }
}

export default new personalCenter();