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
    registerErrors: {},
    threadData: {},
    thread: {},
    categories: {},
    profile: {},
    errors: {}
  },
  mutations: {
    setLoader(state, loader) {
      state.isLoading = loader
    },
    setCurrentUser(state, user){
      state.currentUser = user
      state.isAuthenticated = true
    },
    clearCurrentProfile(state) {
      state.profile = null
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
    setThreads(state, threads){
      state.threadData = threads
      state.isLoading = false
    },
    setSingleThread(state, thread) {
      state.thread = thread
      state.isLoading = false
    },
    setCatNames(state, cats) {
      state.categories = cats
    },
    setUserProfile(state, user) {
      state.profile = user
    },
    setErrors(state, error) {
      state.errors = error
    }
  },
  getters: {
    loaderStatus(state) {
      return state.isLoading
    },
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
    getThreads(state) {
      return state.threadData
    },
    getSingleThread(state) {
      return state.thread
    },
    getCategoryNames(state) {
      return state.categories
    },
    getSingleProfile(state) {
      return state.profile
    },
    getErrors(state) {
      return state.errors
    }
  },
  actions: {
    setCurrentUser({commit}, userToken){
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
        // window.location.replace('/');
        router.push({
          name: 'Landing',
          params: {
            category: 'all'
          }
        });
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
      .then(() => {
        // router.push('/login');
        router.push({
        name: 'Login',
      });
      })
      .catch(error => {
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
      router.push({
        name: 'Landing',
        params: {
          category: 'all'
        }
      });
    },


    // Get Current User
    async getCurrentUser({commit}) {
      try {
        const response = await axios.get('/api/currentUser')
        commit('setCurrentUser', response.data)
      } catch (error) {
        commit('setErrors', error.response.data)
      }
    },


    // Get All Category Names
    async GetCategoryNames({commit}) {
      try {
        const response = await axios.get('/api/v1/catlist/names');
        commit('setCatNames', response.data);  
      } catch (error) {
        commit('setCatNames', {})
      }
    },


    // Get Threads by Category
   async GetThreads({commit}, category) {
     try {
       commit('setLoader', true);
       const response = await axios.get(`/api/v1/category/${category}`);
       commit('setThreads', response.data);
      //  commit('setLoader', false);

     } catch (error) {
        commit('setThreads', {})
     }
    },

    // Get A Single Thread by Slug
    async GetSingleThread({commit}, slug) {
      try {
        commit('setLoader', true);
        const response = await axios.get(`/api/v1/threads/${slug}`);
        commit('setSingleThread', response.data);
      } catch (error) {
        commit('setSingleThread', {})
      }
    },

    // Get A Single User Profile
    async GetSingleUserProfile({commit}, username) {
      try {
        commit('setLoader', true);
        const response = await axios.get(`/api/v1/u/${username}`);
        commit('setUserProfile', response.data)
      } catch (error) {
        commit('setUserProfile', {})
      }
    },

    // Update User Background Cover
    async updateUserCover({commit}, coverImage) {
      try {
        commit('setLoader', true);
        await axios.post('/api/v1/u/update/cover', {
          cover: coverImage.cover
        });
      } catch (error) {
        commit('setErrors', error.response.data)
      }
    },


    // Update User Avatar
    async updateUserAvatar({commit}, avatarImage) {
      try {
        commit('setLoader', true);
        await axios.post('/api/v1/u/update/avatar', {
          avatar: avatarImage.avatar
        });
      } catch (error) {
        commit('setErrors', error.response.data)
      }
    },


    // Create a new Post
    async CreateNewPost({commit}, newPostHtml) {
      try {
        commit('setLoader', true);
        await axios.post('/api/v1/threads', {
          name: newPostHtml.name,
          content: newPostHtml.content,
          categoryId: newPostHtml.categoryId,
        })
      } catch (error) {
        commit('setErrors', error.response.data)
      }
    }
  }
})
