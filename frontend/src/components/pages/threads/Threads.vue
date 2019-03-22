<template>
  <div id="threads-section" class="col-lg-10 ml-auto mr-auto">
    <div class="mb-4">
      <div class="loading" v-if="loading">Loading...</div>
      <ul v-else class="list-unstyled" v-for="thread in threads.Threads" :key="thread.id">
        <li class="threadblock-norm thread mb-4">
          <div class="thread-title">
            <router-link
              :to="`/threads/${thread.slug}`"
              class="font-weight-bold"
            >{{ thread.name | truncate(50) }}</router-link>
            <div class="thread-meta">
              <div>
                <span class="display-name">By {{ thread.user.username }}</span>
                <span class="display-category">In {{ thread.category.value }}</span>
                <span class="display-date">
                  · {{ thread.createdAt | moment("MMMM Do") }}
                  <small>({{ thread.createdAt | moment("from", "now") }})</small>
                </span>
              </div>
            </div>
            <div class="small mt-2">{{ thread.content | truncate(200) }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.getThreads();
  },
  watch: {
    $route: "getThreads"
  },
  computed: {
    threads() {
      return !this.$store.getters.getThreads
        ? false
        : this.$store.getters.getThreads;
    },
    loading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    getThreads() {
      let catSlug = this.$route.params.category.toUpperCase();
      this.$store.dispatch("GetThreads", catSlug);
    }
  }
};
</script>
<style>
.threadblock-norm {
  background: #fff;
  border: 1px solid #eef0f1;
}

.thread {
  font-size: 1.1rem;
  padding-left: 1.5rem;
  display: block;
  border-radius: 4px;
  position: relative;
  padding: 1rem 0.75rem;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.thread-title a {
  text-transform: capitalize;
}

.thread-meta {
  font-size: 14px;
  display: inline-block;
  float: right;
}
</style>
