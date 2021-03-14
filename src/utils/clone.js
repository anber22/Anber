class Clone {
  deepClone(obj) {
    if (obj === null) return null
    if (typeof obj !== 'object') return obj
    if (obj.constructor === Date) return new Date(obj)
    const newObj = new obj.constructor() // 保持继承链
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj.key)) { // 不遍历其原型链上的属性Object.prototype.hasOwnProperty.call(foo, "bar")。
        const val = obj[key]
        newObj[key] = typeof val === 'object' ? arguments.callee(val) : val

        // newObj[key] = typeof val === 'object' ? arguments.callee(val) : val// 使用arguments.callee解除与函数名的耦合
        // aeguments.c
      }
    }
    return newObj
  }
  dc(obj) {
    const res = Object.assign({}, obj)
    return res
  }
}
