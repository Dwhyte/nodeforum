<template>
  <div class="thread-sticky-side-menu">
    <div class="cat-box">
      <ul class="list-unstyled">
        <li>IDEAS</li>
        <li>BUGS</li>
        <li>HELP</li>
        <li>MISC</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
@media (min-width: 992px) {
  .thread-sticky-side-menu {
    position: sticky;
    top: 0;
    right: 0;
    height: 100%;
    width: 20%;
  }
}

.thread-sticky-side-menu {
  margin-left: auto;
  margin-right: auto;
}
</style>
