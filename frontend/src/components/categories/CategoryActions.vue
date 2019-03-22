<template>
  <div class="thread-sticky-side-menu">
    <div class="cat-box">
      <ul v-if="catData" class="list-unstyled">
        <li class="mb-3">
          <button
            @click.prevent="updateNav('all')"
            class="btn btn-link btn-outline-claim btn-sm text-uppercase font-weight-bold"
          >ALL</button>
        </li>
        <li class="mb-3" v-for="category in catData.categories" :key="category.id">
          <button
            class="btn btn-link btn-outline-claim btn-sm text-uppercase font-weight-bold"
            @click.prevent="updateNav(category.name)"
          >{{ category.value }}</button>
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
    this.getCats();
  },
  watch: {
    $route: "updateNav",
    $route: "getCats"
  },
  computed: {
    catData() {
      return !this.$store.getters.getCategoryNames
        ? false
        : this.$store.getters.getCategoryNames;
    }
  },
  methods: {
    updateNav(categoryName) {
      this.$router.push({
        name: "Landing",
        params: { category: categoryName }
      });
    },
    getCats() {
      this.$store.dispatch("GetCategoryNames");
    }
  }
};
</script>
<style>
@media (min-width: 992px) {
  .thread-sticky-side-menu {
    position: sticky;
    top: 0;
    right: 0;
    height: 100%;
  }
}

.thread-sticky-side-menu {
  margin-left: auto;
  margin-right: auto;
}

.thread-sticky-side-menu .cat-box .btn.btn-link {
  width: 100%;
  color: #34495e;
}

.thread-sticky-side-menu .cat-box .btn.btn-link:hover {
  text-decoration: none;
  color: #ffffff;
}
</style>
