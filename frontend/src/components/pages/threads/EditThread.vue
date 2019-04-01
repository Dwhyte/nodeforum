<template>
  <div>
    <h4>Edit Thread Vue</h4>
  </div>
</template>
<script>
export default {
  name: "EditThread",
  data() {
    return {
      routeSlug: this.$route.params.slug,
      routeUsername: this.$route.params.username
    };
  },
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