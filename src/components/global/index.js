/*
 * @Author: 汪锦
 * @Date: 2020-07-31 16:33:42
 * @LastEditors: 迢迢
 * @LastEditTime: 2021-03-10 10:55:14
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
