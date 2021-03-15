/* eslint-disable no-unused-vars */

export class DateTransformation {
  appendZero(obj) {
    if (obj < 10) {
      return '0' + obj
    } else {
      return obj
    }
  }
  dataFormat(input, pattern = '') { // 在参数列表中 通过 pattern="" 来指定形参默认值，防止报错
    const dt = new Date(input)
    // 获取年月日

    const y = dt.getFullYear()
    //
    // .padStart(2, '0')
    const m = this.appendZero((dt.getMonth() + 1).toString())
    const d = this.appendZero(dt.getDate().toString())

    // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
    // 否则，就返回  年-月-日 时：分：秒
    if (pattern.toLowerCase() === 'yyyy-mm-dd') {
      return `${y}-${m}-${d}`
    } else {
    // 获取时分秒
      const hh = this.appendZero(dt.getHours().toString())
      const mm = this.appendZero(dt.getMinutes().toString())
      const ss = this.appendZero(dt.getSeconds().toString())
      if (pattern.toLowerCase() === 'hh-mm-ss') {
        return `${hh}:${mm}:${ss}`
      } else {
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      }
    }
  }
  /**
   * 时间戳转时间
   * @param {*} input
   * @param {*} pattern
   */
  dataFormatStamp(input, pattern = '') { // 在参数列表中 通过 pattern="" 来指定形参默认值，防止报错
    const dt = new Date(input * 1000)
    // 获取年月日

    const y = dt.getFullYear()
    //
    // .padStart(2, '0')
    const m = this.appendZero((dt.getMonth() + 1).toString())
    const d = this.appendZero(dt.getDate().toString())

    // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
    // 否则，就返回  年-月-日 时：分：秒
    if (pattern.toLowerCase() === 'yyyy-mm-dd') {
      return `${y}-${m}-${d}`
    } else {
      // 获取时分秒
      const hh = this.appendZero(dt.getHours().toString())
      const mm = this.appendZero(dt.getMinutes().toString())
      const ss = this.appendZero(dt.getSeconds().toString())
      if (pattern.toLowerCase() === 'hh-mm-ss') {
        return `${hh}:${mm}:${ss}`
      } else {
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      }
    }
  }
  // 没有时分秒
  dataFormatNo(input, pattern = '') { // 在参数列表中 通过 pattern="" 来指定形参默认值，防止报错
    let dt = new Date()
    if (input) {
      dt = new Date(input)
    }
    // 获取年月日
    const y = dt.getFullYear()
    const m = this.appendZero((dt.getMonth() + 1).toString())
    const d = this.appendZero(dt.getDate().toString())
    // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
    // 否则，就返回  年-月-日 时：分：秒
    return `${y}` + `-` + `${m}` + `-` + `${d}`
  }
  /**
   * 传入时间和当前时间（本地）相减获取时间差（分）如果大于十分钟返回时分，小于十分钟就返回分钟数
   * @param {*} input
   * @param {*} pattern
   */
  dateDifference(input, pattern = '') { // 在参数列表中 通过 pattern="" 来指定形参默认值，防止报错
    const nowStamp = (Date.parse(new Date())) / 1000

    // 总时差 单位/秒
    const date3 = (nowStamp - (input / 1000))
    // 计算相差分钟数
    const minutes = Math.floor(date3 / (60))

    if (minutes >= 10) {
      const dt = new Date(input)
      const hh = this.appendZero(dt.getHours().toString())
      const mm = this.appendZero(dt.getMinutes().toString())
      return `${hh} : ${mm}`
    } else if (minutes === 0) {
      return `< 1 min`
    } else {
      return `${minutes} min`
    }
  }
}
export default DateTransformation
