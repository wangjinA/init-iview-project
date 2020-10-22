/*
 * @Author: 汪锦
 * @Date: 2020-10-13 10:09:11
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-10-22 15:30:07
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  test: false,
}

const mutations = {}
const notUpper = [''] // 不需要转换大写的key
Object.keys(state).forEach(key => {
  // 直接获取state的keys，首字母转换成大写，前面拼接set，最终设置成mutations的key，
  let mutationKey = key
  if (!notUpper.some(item => item == key)) mutationKey = key.charAt(0).toUpperCase() + key.slice(1)
  mutations[`set${mutationKey}`] = function (state, value) {
    state[key] = value
  }
})

export default new Vuex.Store({
  state,
  mutations: {
    ...mutations
    // 倘若不是单单设置value，可在这后面重写上面的方法，set开头，驼峰命名。 setUserName...
  }
})

import { mapState, mapMutations } from 'vuex'
const storeMixin = {
  // mixin注入全局vue
  computed: {
    ...mapState(Object.keys(state))
  },
  methods: {
    ...mapMutations(Object.keys(mutations))
  }
}

Vue.mixin(storeMixin)
