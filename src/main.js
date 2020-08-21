/*
 * @Author: 汪锦
 * @Date: 2020-07-13 09:19:58
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-07-13 10:06:59
 * @Description: 项目入口函数
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './iview'
import './eventBus'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
