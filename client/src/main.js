// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import NProgress from 'nprogress'

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import jwt_decode from 'jwt-decode'
import store from './store'
import setAuthToken from './utils/setAuthToken'


Vue.config.productionTip = false

axios.defaults.baseURL = process.env.baseURL || 'http://localhost:3000'



// Check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  // store.commit('setCurrentUser', decoded);
  store.dispatch('setCurrentUser', decoded);

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout the user
    store.commit('logoutUser');
    // // Clear the current profile
    // store.commit('clearCurrentProfile');
  }
}


router.beforeEach((to, from, next) => {
  // check if the route requires authentication and user is not logged in
  if (to.matched.some(route => route.meta.requiresAuth) && !store.state.isAuthenticated) {
    // redirect to login page
    next({
      name: 'Login'
    })
    return
  }

  // // if logged in redirect to dashboard
  // if (to.path === '/' && store.state.isAuthenticated) {
  //   next({
  //     name: ''
  //   })
  //   return
  // }

  // if logged in redirect to profile
  if (to.path === '/register' && store.state.isAuthenticated) {
    next({
      name: 'Profile'
    })
    return
  }

  // if logged in redirect to profile
  if (to.path === '/login' && store.state.isAuthenticated) {
    next({
      name: 'Profile'
    })
    return
  }

  // // if logged out redirect to home
  // if (to.path === '/feed' && !store.state.isAuthenticated) {
  //   next({
  //     name: 'Landing'
  //   })
  //   return
  // }

  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})