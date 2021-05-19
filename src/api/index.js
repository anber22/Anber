import request from '@/utils/request'
class Index {
//  应用列表
  async applicationlist(param) {
    return await request({
      url: `/apis/equip/status/counting/list`
    })
  }

  //  智慧视觉统计折线图（30天事件数，故障数）
  async analysisTimeline(param) {
    return await request({
      url: `/apis/equip/type/${param}/heartbeat/analysis/timeline`,
      method: 'get'
    })
  }
  //  设备总数/在线数/离线数
  async equipCountings(param) {
    return await request({
      url: `/apis/equip/countings${param}`,
      method: 'get'
    })
  }
  //  网点总数
  async branchesCountings(param) {
    return await request({
      url: `/apis/place/countings`,
      method: 'get'
    })
  }
  // 设备在线率（仪表盘，码表）
  async onlinePercent() {
    return await request({
      url: '/apis/equip/online/percent',
      method: 'get'
    })
  }
  // 首页左上角辖区统计
  async departCounting() {
    return await request({
      url: `/apis/depart/equip/status/counting`,
      method: 'get'
    })
  }
  // 辖区统计-辖区列表
  async departCountingList() {
    return await request({
      url: `/apis/depart/list/size/10`,
      method: 'get'
    })
  }
  // 辖区统计-设备状态
  async departEquipCounting(param) {
    return await request({
      url: `/apis/depart/id/${param}/equip/status/counting`,
      method: 'get'
    })
  }
  // 辖区统计联动，当前选中辖区的隐患分析（近15天）
  async troubleAnalysis(param) {
    return await request({
      url: `/apis/equip/heartbeat/trouble/latest/counting?departId=${param}`,
      method: 'get'
    })
  }
  // 监测分析（全部）
  async monitorAnalysis(param) {
    return await request({
      url: `/apis/heartbeat/hazard/by/equip/type/${param}/analysis/latest`,
      method: 'get'
    })
  }
  // 监测分析（1月）
  async monitorAnalysisMonth(param) {
    return await request({
      url: `/apis/heartbeat/hazard/by/equip/type/${param}/analysis/latest/month/1`,
      method: 'get'
    })
  }
  // 监测分析（1年）
  async monitorAnalysisYear(param) {
    return await request({
      url: `/apis/heartbeat/hazard/by/equip/type/${param}/analysis/latest/year/1`,
      method: 'get'
    })
  }
  // 获取隐患未读未处理按时间排序前十列表
  async hiddenDangerList(param) {
    return await request({
      url: `/apis/heartbeat/event/undone/unread/lastest/list/size/${param}`,
      method: 'get'
    })
  }
}
export default new Index()

