<template>
  <div>
    <div class="col-lg-11 ml-auto mr-auto mb-3">
      <h4>{{ user }}'s Threads</h4>
    </div>
    <Threads :threads="threads"/>
  </div>
</template>
<script>
import Threads from "../threads/BasicThreads";
export default {
  props: ["threads", "user"],
  components: {
    Threads
  }
};
</script>