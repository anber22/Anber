import request from '@/utils/request'

class PlaceResource {
  //  获取网点列表
  async placeResourceList(param) {
    return await request({
      url: `/apis/place/page/${param.page}/size/${param.size}${param.condition}`,
      method: 'get'
    })
  }
  //  获取网点详情
  async placeResourceDetail(param) {
    return await request({
      url: `/apis/place/id/${param}`,
      method: 'get'
    })
  }
  //  获取网点关联设备
  async placeResourceEquip(param) {
    return await request({
      url: `/apis/place/id/${param}/equip/list`,
      method: 'get'
    })
  }
  //  获取网点新增
  async placeResourceInfo(param) {
    return await request({
      url: `/apis/place/${param}`,
      method: 'post'
    })
  }
  // 获取网点修改
  async updateplaceResource(id, param) {
    return await request({
      url: `/apis/place/id/${id}`,
      method: 'put',
      data: param
    })
  }
  // 获取辖区树接口
  async getDepartTree() {
    return await request({
      url: `/apis/depart/tree`,
      method: 'get'
    })
  }
}
export default new PlaceResource()
