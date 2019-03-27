<template>
  <div id="threads-section" class="col-lg-11 ml-auto mr-auto">
    <div class="mb-4">
      <!-- <div class="loading text-center" v-if="loading">Loading...</div> -->
      <content-loader
        v-if="!Data.threads"
        :height="160"
        :width="300"
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
      >
        <circle cx="10" cy="20" r="8"/>
        <rect x="25" y="15" rx="5" ry="5" width="220" height="10"/>
        <circle cx="10" cy="50" r="8"/>
        <rect x="25" y="45" rx="5" ry="5" width="220" height="10"/>
        <circle cx="10" cy="80" r="8"/>
        <rect x="25" y="75" rx="5" ry="5" width="220" height="10"/>
        <circle cx="10" cy="110" r="8"/>
        <rect x="25" y="105" rx="5" ry="5" width="220" height="10"/>
      </content-loader>
      <ul v-else class="list-unstyled">
        <li class="threadblock-norm thread mb-4" v-for="thread in Data.threads" :key="thread.id">
          <div class="thread-title">
            <router-link :to="`/u/${thread.user.username}`">
              <img
                v-if="!thread.user.avatar"
                class="thread-avatar mr-3"
                :src="`${require(`@/assets/default_avatar.png`)}`"
                alt="Default avatar"
                :title="thread.user.username"
              >
              <img
                v-if="thread.user.avatar"
                class="thread-avatar mr-3"
                :src="thread.user.avatar"
                :title="thread.user.username"
                :alt="thread.user.username"
              >
            </router-link>
            <router-link
              :to="`/threads/${thread.slug}`"
              class="font-weight-bold"
            >{{ thread.name | truncate(50) }}</router-link>
            <div class="thread-meta">
              <div>
                <span class="display-name">
                  By
                  <router-link
                    class="font-weight-bold"
                    :to="`/u/${thread.user.username}`"
                  >{{ thread.user.username }}</router-link>
                </span>
                <span class="display-category ml-1">
                  in
                  <span
                    v-bind:style="{ 'color': `${thread.category.color}` }"
                  >{{ thread.category.value }}</span>
                </span>
                <span class="display-date">
                  · {{ thread.createdAt | moment("MMMM Do") }}
                  <small>({{ thread.createdAt | moment("from", "now") }})</small>
                </span>
              </div>
            </div>
            <div class="small mt-2">{{ thread.content.replace(/<[^>]+>/g, '') | truncate(200) }}</div>
          </div>
        </li>
      </ul>
      <div v-if="Data.threads === 'Threads does not exists for this category'">
        <h4 class="text-center">No Threads</h4>
      </div>
    </div>
  </div>
</template>
<script>
// import ThreadDisplayPlaceholder from "./ThreadDisplayPlaceholder";
import { ContentLoader } from "vue-content-loader";

export default {
  components: {
    ContentLoader
  },
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
    Data() {
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

.threadblock-norm:hover {
  -webkit-box-shadow: 0 0 0.3rem hsla(0, 0%, 69%, 0.25),
    0 0.2rem 0.35rem hsla(0, 0%, 69%, 0.25);
  box-shadow: 0 0 0.3rem hsla(0, 0%, 69%, 0.25),
    0 0.2rem 0.35rem hsla(0, 0%, 69%, 0.25);
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

.thread-title a:hover {
  text-decoration: none;
  color: #6e7c8a;
}

.thread-meta {
  font-size: 14px;
  display: inline-block;
  float: right;
}

.thread-avatar {
  width: 40px;
  height: 40px;
  border-radius: 16%;
  border-radius: 999em;
}
</style>
