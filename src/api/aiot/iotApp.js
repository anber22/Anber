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
  //  获取物联应用列表
  async equipInfoList(param) {
    return await request({
      url: `/apis/equip/type/${param.systemType}/place/page/${param.page}/size/${param.size}${param.conditionStr}`,
      method: 'get'
    })
  }

  //  获取物联应用实时数据列表
  async equipRealTimeInfoList(param) {
    return await request({
      url: `/apis/equip/environment/list/finder`,
      method: 'post',
      data: {
        ids: param
      }
    })
  }
}
export default new IotApp()
