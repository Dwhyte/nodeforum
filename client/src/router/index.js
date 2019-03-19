import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NotFound from '../components/inc/NotFound.vue'
import Landing from '@/components/pages/home/Landing'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // When using history mode, the URL will look "normal," e.g. http://oursite.com/user/id. Beautiful!


  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
