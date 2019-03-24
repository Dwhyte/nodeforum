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
          <div id="appearance-form" class="form">
            <div class="two-fields">
              <div class="row">
                <div class="col-md-4">
                  <label for="avatar-input">
                    Avatar (Rec 150x150, Max 200kb)
                    <div class="avatar"></div>
                  </label>
                </div>
                <div class="col-md-8">
                  <label for="header-input" class="header-input">
                    Header (Rec. 1119x465, Max 750kb)
                    <div class="header"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
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
      this.$router.push("/");
    }
  },
  beforeUpdate() {
    let AuthUser = this.$store.state.currentUser;
    if (AuthUser.username !== this.$route.params.username) {
      this.$router.push("/");
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

#settings #appearance-form label .avatar {
  width: 150px;
  border-radius: 100%;
  font-size: 48px;
  line-height: 96px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  background: url("~@/assets/default_avatar.png") no-repeat;
  background-size: cover;
}

#settings #appearance-form label.header-input {
  width: 100%;
}

#settings #appearance-form label .header {
  width: 100%;
  border-radius: 4px;
  background: url("~@/assets/header_default.jpg") 50% 10% no-repeat;
  background-size: cover;
}

#settings #appearance-form label {
  font-weight: 400;
  font-size: 0.7rem;
}

#settings #appearance-form label .avatar,
#settings #appearance-form label .header {
  margin-top: 1rem;
  height: 150px;
  border: 4px solid #0b112d;
}
</style>