/*
 * @Author: 汪锦
 * @Date: 2020-07-13 09:35:50
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-10-14 18:10:38
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
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.prototype.$Notice = Notice
Vue.prototype.$Delete = (confirmCallBack, option) => {
  Modal.confirm({
    title: '删除提醒',
    cancelText: '关闭',
    content: '是否确认删除？',
    loading: true,
    onOk: () => confirmCallBack && confirmCallBack().finally(() => Modal.remove()),
    ...option
  })
}