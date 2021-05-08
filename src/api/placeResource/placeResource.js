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
      url: `/apis/place/id/${param}/equip/list`,
      method: 'get'
    })
  }
  //  获取网点新增
  async placeResourcInfo(param) {
    return await request({
      url: `/apis/place/${param}`,
      method: 'post'
    })
  }
  // 获取网点修改
  async updateplaceResourc(id, param) {
    return await request({
      url: `/apis/place/id/${id}`,
      method: 'put',
      data: param
    })
  }
  // 获取辖区树接口
  async getPlaceTree() {
    return await request({
      url: `/apis/depart/tree`,
      method: 'get'
    })
  }
}
export default new PlaceResourc()
