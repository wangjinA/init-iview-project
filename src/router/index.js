import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/home.vue'
import Login from '@/views/login/login'
Vue.use(VueRouter)


const routes = [
  {
    path: '*',
    component: () => import(/* webpackChunkName: "404" */ '../views/errorPage/404')
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      hideHeader: true
    }
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem('st-token') && to.name != 'login') {
    setTimeout(() => {
      next('/login')
    }, 0)
  }
  next()
})
export default router
