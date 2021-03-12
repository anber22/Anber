import request from '@/utils/request'

class Analysis {
  //  获取隐患列表
  async hazardList(param) {
    return await request({
      url: `/apis/heartbeat/equip/type/${param.type}/list/page/${param.page}/size/${param.size}${param.condition}`,
      method: 'get'
    })
  }
  //  获取设备类型列表
  async equipTypeList(param) {
    return await request({
      url: `/apis/equip/type/${param}/type/list`,
      method: 'get'
    })
  }
  //  获取隐患详情信息
  async hazardDeatilInfo(param) {
    return await request({
      url: `/apis/heartbeat/id/${param.id}`,
      method: 'get'
    })
  }
  //  获取隐患处理信息
  async hazardDealInfo(param) {
    return await request({
      url: `/apis/log/heartbeat/id/${param.id}/result`,
      method: 'get'
    })
  }
  //  隐患类型列表
  async hazardTypeList(param) {
    return await request({
      url: `/apis/heartbeat/hazard/type/list/equip/type/${param}`,
      method: 'get'
    })
  }
}
export default new Analysis()
