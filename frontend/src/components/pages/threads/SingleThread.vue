<template>
  <div v-if="data.thread">
    <h1>{{ data.thread.name }}</h1>
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
    }
  },
  methods: {
    getSingleThread() {
      this.$store.dispatch("GetSingleThread", this.routeSlug);
    }
  }
};
</script>
