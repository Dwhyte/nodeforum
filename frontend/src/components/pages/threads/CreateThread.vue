<template>
  <div id="newpost">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h1 class="header mb-4">
            <span class="border font-weight-bold text-uppercase">Post A New Thread</span>
          </h1>
          <div class="section-header mb-4">
            <form>
              <div class="form-row align-items-center">
                <div class="col-sm-3 my-1">
                  <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Select a category</label>
                  <select
                    v-model="CatValueId"
                    @change="onChange($event)"
                    class="custom-select mr-sm-2"
                    id="inlineFormCustomSelect"
                  >
                    <option selected>Select a category</option>
                    <option
                      v-for="category in catData.categories"
                      :key="category.id"
                      :value="category.id"
                    >{{ category.name }}</option>
                  </select>
                </div>
                <div class="col-sm-3 my-1">
                  <label class="sr-only" for="inlineFormInputName">Thread Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inlineFormInputName"
                    placeholder="Thread title"
                    v-model="title"
                  >
                </div>
              </div>
            </form>
          </div>
          <wysiwyg v-model="myHTML"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: null,
      myHTML: null,
      CatValueId: "Select a category"
    };
  },
  mounted() {
    this.getCats();
  },
  watch: {
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
    createNewPost() {},
    getCats() {
      this.$store.dispatch("GetCategoryNames");
    },
    onChange(event) {
      console.log(event.target.value);
    }
  }
};
</script>
<style>
#newpost .header {
  font-size: 1rem;
  color: #34495e;
}

#newpost .header > .border {
  padding-bottom: 0.3em;
  border: none !important;
  border-bottom: solid 2px #536eec !important;
}
</style>
