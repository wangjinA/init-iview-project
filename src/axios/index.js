/*
 * @Author: 汪锦
 * @Date: 2020-08-22 11:16:57
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-10-15 10:51:46
 * @Description: 生成axios对象，去请求接口
 */
import createAxios from './axios'

import { devUrl } from './serverManager'

let axiosList = {}
// 创建axios对象挂在到axiosList上
Object.keys(devUrl).forEach(key => {
  axiosList[`$${key}`] = createAxios({
    baseURL: `/${key}` // axios配置
  })
})

export default axiosList