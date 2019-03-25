<template>
  <div id="settings">
    <div class="container">
      <div class="row" v-if="Profile.user">
        <div class="col-lg-12 settings-area mb-5">
          <h1 class="header">
            <span class="border font-weight-bold text-uppercase">Settings</span>
          </h1>
        </div>
        <div class="col-lg-12 content-area">
          <div class="col-md-6">
            <div class="appreance-form">
              <form>
                <div class="form-group">
                  <label for="formGroupExampleInput">Example label</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput"
                    placeholder="Example input"
                  >
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput2">Another label</label>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Another input"
                  >
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  beforeMount() {
    let AuthUser = this.$store.state.currentUser;
    if (AuthUser.username !== this.$route.params.username) {
      this.$router.push("/category/ALL");
    }
  },
  beforeUpdate() {
    let AuthUser = this.$store.state.currentUser;
    if (AuthUser.username !== this.$route.params.username) {
      this.$router.push("/category/ALL");
    }
  },
  created() {
    this.getUser();
  },
  watch: {
    $route: "getUser"
  },
  computed: {
    Profile() {
      return !this.$store.getters.getSingleProfile
        ? false
        : this.$store.getters.getSingleProfile;
    }
  },
  methods: {
    getUser() {
      this.$store.dispatch("GetSingleUserProfile", this.$route.params.username);
    }
  }
};
</script>
<style>
#settings .header {
  font-size: 1rem;
  color: #34495e;
}

#settings .header > .border {
  padding-bottom: 0.3em;
  border: none !important;
  border-bottom: solid 2px #536eec !important;
}

#settings .appearance-form label {
  font-weight: 400;
  font-size: 0.7rem;
}
</style>