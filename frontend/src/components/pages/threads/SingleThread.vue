<template>
  <div id="singleThread">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="loading" v-if="loading">Loading...</div>
          <div class="thread-container">
            <div v-if="data.thread">
              <h1>{{ data.thread.name }}</h1>
              <div v-cloak v-html="data.thread.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routeSlug: this.$route.params.slug
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   this.getSingleThread();
  // },
  created() {
    this.getSingleThread();
  },
  watch: {
    // call again the method if the route change
    $route: "getSingleThread"
  },
  computed: {
    data() {
      return !this.$store.getters.getSingleThread
        ? false
        : this.$store.getters.getSingleThread;
    },
    loading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    getSingleThread() {
      this.$store.dispatch("GetSingleThread", this.routeSlug);
    }
  }
};
</script>
<style>
#singleThread .thread-container {
  background: #fff;
  padding: 4rem 4.75rem;
  border-radius: 4px;
  border: 1px solid #eef0f1;
}

#singleThread .thread-container img {
  width: 100%;
}

[v-cloak] > * { display:none; }
[v-cloak]::before {
  content: " ";
  display: block;
  position: absolute;
  width: 80px;
  height: 80px;
  background-image: url('~@/assets/spinner.gif');
  background-size: cover;
  left: 50%;
  top: 50%;
}
</style>
