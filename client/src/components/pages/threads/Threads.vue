<template>
  <div id="threads-section" class="col-lg-9 ml-auto mr-auto">
    <div class="mb-4">
      <ul class="list-unstyled" v-for="thread in threads.Threads" :key="thread.id">
        <li class="threadblock-norm thread">
          <div class="thread-title">
            <router-link :to="`/thread/${thread.slug}`" class="font-weight-bold">{{ thread.name }}</router-link>
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
    this.$store.dispatch("GetThreads");
  },
  computed: {
    threads() {
      return !this.$store.getters.getThreads
        ? false
        : this.$store.getters.getThreads;
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

.thread-title router-link {
  text-transform: capitalize;
}
</style>
