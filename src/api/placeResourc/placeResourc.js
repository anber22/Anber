import request from '@/utils/request'

class PlaceResourc {
  //  获取网点列表
  async placeResourcList(param) {
    return await request({
      url: `/apis/place/page/${param.page}/size/${param.size}${param.condition}`,
      method: 'get'
    })
  }
}
export default new PlaceResourc()
