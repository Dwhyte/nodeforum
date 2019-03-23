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
      <div class="row menu">
        <div class="col-lg-12 userdetail-area">
          <div class="details">
            <h1 class="name">{{ Profile.user.username }}</h1>
            <p>
              <span class="bullet online"></span>
              - Joined: {{ Profile.user.createdAt | moment("MMMM Do YYYY") }}
            </p>
          </div>
          <div class="avatar">
            <img :src="Profile.user.avatar" alt="Avatar image">
          </div>
          <div class="actions">
            <a class="item">
              <div class="stat">
                <div class="value">0</div>
                <div class="label">followers</div>
              </div>
            </a>
            <a class="item">
              <div class="stat">
                <div class="value">1</div>
                <div class="label">following</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="library" class="mb-3"></div>
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

#profile > #about > .row.header > .bgcover-area > .background:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(23, 23, 23, 0.2);
}

#profile > #about > .row.menu {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

#profile > #about > .row.menu > .userdetail-area {
  padding: 0;
  margin-bottom: 2rem;
}

#profile > #about > .row.menu > .userdetail-area .details {
  left: 275px;
  top: -90px;
  margin-left: 1rem;
  color: #f9f9f9;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
}

#profile > #about > .row.menu > .userdetail-area .details .name {
  text-transform: capitalize;
  color: #fff;
  margin: 0;
  min-height: 1rem;
  font-size: 2rem;
}

#profile > #about > .row.menu > .userdetail-area .details p .bullet.online {
  background: #21ba45;
}

#profile > #about > .row.menu > .userdetail-area .details p .bullet {
  display: inline-block;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 0.65rem;
  margin-right: 0.25rem;
  background: #767676;
}

#profile > #about > .row.menu > .userdetail-area .avatar {
  left: 100px;
  top: -135px;
  z-index: 2;
  border-radius: 4px;
  border: 4px solid #252b50;
  width: 175px;
  height: 175px;
}

#profile > #about > .row.menu > .userdetail-area .avatar,
#profile > #about > .row.menu > .userdetail-area .details {
  display: inline-block;
  position: absolute;
}

#profile > #about > .row.menu > .userdetail-area .avatar img {
  width: 100%;
  height: 100%;
}

#profile > #about > .row.menu > .userdetail-area .actions {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 288px;
  padding-right: 100px;
  width: 100%;
  height: 50px;
  background: #171e46;
}

#profile > #about > .row.menu > .userdetail-area .actions .item {
  color: #c8d1ff;
}

#profile > #about > .row.menu > .userdetail-area .actions .item > .stat {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  text-transform: uppercase;
  text-align: center;
}

#profile > #about > .row.menu > .userdetail-area .actions .item > .stat .value {
  line-height: 1;
  font-size: 1rem;
}

#profile > #about > .row.menu > .userdetail-area .actions .item > .stat .label {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0 0.6875em;
}

#profile > #about > .row.menu > .userdetail-area .actions .item > .stat .label {
  font-family: "Open Sans Condensed", Helvetica, sans-serif;
}
</style>
