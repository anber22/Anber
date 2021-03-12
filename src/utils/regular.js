import { number } from 'echarts'

class Regular {
  /**
   * 判空 覆盖 [],{},undefined,null,'undefined' 大小写,'null' 大小写,''
   * 返回true 为空 false 不为空
   * @param {*} everything
   * @returns
   */
  determineNull(everything) {
    if (typeof everything === 'undefined') {
      return true
    }
    if (typeof everything === 'object') {
      // !everything 判断 null
      // Array.isArray(everything) ? everything.length === 0 判断为数组且长度为0  例如 []
      // Object.keys(everything).length 判断是否为空对象 例如 {}
      if (!everything ? true : (Array.isArray(everything) ? everything.length === 0 : Object.keys(everything).length === 0)) {
        return true
      }
    } else if (typeof everything === 'string') {
      // everything.length 字符串长度为 0 例如 ''
      // everything.toLowerCase() === 'null' 字符串为 ‘null’ 大小写都可以识别
      // everything.toLowerCase() === 'undefined' 字符串为 'undefined' 大小写 dock
      if (everything.length === 0 ? true : (everything.toLowerCase() === 'null' || everything.toLowerCase() === 'undefined')) {
        return true
      }
    }
    return false
  }
  /**
   * 手机号检验
   * @param {*} value
   * @returns
   */
  phone(value) {
    const phone = /^1[3456789]\d{9}$/
    if (phone.test(value)) {
      return true
    } else {
      return false
    }
  }
}
export default new Regular()
