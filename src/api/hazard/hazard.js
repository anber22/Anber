import request from '@/utils/request'

class Analysis {
  //  获取隐患列表
  async analysisList(param) {
    return await request({
      url: `/apis/heartbeat/equip/type/${param.type}/list/finder/page/${param.page}/size/${param.size}${param.condition}`,
      method: 'get'
    })
  }
  //  获取隐患类型列表
  async hazardTypeList(param) {
    return await request({
      url: `/apis/equip/system/0/type/list`,
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
}
export default new Analysis()
