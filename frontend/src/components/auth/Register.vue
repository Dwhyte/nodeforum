<template>
  <div id="auth-view" class="register container-fluid">
    <div class="row">
      <div class="col-lg-6 splash-bg"></div>
      <div class="col-lg-6 m-auto">
        <div class="col-md-6 offset-md-3">
          <h1 class="title mb-4">Sign Up</h1>
          <form novalidate @submit.prevent="submitRegister">
            <div class="form-group row">
              <input
                id="username"
                type="text"
                class="form-control"
                v-model="username"
                placeholder="Username"
                required
                autofocus
              >
              <div
                :style="{display: errors.username ? 'display' : 'block'}"
                class="invalid-feedback"
              >{{ errors.username }}</div>
            </div>
            <div class="form-group row">
              <input
                id="password"
                type="password"
                class="form-control"
                v-model="password"
                placeholder="Passsword"
                required
              >
              <div
                :style="{display: errors.password ? 'display' : 'block'}"
                class="invalid-feedback"
              >{{ errors.password }}</div>
            </div>
            <div class="form-group row">
              <input
                id="confirm-password"
                type="password"
                class="form-control"
                v-model="password2"
                placeholder="Confirm Password"
                required
              >
              <div
                :style="{display: errors.password2 ? 'display' : 'block'}"
                class="invalid-feedback"
              >{{ errors.password2 }}</div>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <button type="submit" class="btn">Register</button>
              </div>
            </div>
            <div class="form-group row mb-0">
              <div class="col-md-12 question">
                <p>
                  Already have an account?
                  <router-link to="/login">
                    <a>Login</a>
                  </router-link>
                </p>
                <p>
                  <router-link to="/">
                    <a>Back home</a>
                  </router-link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      password2: ""
    };
  },
  methods: {
    submitRegister() {
      this.$store.dispatch("RegisterUser", {
        username: this.username,
        password: this.password,
        password2: this.password2
      });
    }
  },
  computed: {
    errors() {
      return !this.$store.getters.registerErrors
        ? false
        : this.$store.getters.registerErrors;
    }
  }
};
</script>
<style>
#search-bar {
  display: none;
}

#auth-view .title {
  text-align: center;
}

#auth-view.register .splash-bg {
  width: 100%;
  background-image: url("~@/assets/register_splash_img.jpg");
  background-position: center;
  background-size: cover;
  height: 100vh;
  background-repeat: no-repeat;
}
</style>
