/* eslint-disable no-unused-vars */
import store from '@/store'
class ReadTypeNameOnVuex {
  /**
  * 让传入集合（infoList）进入此方法走一圈出去之后带上对应类型（typeName）的类型名称，
  * 在此之前您需要告诉我您希望用传入集合的哪个属性（propertyName）和vuex的类型数组对象的做匹配，获得对应的属性名
  * 在传入集合处理完后您希望对应类型名称的属性名为（newPropertyName）
  *
  * 示例：
  *  promiseToList.conversion(vuex对应类型的集合名字,传入集合用来匹配的属性名 ,传入集合处理完毕之后类型名称的属性名, 传入集合)
  *
  * @param {*} typeName 需要vuex的哪种类型
  * @param {*} propertyName 传入集合需要遍历匹配的属性名
  * @param {*} newPropertyName 给传入集合新定义的属性名
  * @param {*} info 传入集合
  * @returns
  */
  async conversion(typeName, propertyName, newPropertyName, info) {
    const typeList = await store.getters[typeName]
    let temp = []
    if (!Array.isArray(info)) {
      temp = typeList.filter(item => item.id === info[propertyName])
      if (temp.length !== 0) {
        info[newPropertyName] = temp[0].name
      }
    } else {
      info.forEach(item => {
        temp = typeList.filter(typeItem => typeItem.id === item[propertyName])
        if (temp.length !== 0) {
          item[newPropertyName] = temp[0].name
        }
      })
    }
    return info
  }
}
export default new ReadTypeNameOnVuex()
