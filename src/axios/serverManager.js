/*
 * @Author: 汪锦
 * @Date: 2020-08-21 17:51:29
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-10-15 10:49:52
 * @Description: url管理
 */
const isDev = process.env.NODE_ENV === 'development' // 开发环境下

// 需要代理的接口
const proxyServer = {
  40000: 'http://10.44.52.27:40000/',
  8088: 'http://106.37.69.222:8088/'
}
let proxyObj = {}

Object.keys(proxyServer).forEach(key => {
  proxyObj[`/${key}`] = {
    target: proxyServer[key],
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      [`^/${key}`]: ''
    }
  }
})

console.log(proxyObj);

// 开发环境接口地址
const devUrl = {
  ...proxyServer,
  default: '',
}

exports.devUrl = devUrl
module.exports = {
  proxyServer,
  devUrl
}