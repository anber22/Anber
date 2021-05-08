/* eslint-disable no-unused-vars */
import { number } from 'echarts'

export default class Regular {
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
