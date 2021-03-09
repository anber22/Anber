import request from '@/utils/request'

class Communal {
  //  隐患类型列表
  async hazardTypeList(param) {
    return await request({
      url: `/apis/heartbeat/hazard/type/list/equip/type/${param}`,
      method: 'get'
    })
  }
  //  网点类型列表
  async placeTypeList() {
    return await request({
      url: `/apis/place/type`,
      method: 'get'
    })
  }
  //  设备类型列表
  async equipTypeList(param) {
    return await request({
      url: `/apis/equip/type/${param}/type/list`,
      method: 'get'
    })
  }
}
export default new Communal()
