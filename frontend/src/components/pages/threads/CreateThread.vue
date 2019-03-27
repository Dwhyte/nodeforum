<template>
  <div id="newpost">
    <flash-message class="flashpool"></flash-message>
    <div class="container">
      <!-- <flash-message></flash-message> -->
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
                  <div
                    v-if="errors"
                    :style="{display: errors.password ? 'display' : 'block'}"
                    class="invalid-feedback"
                  >{{ errors.name }}</div>
                  <input
                    type="text"
                    class="form-control"
                    id="inlineFormInputName"
                    placeholder="Thread title"
                    v-model="title"
                  >
                </div>
                <div class="col-sm-3 my-1">
                  <label for="addfeaturedImage" class="mt-2">
                    <a class="btn btn-sm btn-outline-claim font-weight-bold">Upload Featured Image</a>
                  </label>
                  <input type="file" hidden class="form-control-file" id="addfeaturedImage">
                </div>
              </div>
            </form>
          </div>
          <wysiwyg v-model="myHTML"/>
          <div class="save-area">
            <a
              @click="createNewPost"
              class="btn btn-sm btn-outline-save font-weight-bold mt-3"
            >Upload Thread</a>
            <a
              @click="clearEditPost"
              style="float: right;"
              class="btn btn-sm btn-danger-outline font-weight-bold mt-3"
            >Clear</a>
          </div>
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
      CatValueId: "Select a category",
      errors: null
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
    getCats() {
      this.$store.dispatch("GetCategoryNames");
    },
    onChange(event) {
      console.log(event.target.value);
    },
    createNewPost() {
      this.axios
        .post("/api/v1/threads", {
          name: this.title,
          content: this.myHTML,
          categoryId: this.CatValueId
        })
        .then(res => {
          // this.flashSuccess(res.data.message);
          this.flash(res.data.message, "info flash__message");
          console.log(res.data);
          this.title = null;
          this.CatValueId = "Select a category";
          this.myHTML = null;
        })
        .catch(error => {
          this.errors = error.response.data;
        });
    },
    clearEditPost() {
      this.title = null;
      this.CatValueId = "Select a category";
      this.myHTML = null;
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

#newpost .save-area .btn-outline-save:hover {
  color: #ffffff;
}

#newpost .save-area .btn-danger-outline:hover {
  color: #ffffff;
}

#newpost .editr--content {
  background: #fff;
}
</style>
