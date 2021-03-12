
class Data {
/**
 * 节流函数
 * 当持续触发事件时，保证在一定时间内只调用一次事件处理函数，意思就是说，假设一个用户一直触发这个函数，且每次触发
 * 小于既定值，函数节流会每隔这个时间调用一次
 * 用一句话总结防抖和节流的区别：防抖是将多次执行变为最后一次执行，节流是将多次执行变为每隔一段时间执行
 * 实现函数节流我们主要有两种方法：时间戳和定时器
 *
 * @param func 执行函数
 * @param wait 间隔时间
 * @param options 立即执行
 * options中  leading：false 表示禁用第一次执行 trailing: false 表示禁用停止触发的回调
 */
  throttle(fn, wait, options = {}) {
    let timer
    let previous = 0
    const throttled = function() {
      const now = +new Date()
      // remaining 不触发下一次函数的剩余时间
      if (!previous && options.leading === false) previous = now
      const remaining = wait - (now - previous)
      if (remaining < 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        previous = now
        fn.apply(this, arguments)
      } else if (!timer && options.trailing !== false) {
        timer = setTimeout(() => {
          previous = options.leading === false ? 0 : new Date().getTime()
          timer = null
          fn.apply(this, arguments)
        }, remaining)
      }
    }
    return throttled
  }

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
  dateDifference = function(input, pattern = '') { // 在参数列表中 通过 pattern="" 来指定形参默认值，防止报错
    const nowStamp = (Date.parse(new Date())) / 1000

    // 总时差 单位/秒
    var date3 = (nowStamp - (input / 1000))
    // 计算相差分钟数
    var minutes = Math.floor(date3 / (60))

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
export default new Data()
