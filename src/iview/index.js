/*
 * @Author: 汪锦
 * @Date: 2020-07-13 09:35:50
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-07-13 10:05:30
 * @Description: iview配置
 */
import Vue from 'vue'
import 'view-design/dist/styles/iview.css'
import {
  Button,
  Icon,
  Input,
  Select,
  Option,
  Table,
  Page,
  Row,
  Col as iCol,
  FormItem,
  DatePicker,
  Form,
  Checkbox,
  InputNumber,
  Radio,
  RadioGroup,
  Message,
  Modal,
  Switch,
  Upload,
  Tooltip,
  Notice
} from 'view-design'
// 注册全局组件
Vue.component('iButton', Button)
Vue.component('iInput', Input)
Vue.component('iSelect', Select)
Vue.component('iOption', Option)
Vue.component('Icon', Icon)
Vue.component('Page', Page)
Vue.component('Table', Table)
Vue.component('Row', Row)
Vue.component('iCol', iCol)
Vue.component('FormItem', FormItem)
Vue.component('DatePicker', DatePicker)
Vue.component('Form', Form)
Vue.component('Checkbox', Checkbox)
Vue.component('InputNumber', InputNumber)
Vue.component('Radio', Radio)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Modal', Modal)
Vue.component('iSwitch', Switch)
Vue.component('Upload', Upload)
Vue.component('Tooltip', Tooltip)
Vue.component('Notice', Notice)
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