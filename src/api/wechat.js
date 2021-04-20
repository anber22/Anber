import request from '@/utils/request'

class Wechat {
  //  登录
  async getWechatToken() {
    return await request({
      url: `http://zfiot.ctjt.cn/api/wechat/getTicket`,
      method: 'get',
      headers: { 'token': 'c3d9b495-a97b-4e0f-ab6f-e5d81b03abf0' }
    })
  }
}
export default new Wechat()
