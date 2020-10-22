import Vue from 'vue'
import { echartMixin, globalEchartMixin } from './echartMixins'
import globalMixins from './globalMixins'

window.echartMixin = echartMixin

Vue.mixin(globalEchartMixin)
Vue.mixin(globalMixins)
