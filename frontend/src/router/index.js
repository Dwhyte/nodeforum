import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../components/inc/NotFound.vue'
import Landing from '@/components/pages/home/Landing'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import SingleThread from '../components/pages/threads/SingleThread.vue'
import CreateThread from '../components/pages/threads/CreateThread.vue'

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
      path: '/category/:category',
      name: 'Landing',
      component: Landing,
      // children: [
      //   {

      //   }
      // ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        bodyClass: 'body-padding'
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        bodyClass: 'body-padding'
      },
    },
    {
      path: '/threads/:slug',
      component: SingleThread
    },
    {
      path: '/thread/new',
      name: 'NewThread',
      component: CreateThread,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
