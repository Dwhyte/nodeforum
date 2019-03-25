// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import NProgress from 'nprogress'

import Vue from 'vue'
// import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import jwt_decode from 'jwt-decode'
import store from './store'
import setAuthToken from './utils/setAuthToken'
import VueTruncate from 'vue-truncate-filter'
import vbclass from 'vue-body-class'
import Meta from 'vue-meta'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import CxltToastr from 'cxlt-vue2-toastr'
import wysiwyg from "vue-wysiwyg";
import "vue-wysiwyg/dist/vueWysiwyg.css";



Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_DEVURL



// Check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  // store.commit('setCurrentUser', decoded);
  store.dispatch('setCurrentUser', decoded);
  store.dispatch('getCurrentUser')

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout the user
    store.commit('logoutUser');
    // // Clear the current profile
    store.commit('clearCurrentProfile');
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

  // if logged in redirect to landing
  if (to.path === '/') {
    next({
      name: 'Landing',
      params: {
        category: 'all'
      }
    })
    return
  }

    // if logged in redirect to landing
  if (to.path === '/' && store.state.isAuthenticated) {
    next({
      name: 'Landing',
      params: {
        category: 'all'
      }
    })
    return
  }

  // if logged in redirect to landing
  if (to.path === '/register' && store.state.isAuthenticated) {
    next({
      name: 'Landing',
      params: {
        category: 'all'
      }
    })
    return
  }

  // if logged in redirect to landing
  if (to.path === '/login' && store.state.isAuthenticated) {
    next({
      name: 'Landing',
      params: {
        category: 'all'
      }
    })
    return
  }

  next()
})


var toastrConfigs = {
  position: 'top right',
  color: '#536eec',
  closeButton: true,
  delay: 0,
  timeOut: 2200,
  hideDuration: 1000,
  showDuration: 1000,
}

Vue.use(VueTruncate)
Vue.use(vbclass, router)
Vue.use(require('vue-moment'));
Vue.use(Meta)
Vue.use(VueAxios, axios)
Vue.use(CxltToastr, toastrConfigs);
Vue.use(wysiwyg, {
  maxHeight: "1000px"
})


/* eslint-disable no-new */


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
