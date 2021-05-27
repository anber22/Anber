import Vue from 'vue'
import config from '../../config.json'
import store from '../store'

Vue.directive('permission', {
  inserted: (el, binding, vnode) => {
    // TODO: 截取自定义组件 component的 name
    let componentName = ''
    if (vnode.tag.indexOf('-') !== -1) {
      const cmpArray = vnode.tag.split('-')
      componentName = cmpArray[cmpArray.length - 1]
    } else {
      componentName = vnode.tag
    }
    // TODO: 满足部分需要父子组件一同管理的组件 (非固化父子关系的组件, 不推荐使用)
    if (binding.arg === 'parent') {
      componentName = `${binding.value}-${componentName}`
    }

    // TODO: 获取配置文件中的组件库
    const components = config.router.components

    // TODO: 检查组件是否在组件库中
    if (Reflect.has(components, componentName)) {
      // 获取所需要的权限 (角色)
      const { permissions } = Reflect.get(components, componentName)
      // 获取当前用户拥有的权限 (角色)
      const _permissions = store.getters.permissions

      // TODO: 组件权限全匹配
      // console.log(`组件权限全匹配结果: ` + permissions.every(permission => [..._permissions].includes(permission)))
      // TODO: 组件权限部分匹配
      // console.log(`组件权限部分匹配结果: ` + permissions.some(permission => [..._permissions].includes(permission)))

      // 当前版本取全匹配权限
      const res = permissions.every(permission => [..._permissions].includes(permission))

      // 检查有没有存在超权限 (角色)的情况
      const isSuperAdmin = _permissions.some(role => role === 'SuperAdmin')

      // 如果是超权限 (角色), 则不进行过滤处理~
      if (!isSuperAdmin) {
        if (!res) {
          el.parentNode.removeChild(el)
        }
      }
    } else {
      // el.parentNode.removeChild(el)
      console.warn('当前启用权限过滤的组件, 不在组件库中, 请检查是否配置错误! ')
    }
  }
})
