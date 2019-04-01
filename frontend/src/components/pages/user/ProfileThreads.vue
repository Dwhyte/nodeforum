<template>
  <div>
    <h4>User Threads</h4>
    <ul v-if="threads">
      <li v-for="(thread, index) in threads" :key="index">
        <router-link :to="`/threads/${thread.slug}`" :title="thread.name">{{ thread.name }}</router-link>
        <router-link
          class="ml-3"
          title="Edit Post"
          :to="`/thread/edit/${thread.user.username}/${thread.slug}`"
        >
          <i class="far fa-edit"></i>
        </router-link>
        <!-- <img :src="thread.featured_image" :alt="thread.name"> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["threads"]
};
</script>