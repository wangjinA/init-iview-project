import Vue from 'vue'
import echartMixin from './echartMixins'
import globalMixins from './globalMixins'

window.echartMixin = echartMixin

Vue.mixin(globalMixins)
