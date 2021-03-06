/*
 * @Author: 汪锦
 * @Date: 2020-07-13 09:21:44
 * @LastEditors: 迢迢
 * @LastEditTime: 2021-07-06 16:25:09
 * @Description: vue配置文件
 */
const isProduction = process.env.NODE_ENV === "production"
const publicPath = isProduction ? "./" : "./";
const path = require("path")
const resolve = dir => {
  return path.join(__dirname, dir);
};
const { proxyServer } = require('./src/axios/serverManager')

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

module.exports = {
  publicPath,
  // lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("_c", resolve("src/components"))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  /* less全局公共配置 */
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        //注意：试过不能使用别名路径
        path.resolve(__dirname, "src/style/globalStyle.less")
      ]
    }
  },
  devServer: {
    proxy: {
      ...proxyObj
    }
  }
};
