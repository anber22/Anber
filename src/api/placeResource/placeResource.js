import request from '@/utils/request'

class PlaceResource {
  //  获取网点列表
  async placeResourceList(param) {
    return await request({
      url: `/apis/place/page/${param.page}/size/${param.size}${param.condition}`,
      method: 'get'
    })
  }//  获取网点设备总数
  async placeResourceCount(param) {
    return await request({
      url: `/apis/equip/countings${param}`,
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
  //  新增网点
  async placeResourceInfo(param) {
    return await request({
      url: `/apis/place`,
      method: 'post',
      data: param
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
  // 根据IMEI查找设备
  async equipImei(param) {
    return await request({
      url: `/apis/equip/type/imei/${param}`,
      method: 'get'
    })
  }
  // 关联设备
  async bindEquip(id, imei, param) {
    return await request({
      url: `/apis/place/id/${id}/equip/imei/${imei}`,
      method: 'post',
      data: param
    })
  }
  // 获取自己得的区列表
  async departList() {
    return await request({
      url: `/apis/depart/list`,
      method: 'get'
    })
  }
  // 解绑设备
  async deleteEquip(id, imei) {
    return await request({
      url: `/apis/place/id/${id}/equip/imei/${imei}`,
      method: 'delete'
    })
  }
  // 上传文件
  async uploadFile(param) {
    return await request({
      url: `/apis/file`,
      method: 'post',
      data: param
    })
  }
  // 删除文件
  async deleteFile(param) {
    return await request({
      url: `/apis/file${param}`,
      method: 'delete'
    })
  }
  // 关联图片
  async connectFile(param) {
    return await request({
      url: `/apis/file/connect`,
      method: 'post',
      data: param
    })
  }
}
export default new PlaceResource()
