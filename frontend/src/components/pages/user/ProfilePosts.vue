<template>
  <div>
    <div class="col-lg-11 ml-auto mr-auto mb-3">
      <h4 class="name">{{ user }}'s Posts</h4>
    </div>
    <ul v-if="posts">
      <li v-for="(post, index) in posts" :key="index">{{ post.content }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["posts", "user"]
};
</script>