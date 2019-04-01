import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../components/inc/NotFound.vue'
// import Landing from '@/components/pages/home/Landing'
// import Login from '../components/auth/Login.vue'
// import Register from '../components/auth/Register.vue'
// import SingleThread from '../components/pages/threads/SingleThread.vue'
// import CreateThread from '../components/pages/threads/CreateThread.vue'
// import Profile from '../components/pages/user/Profile.vue'
// import ProfileSettings from '../components/pages/user/ProfileSettings.vue'
// import Settings from '../components/pages/user/Settings.vue'
// const Settings = () => import('../components/pages/user/Settings')

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
      component: () => import(/* webpackChunkName: "landing" */  "../components/pages/home/Landing"),
    },
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import(/* webpackChunkName: "login" */  "../components/auth/Login"),
      meta: {
        bodyClass: 'body-padding'
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import(/* webpackChunkName: "register" */  "../components/auth/Register"),
      meta: {
        bodyClass: 'body-padding'
      },
    },
    {
      path: '/threads/:slug',
      component: () => import(/* webpackChunkName: "singleThread" */  "../components/pages/threads/SingleThread")
    },
    {
      path: '/thread/new',
      name: 'NewThread',
      component: () => import(/* webpackChunkName: "createThread" */  "../components/pages/threads/CreateThread"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/thread/edit/:username/:slug',
      component: () => import(/* webpackChunkName: "editThread" */ "../components/pages/threads/EditThread.vue")
    },
    {
      path: '/u/:username',
      component: () => import(/* webpackChunkName: "profile" */ "../components/pages/user/Profile"),
      meta: {
        bodyClass: 'body-profile-padding'
      }
    },
    {
      path: '/u/:username/settings',
      name: 'UserSettings',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "settings" */ "../components/pages/user/Settings"),
      meta: {
        requiresAuth: true
      },
    }
  ]
})
