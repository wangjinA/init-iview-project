/*
 * @Author: 汪锦
 * @Date: 2020-07-13 10:02:33
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-07-13 10:04:14
 * @Description: 事件总线
 */

import Vue from 'vue'
Vue.prototype.$bus = new Vue()
const busMixins = { // bus注册，使用$bus_$on, 在组件销毁之前，会自动销毁注册事件
  data() {
    return {
      private_busNames: []
    }
  },
  methods: {
    $bus_$on(busName, fun) {
      this.private_busNames.push(busName)
      this.$bus.$on(busName, fun)
    }
  },
  beforeDestroy() {
    this.private_busNames.forEach(busName => {
      this.$bus.$off(busName)
    })
  }
}

Vue.mixin(busMixins)