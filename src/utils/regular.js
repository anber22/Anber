export default class Regular {
  /**
   * 手机号检验
   * @param {*} value
   * @returns
   */
  phone(value) {
    const phone = /^1[0-9]{10}$/

    if (phone.test(value)) {
      return true
    } else {
      return false
    }
  }
}
