
import request from '@/utils/request'

class Video {
  //  设备类型关联的场所列表
  async videoPlaceList(param) {
    return await request({
      url: `/apis/equip/type/${param}/place/list`,
      method: 'get'
    })
  }
  //  场所关联的设备列表
  async videoPlaceEquipList(param) {
    return await request({
      url: `/apis/place/id/${param.id}/equip/type/${param.type}/list`,
      method: 'get'
    })
  }
}
export default new Video()
