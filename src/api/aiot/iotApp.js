import request from '@/utils/request'

class IotApp {
  //  在线统计
  async ststusCounting(param) {
    return await request({
      url: `/apis/equip/system/${param.system}/ststus/counting?type=${param.type}`,
      method: 'get'
    })
  }
  //  监测统计
  async monitorCounting(param) {
    return await request({
      url: `/apis/equip/system/${param.type}/heartbeat/analysis/latest`,
      method: 'get'
    })
  }
  //  近15日统计
  async fifteenCounting(param) {
    return await request({
      url: `/apis/equip/system/${param.system}/heartbeat/latest/counting?days=${param.days}`,
      method: 'get'
    })
  }
}
export default new IotApp()
