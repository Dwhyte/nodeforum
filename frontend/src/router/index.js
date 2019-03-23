import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../components/inc/NotFound.vue'
import Landing from '@/components/pages/home/Landing'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import SingleThread from '../components/pages/threads/SingleThread.vue'
import CreateThread from '../components/pages/threads/CreateThread.vue'
import Profile from '../components/pages/user/Profile.vue'
import ProfileSettings from '../components/pages/user/ProfileSettings.vue'

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
    },
    {
      path: '/u/:username',
      component: Profile,
      meta: {
        bodyClass: 'body-profile-padding'
      }
    },
    {
      path: '/u/:username/settings',
      name: 'UserSettings',
      component: ProfileSettings,
      meta: {
        requiresAuth: true
      },
    }
  ]
})
