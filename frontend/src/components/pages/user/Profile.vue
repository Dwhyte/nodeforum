<template>
  <div id="profile" v-if="Profile.user">
    <div id="about" class="container">
      <div class="row header">
        <div
          class="col-lg-12 bgcover-area"
          :style="{ 'background-image': `url(${Profile.user.cover})` }"
        >
          <div class="background"></div>
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
  mounted() {
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
#profile > #about > .row.header > .bgcover-area > .background {
  height: 465px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
