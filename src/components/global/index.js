/*
 * @Author: 汪锦
 * @Date: 2020-07-31 16:33:42
 * @LastEditors: 杨汝岱
 * @LastEditTime: 2020-10-20 14:12:37
 * @Description: 批量导出组件注册
 */
import Vue from 'vue'

let components = {} // 当前文件夹下的组件

const requireComponent = require.context('./', false, /\.vue$/)
console.log(requireComponent.keys())
requireComponent.keys().forEach(fileName => {
  const config = requireComponent(fileName)
  let componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '') // ./page.vue => page
  components[componentName] = config.default || config
  Vue.component(componentName, config.default || config) // 注册
})

export default components
