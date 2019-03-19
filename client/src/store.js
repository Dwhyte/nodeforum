import Vue from 'vue'
import Vuex from 'vuex'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import axios from 'axios'
import router from './router'


Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    isLoading: false,
    isAuthenticated: false,
    currentUser: {},
    loginErrors: {},
    registerErrors: {}
  },
  mutations: {
    setCurrentUser(state, user){
      state.currentUser = user
      state.isAuthenticated = true
    },
    logoutUser(state){
      state.isAuthenticated = false
      state.currentUser = {}
    },
    loginErrors(state, errorData) {
        state.loginErrors = errorData
    },
    registerErrors(state, errorData) {
      state.registerErrors = errorData
    },
  },
  getters: {
    currentUser(state) {
      return state.currentUser
    },
    AuthCheck(state) {
      return state.isAuthenticated
    },
    errors(state) {
      return state.errors
    },
    loginErrors(state) {
        return state.loginErrors
    },
    registerErrors(state) {
      return state.registerErrors
    },
  },
  actions: {
    setCurrentUser({commit, dispatch}, userToken){
      commit('setCurrentUser', userToken)
    },

    // Login User
    LoginUser({commit, dispatch}, authData) {
      axios.post('/api/login', {
        username: authData.username,
        password: authData.password
      })
      .then(res => {
        // save to localstorage
        const { token } = res.data;

        // set token to localstorage
        localStorage.setItem('jwtToken', token);

        // set auth token header auth
        setAuthToken(localStorage.jwtToken);

        // decode token and get user info and exp
        const decoded = jwt_decode(localStorage.jwtToken);

        // send user data to setCurrentUser
        dispatch('setCurrentUser', decoded)
        window.location.replace('/');
        // router.push('/');
      })
      .catch(error => {
        commit('loginErrors', error.response.data);
      })
    },


    // Register User
    RegisterUser({commit}, userData){
      axios.post('/api/register', {
        username: userData.username,
        password: userData.password,
        password2: userData.password2
      })
      .then(res => {
        console.log(res.data);
        router.push('/login');
      })
      .catch(error => {
        console.log(error);
        commit('registerErrors', error.response.data);
      })
    },


    // Logout Current User
    LogoutUser({commit}){
      // remove token from localstorage
      localStorage.removeItem('jwtToken');

      // remove auth header for future requests
      setAuthToken(false);

      // set currentUser to null, which will set is Authenticated to false
      commit('logoutUser');

      // redirect to home
      router.push('/');
    }

  }
})
