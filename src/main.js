/*
 * @Author: 汪锦
 * @Date: 2020-07-13 09:19:58
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-10-22 15:31:55
 * @Description: 项目入口函数
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api' // api请求
import './iview' // iview组件注册
import './style/index.less' // less相关
import './mixins' // 全局mixins
import './components/global' // 全局组件注册
import './libs'

// echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
window.$echarts = echarts

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
