class Regular {
  // 手机号检验
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
