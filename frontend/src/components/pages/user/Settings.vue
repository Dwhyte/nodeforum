<template>
  <div id="settings">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 settings-area mb-5">
          <h1 class="header">
            <span class="border font-weight-bold text-uppercase">Settings</span>
          </h1>
        </div>
        <div class="col-lg-12 content-area">
          <div class="row">
            <div class="col-md-6">
              <div class="appearance-form">
                <form>
                  <div class="form-group">
                    <label class="font-weight-bold" for="passwordreset">Update Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password-input"
                      placeholder="xxxxxxxxxxx"
                      v-model="password"
                      v-show="!showPass"
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="password-input-text"
                      placeholder="xxxxxxxxxxx"
                      v-model="password"
                      v-show="showPass"
                    >

                    <a
                      @click="showPass = !showPass"
                      class="btn btn-sm btn-outline-claim font-weight-bold mt-3"
                    >
                      <span v-show="!showPass">Show Password</span>
                      <span v-show="showPass">Hide Password</span>
                    </a>
                    <a
                      @click="updatePassword"
                      class="btn btn-sm btn-outline-claim font-weight-bold mt-3 ml-2"
                      :class="{ 'pulse-button': password }"
                    >Update Password</a>
                  </div>
                  <div class="form-group mt-5">
                    <label
                      class="font-weight-bold"
                      for="deleteaccount"
                    >Permanently Delete Your Account</label>
                    <br>
                    <a
                      @click="deleteAccount"
                      class="btn btn-sm btn-danger-outline font-weight-bold mt-3"
                    >Delete Account</a>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-md-6">
              <div class="appearance-form"></div>
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
    return {
      showPass: false,
      password: null
    };
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
  methods: {
    getUser() {
      this.$store.dispatch("GetSingleUserProfile", this.$route.params.username);
    },
    removeUserToken() {
      this.$store.dispatch("LogoutUser");
    },
    updatePassword() {
      this.axios
        .post("/api/v1/u/update/passreset", { password: this.password })
        .then(res => {
          this.$toast.success({
            title: "User Settings",
            message: "Password has been updated",
            progressBar: true
          });
          this.getUser();
          this.password = null;
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteAccount() {
      this.axios
        .delete("/api/v1/u/remove")
        .then(res => {
          console.log(res.data);
          this.removeUserToken();
        })
        .catch(e => {
          console.log(e);
        });
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

#settings .appearance-form input {
  border: 2px solid #34495e;
}

#settings .appearance-form input {
  background-color: transparent;
  padding: 11px;
  border: 1px solid #dbdbdb;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

#settings button,
#settings input[type="password"],
#settings input[type="text"] {
  width: 100%;
  font-size: 18px !important;
  line-height: 24px;
  color: #484848;
  font-weight: 300;
  -webkit-appearance: none;
  height: 48px;
}

#settings .btn-outline-claim {
  /* color: #536eec; */
  background-color: transparent;
  background-image: none;
  border: 2px solid #536eec;
}

#settings .btn-outline-claim:hover {
  background-color: #536eec;
  color: #fff;
}

#settings .btn-danger-outline:hover {
  color: #fff;
  border: 2px solid #e91e63;
}
</style>