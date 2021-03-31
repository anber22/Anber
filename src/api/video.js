
import request from '@/utils/request'

class Video {
  //  设备类型关联的场所列表
  async videoPlaceList(param) {
    return await request({
      url: `/apis/equip/type/${param.type}/place/list` + `${param.condition}`,
      method: 'get'
    })
  }
  //  场所关联的设备列表
  async videoPlaceEquipList(param) {
    return await request({
      url: `/apis/place/id/${param.id}/equip/type/${param.type}/list` + `${param.condition}`,
      method: 'get'
    })
  }
}
export default new Video()
