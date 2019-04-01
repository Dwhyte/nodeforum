<template>
  <div>
    <h4>User Posts</h4>
    <ul v-if="posts">
      <li v-for="(post, index) in posts" :key="index">{{ post.content }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["posts"]
};
</script>