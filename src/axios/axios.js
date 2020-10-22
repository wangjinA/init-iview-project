/*
 * @Author: 汪锦
 * @Date: 2020-08-22 10:58:28
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-10-16 10:59:46
 * @Description: axios类
 */
import axios from 'axios'
// import url from './serverManager'

export const createAxios = options => {
  const instance = axios.create({
    // baseURL: url.default,
    timeout: 10000,
    ...options
  })
  instance.interceptors.request.use(
    config => {
      // 请求拦截器
      // console.log(config);
      if (config.method === 'put') {
        config.headers['Content-Type'] = 'application/json'
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    res => {
      // 响应拦截器

      const apiRes = res
      return apiRes
    },
    async error => {
      // document.getElementById('loading').style.display = 'none';
      // let el = document.getElementsByClassName('loading')
      // for (var i = 0; i < el.length; i++) {
      //   if (el[i].className == 'loading') {
      //     el[i].remove("loading")
      //     break
      //   }
      // }
      return Promise.reject(error)
    }
  )
  return instance
}

export default createAxios
