<template>
  <div class="content">
    <div class="container position-relative">
      <div class="row">
        <div class="message-board col-md-12 mb-5">
          <p>Message Board: Some kind of message</p>
        </div>
        <category-selections/>
        <threads/>
      </div>
    </div>
  </div>
</template>
<script>
import Threads from "../threads/Threads";
import CategorySelections from "../../categories/Category";
export default {
  components: {
    Threads,
    CategorySelections
  },
  data() {
    return {};
  }
};
</script>
<style>
body {
  background: #fafafa;
}
</style>
