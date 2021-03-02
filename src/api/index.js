import request from '@/utils/request'
class Index {
//  应用列表
  async applicationlist(param) {
    return await request({
      url: `/apis/equip/status/counting/list`
    })
  }

  //  智慧视觉(环境监测、塔机检测)统计折线图
  async analysisTimeline(param) {
    return await request({
      url: `/apis/equip/system/${param}1/heartbeat/analysis/timeline`,
      method: 'get'
    })
  }
  //  设备总数
  async equipCountings(param) {
    return await request({
      url: `/apis/equip/countings`,
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
  // 首页左上角辖区统计
  async departCounting() {
    return await request({
      url: `/apis/depart/equip/status/counting`,
      method: 'get'
    })
  }
  // 隐患分析近15天
  async troubleAnalysis(param) {
    return await request({
      url: `/apis/equip/heartbeat/trouble/latest/counting?departId=${param}`,
      method: 'get'
    })
  }
  // 监测分析（全部）
  async monitorAnalysis(param) {
    return await request({
      url: `/apis/heartbeat/system/${param}/heartbeat/analysis/latest`,
      method: 'get'
    })
  }
  // 监测分析（1月）
  async monitorAnalysisMonth(param) {
    return await request({
      url: `/apis/heartbeat/system/${param}/analysis/latest/month/1`,
      method: 'get'
    })
  }
  // 监测分析（1年）
  async monitorAnalysisYear(param) {
    return await request({
      url: `/apis/heartbeat/system/${param}/analysis/latest/year/1`,
      method: 'get'
    })
  }
}
export default new Index()

