import request from '@/utils/request'

class IotApp {
  //  在线统计
  async statusCounting(param) {
    return await request({
      url: `/apis/equip/system/${param.system}/status/counting?type=${param.type}`,
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

  //  获取物联应用实时数据列表(设备环境监测/塔机监测实时数据(批量) )
  async equipRealTimeInfoList(param, system) {
    return await request({
      url: `/apis/equip/${system}/list/finder`,
      method: 'post',
      data: param
    })
  }
  //  获取物联应用实时数据列表(设备塔吊实时数据-批量 )
  // async equipRealTimeTowerInfoList(param) {
  //   return await request({
  //     url: `/apis/equip/tower/list/finder`,
  //     method: 'post',
  //     data: param
  //   })
  // }

  //  获取物联应用未处理事件数
  async equipUntreatedEventList(param) {
    return await request({
      url: `/apis/equip/event/undone/counting/finder`,
      method: 'post',
      data: param
    })
  }
}
export default new IotApp()
