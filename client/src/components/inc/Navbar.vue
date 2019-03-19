<template>
  <div>
      <nav class="navbar navbar-expand-md navbar-dark forum-nav fixed-top">
        <router-link to="/">
          <a class="navbar-brand">Node Forum</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav  ml-auto">
              <router-link v-if="!isAuth" to="/login" activeClass="active" tag="li">
                <a class="nav-link">Login</a>
              </router-link>
              <router-link v-if="!isAuth" to="/register" activeClass="active" tag="li">
                <a class="nav-link">Register</a>
              </router-link>
            <li v-if="isAuth" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="name">Hello, {{ currentUser.username }}</span>
                <img v-if="isAuth" class="avatar" :src="currentUser.avatar">
              </a>
              <div class="dropdown-menu profile-dropdown" aria-labelledby="dropdown01">
                <router-link v-if="isAuth" to="/profile" activeClass="active" tag="li"><a class="dropdown-item">Profile</a></router-link>
                <a href="" v-if="isAuth" class="dropdown-item" @click="onLogout">Logout</a>
              </div>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    <search-bar></search-bar>
  </div>
</template>
<script>
import SearchBar from '../inc/SearchBar'
export default {
  components:{
    'search-bar': SearchBar,
  },
  computed: {
    isAuth(){
      return !this.$store.getters.AuthCheck ? false : this.$store.getters.AuthCheck;
    },
    currentUser(){
      return !this.$store.getters.currentUser ? false : this.$store.getters.currentUser;
    }
  },
  methods: {
    onLogout(){
      this.$store.dispatch('logoutUser');
    }
  }
}
</script>
<style>
.forum-nav {
  height: 72px;
  background: #1A2568;
  box-shadow: 0 1px 3px 0 rgba(51, 51, 51, 0.08);
}

.navbar .avatar{
  width: 45px;
  height: 45px;
  border-radius: 16%;
}

.navbar .name {
  font-size: 12px;
  color: #ffffff;
  margin-right: 12px;
}
</style>
