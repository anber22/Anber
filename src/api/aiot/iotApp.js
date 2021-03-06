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
  async environmentRealTimeInfoList(param, system) {
    return await request({
      url: `/apis/equip/${system}/list/finder`,
      method: 'post',
      data: param
    })
  }
  //  获取物联应用实时数据列表(设备环境监测/塔机监测实时数据(单个) )
  async environmentRealTimeData(param) {
    return await request({
      url: `/apis/equip/id/${param}/environment`,
      method: 'get'
    })
  }

  // 获取塔机实时数据列表(设备塔吊实时数据-单个 )
  async towerRealTimeInfo(param) {
    return await request({
      url: `/apis/equip/id/${param}/tower`,
      method: 'get'
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
  async equipUntreatedEvent(param) {
    return await request({
      url: `/apis/equip/id/${param}/event/undone/counting`,
      method: 'get'
    })
  }
  //  获取设备详情
  async equipDtailInfo(param) {
    return await request({
      url: `/apis/equip/id/${param}`,
      method: 'get'
    })
  }
  //  获取绑定日志列表
  async bindingLogList(param) {
    return await request({
      url: `/apis/log/equip/imei/${param}/binding/log/list`,
      method: 'get'
    })
  }
  //  修改设备信息
  async updateEquip(equipId, param) {
    return await request({
      url: `/apis/equip/id/${equipId}/info`,
      method: 'put',
      data: param
    })
  }
  // 根据IMEI查找设备
  async equipImei(param) {
    return await request({
      url: `/apis/equip/type/imei/${param}`,
      method: 'get'

    })
  }
  // 上传文件
  async uploadFile(param) {
    return await request({
      url: `/apis/file`,
      method: 'post',
      data: param
    })
  }
  // 删除文件
  async deleteFile(param) {
    return await request({
      url: `/apis/file${param}`,
      method: 'delete'
    })
  }
}
export default new IotApp()
