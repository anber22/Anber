class Regular {
  determineNull(everything) {
    console.log('传入类型', typeof everything)
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
