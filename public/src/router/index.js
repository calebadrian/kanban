import Vue from 'vue'
import Router from 'vue-router'
//@ts-ignore
import Home from '@/components/Home'
//@ts-ignore
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
