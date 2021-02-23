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
      url: `/apis/equip/system/${param}/heartbeat/analysis/timeline`,
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
}
export default new Index()

