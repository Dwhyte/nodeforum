<template>
  <div class="content">
    <div class="container position-relative">
      <div class="row">
        <div class="message-board col-md-12 mb-5">
          <p>Message Board: Some kind of message</p>
        </div>
        <div class="thread-sorting col-md-12 mb-5">
          <router-link
            v-if="isAuth"
            to="/thread/new"
            class="btn btn-sm btn-outline-claim font-weight-bold text-uppercase"
          >Write A Post</router-link>

          <router-link
            v-if="!isAuth"
            to="/login"
            class="btn btn-sm btn-outline-claim font-weight-bold text-uppercase"
          >Login to Post</router-link>
        </div>
        <category-actions/>
        <threads/>
      </div>
    </div>
  </div>
</template>
<script>
import Threads from "../threads/Threads";
import CategoryActions from "../../categories/CategoryActions";
export default {
  components: {
    Threads,
    CategoryActions
  },
  data() {
    return {
      routeName: this.$route.params.category
    };
  },
  metaInfo() {
    return {
      titleTemplate: `%s - ${this.routeName.toUpperCase()}`
    };
  },
  computed: {
    isAuth() {
      return !this.$store.getters.AuthCheck
        ? false
        : this.$store.getters.AuthCheck;
    }
  }
};
</script>
<style>
body {
  background: #fafafa;
}

.thread-sorting .btn-outline-claim {
  float: right;
}
</style>
