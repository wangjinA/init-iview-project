/*
 * @Author: 汪锦
 * @Date: 2020-07-13 09:19:58
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-07-13 10:11:28
 * @Description: 路由配置
 */
import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: login
  },
  {
    path: "/welcome",
    name: "welcome",
    component: () =>
      import(/* webpackChunkName: "welcome" */ "@/views/welcome.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
