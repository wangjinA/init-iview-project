/*
 * @Author: 汪锦
 * @Date: 2020-07-13 09:35:50
 * @LastEditors: 迢迢
 * @LastEditTime: 2021-03-10 10:52:20
 * @Description: iview配置
 */
import Vue from 'vue'

import 'view-design/dist/styles/iview.css'
import ViewUI from 'view-design'
Vue.use(ViewUI);
const { Message, Modal, Notice, } = ViewUI

Message.config({
  duration: 2.5
})
Vue.prototype.$Modal = Modal
Vue.prototype.$Notice = Notice

// 只是为了默认显示背景颜色，该死的iview不提供config配置；$Message.success(content)
export const $Message = new Proxy({}, {
  get(target, prop) {
    return (config) => {
      if (config instanceof Object) {
        Message[prop]({
          background: true,
          ...config
        })
      } else {
        Message[prop]({
          content: config,
          background: true
        })
      }
    }
  }
})

Vue.prototype.$Message = $Message

/**
 * 
 * @param {String | Object} optionOrContent 内容信息或者参数对象
 * @param {String} title 标题
 * @returns {Promise}
 */
export const $delAPI = (optionOrContent, title) => {
  return new Promise((resolve, reject) => {
    let option = {
      title: title || '温馨提示',
      cancelText: '取消',
      content: optionOrContent || '是否确认删除？',
      loading: true,
      onOk: () => (Modal.remove(), resolve()),
      onCancel: () => (reject()),
    }
    if (typeof optionOrContent === 'object') {
      option = {
        ...option,
        ...optionOrContent
      }
    }
    Modal.confirm(option)
  })
}
Vue.prototype.$delAPI = $delAPI