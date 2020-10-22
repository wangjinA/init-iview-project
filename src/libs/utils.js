/*
 * @Author: 汪锦
 * @Date: 2020-10-15 16:56:37
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-10-15 17:01:10
 * @Description: 常用工具函数
 */
import Vue from 'vue'

const utils = {
  /**
   * @param datetime javascript时间对象
   * @param format 转换时间格式 eg:"yyyy-MM-dd hh:mm:ss"
  */
  getDateTimeFormat: (datetime, format = "yyyy-MM-dd hh:mm:ss") => {
    let date = datetime ? new Date(datetime) : new Date();
    var o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }
}

Vue.prototype.$utils = utils