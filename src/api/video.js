
import request from '@/utils/request'

class Video {
  //  设备类型关联的场所列表
  async videoPlaceList(param) {
    return await request({
      url: `/apis/equip/type/${param}2/place/list`,
      method: 'get'
    })
  }
  //  场所关联的设备列表
  async videoPlaceEquipList(param) {
    return await request({
      url: `/apis/place/id/${param.id}5/equip/type/${param.type}5/list`,
      method: 'get'
    })
  }
}
export default new Video()
