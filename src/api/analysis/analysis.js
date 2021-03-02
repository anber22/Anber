import request from '@/utils/request'

class Analysis {
  //  获取隐患列表
  async analysisList(param) {
    return await request({
      url: `/apis/heartbeat/equip/type/${param.type}/list/finder/page/${param.page}/size/${param.size}${param.condition}`,
      method: 'get'
    })
  }
  //  获取隐患列表
  async equiptypeList(param) {
    return await request({
      url: `/apis/equip/system/0/type/list`,
      method: 'get'
    })
  }
}
export default new Analysis()
