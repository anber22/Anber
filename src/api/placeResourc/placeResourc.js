import request from '@/utils/request'

class PlaceResourc {
  //  获取网点列表
  async placeResourcList(param) {
    return await request({
      url: `/apis/place/page/${param.page}/size/${param.size}${param.condition}`,
      method: 'get'
    })
  }
  //  获取网点详情
  async placeResourcDetail(param) {
    return await request({
      url: `/apis/place/id/${param}`,
      method: 'get'
    })
  }
  //  获取网点关联设备
  async placeResourcEquip(param) {
    return await request({
      url: `/apis/place/id/${param}2/equip/list`,
      method: 'get'
    })
  }
}
export default new PlaceResourc()
