/*
 * @Author: 汪锦
 * @Date: 2020-10-14 20:16:40
 * @LastEditors: 迢迢
 * @LastEditTime: 2021-03-10 11:02:29
 * @Description: 项目基本接口
 */
import axios from '@/axios'
const { $baseApi } = axios
const { get, post, put, delete: del } = $baseApi
import Vue from 'vue'
const API = {
  //避难场所
  Shelter: {
    // 获取列表
    getList: params => get('/shelter/page', { params }),
    // 新增
    getAdd: params => post('/shelter/create', params),
    // 修改
    getUpdate: params => put('/shelter/update', params),
    // 删除
    getRemove: id => del(`/shelter/remove/${id}`)
  },
  //水文信息
  Hydrology: {
    //获取列表
    getWaterList: params => get('/hydrology/page', { params }),
    // 新增
    getWaterAdd: params => post('/hydrology/create', params),
    //修改
    getWaterUpdate: params => put('/hydrology/update', params),
    //删除
    getWaterRemove: id => del(`/hydrology/remove/${id}`)
  },
}

Vue.prototype.$baseApi = API
