let timer = null

export default class jsStabilization {
  /**
   * 设定的函数在指定的时间之后执行，如果在指定时间内再次调用该方法则清除定时器重新设置新定时器（继续等待指定时间）
   * @param {*} fn 目标函数
   * @param {*} delay 延迟时间
   * @returns
   */
  stabilization(fn, delay) {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(fn, delay)
    }
  }
}
