import request from '@/utils/request'

class Analysis {
  //  预警统计
  async hazardCount(param) {
    return await request({
      url: `/apis/heartbeat/hazard/countings${param}`,
      method: 'get'
    })
  }
  //  未处理隐患信息列表
  async undoneHazardList(param) {
    return await request({
      url: `/apis/heartbeat/hazard/undone/lastest/list/size/${param.size}${param.conditions}`,
      method: 'get'
    })
  }
  //  事件处理统计（全部）
  async heartBeatStatisticalAll(param) {
    return await request({
      url: `/apis/heartbeat/event/deal/analysis/latest${param}`,
      method: 'get'
    })
  }
  //  事件处理统计（近n月）
  async heartBeatStatisticalLastMonth(param) {
    return await request({
      url: `/apis/heartbeat/event/deal/analysis/latest/month/${param.month}${param.conditions}`,
      method: 'get'
    })
  }
  //  事件处理统计（近n年）
  async heartBeatStatisticalLastYear(param) {
    return await request({
      url: `/apis/heartbeat/event/deal/analysis/latest/year/${param.year}${param.conditions}`,
      method: 'get'
    })
  }
  // 网点设备在线统计
  async equipOnPlaceOnlineStatistical(param) {
    return await request({
      url: `/apis/equip/online/counting/by/network/type/${param}`,
      method: 'get'
    })
  }
  // 预警趋势
  async hazardTrend(param) {
    return await request({
      url: `/apis/heartbeat/hazard/timeline/counting${param.conditions}`,
      method: 'get'
    })
  }
}
export default new Analysis()
