<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="data.thread">
      <h1>{{ data.thread.name }}</h1>
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
  mounted() {
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
