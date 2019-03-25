<template>
  <div id="profile" v-if="Profile.user">
    <div v-if="isEdit" class="profilePage-editingOverlay"></div>
    <div id="about" class="container">
      <div class="row header">
        <div class="col-lg-12 column">
          <div class="cover">
            <label for="cover-input" style="display: inline;">
              <a v-show="isEdit" class="settings-overlay-cover">
                <span class="overlay-text">
                  <h6 style="font-size: 15px;">Update your background cover</h6>
                </span>
              </a>
            </label>
            <div
              class="background"
              :style="[Profile.user.cover ? { 'background-image': `url(${Profile.user.cover})`} : {'background-image': `url('${require(`@/assets/header_default.jpg`)}')`}]"
            ></div>
            <div
              v-if="previewCoverUrl"
              class="background previewCoverUrl"
              v-bind:style="{ 'background-image': 'url( ' + previewCoverUrl + ')' }"
            ></div>
            <div v-if="previewCoverUrl" class="savecover">
              <span
                class="btn btn-link pulse-button btn-sm text-uppercase font-weight-bold"
                @click="uploadCoverUpload"
              >Update Cover</span>
            </div>
            <input
              id="cover-input"
              type="file"
              @change="onCoverChange"
              class="form-control"
              style="display: none;"
            >
          </div>
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
            <label for="avatar-input">
              <a v-show="isEdit" class="settings-overlay-button">
                <span class="overlay-text">
                  <i class="fas fa-camera-retro"></i>
                  <h6 style="font-size: 15px;">
                    <p>Update</p>
                    <p>Avatar</p>
                  </h6>
                </span>
              </a>
            </label>
            <img
              v-if="!Profile.user.avatar"
              :src="`${require(`@/assets/default_avatar.png`)}`"
              alt="default avatar"
            >
            <img v-if="Profile.user.avatar" :src="Profile.user.avatar" alt="Avatar image">
            <img
              v-if="previewAvatarUrl"
              :src="previewAvatarUrl"
              style="position: absolute;left: 0px;z-index: 1;"
            >
            <div v-if="previewAvatarUrl" class="savecover">
              <span
                class="btn btn-link pulse-button btn-sm text-uppercase font-weight-bold"
                @click="uploadAvatarUpload"
              >Update Avatar</span>
            </div>
            <input
              id="avatar-input"
              type="file"
              @change="onImageChange"
              class="form-control"
              style="display: none;"
            >
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
            <span
              v-if="authUser.username == routeName && isEdit == true"
              @click="cancelChanges"
              class="cancel btn btn-link btn-outline-claim btn-sm text-uppercase font-weight-bold"
            >Cancel</span>
            <span
              v-if="authUser.username == routeName"
              @click="isEdit = !isEdit"
              v-show="!isEdit"
              class="edit selected btn btn-link btn-outline-claim btn-sm text-uppercase font-weight-bold catActive"
            >Edit</span>
          </div>
        </div>
      </div>
    </div>
    <div id="library" class="mb-3"></div>
  </div>
</template>
<script>
export default {
  metaInfo() {
    return {
      titleTemplate: `%s - ${this.routeName.toUpperCase()}`
    };
  },
  data() {
    return {
      routeName: this.$route.params.username,
      isEdit: false,
      image: null,
      cover: null,
      bio: null,
      name: null,
      previewAvatarUrl: null,
      previewCoverUrl: null,
      textInputField: false
    };
  },
  mounted() {
    this.getUser();
  },
  watch: {
    $route: "getUser"
  },
  computed: {
    authUser() {
      return !this.$store.getters.currentUser
        ? false
        : this.$store.getters.currentUser;
    },
    Profile() {
      return !this.$store.getters.getSingleProfile
        ? false
        : this.$store.getters.getSingleProfile;
    }
  },
  methods: {
    getUser() {
      this.$store.dispatch("GetSingleUserProfile", this.routeName);
    },

    getCurrentAuthUser() {
      this.$store.dispatch("getCurrentUser");
    },

    onImageChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      this.avatar = e.target.files[0];
      console.log(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      let vm = this;
      this.previewAvatarUrl = URL.createObjectURL(file);
      reader.readAsDataURL(file);
    },
    onCoverChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createCover(files[0]);
      this.cover = e.target.files[0];
      console.log(files[0]);
    },
    createCover(file) {
      let reader = new FileReader();
      let vm = this;
      this.previewCoverUrl = URL.createObjectURL(file);
      reader.readAsDataURL(file);
    },
    uploadAvatarUpload() {
      const formData = new FormData();
      formData.append("avatar", this.avatar, this.avatar.name);
      this.axios
        .post("/api/v1/u/update/avatar", formData)
        .then(res => {
          console.log(res);
          this.getUser();
          this.getCurrentAuthUser();
          this.avatar = null;
          this.previewAvatarUrl = null;
        })
        .then(console.log("Avatar Uploaded"), (this.avatar = null))
        .catch(e => {
          console.log(e);
        });
    },
    uploadCoverUpload() {
      const formData = new FormData();
      formData.append("cover", this.cover, this.cover.name);
      this.axios
        .post("/api/v1/u/update/cover", formData, {
          onUploadProgress: uploadEvent => {
            console.log(
              "Upload Progress: " +
                Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
                "%"
            );
          }
        })
        .then(res => {
          console.log(res);
          this.getUser();
          this.getCurrentAuthUser();
          this.cover = null;
          this.previewCoverUrl = null;
        })
        .then(console.log("Cover Uploaded"), (this.cover = null))
        .catch(e => {
          console.log(e);
        });
    },
    cancelAvatarUpload() {
      this.avatar = null;
    },
    cancelCoverUpload() {
      this.cover = null;
    },
    cancelChanges() {
      this.isEdit = false;
      this.previewAvatarUrl = null;
      this.previewCoverUrl = null;
      this.image = null;
      this.cover = null;
      this.name = null;
      this.bio = null;
      this.textInputField = false;
      this.getUser();
    }
  }
};
</script>
<style>
#profile .header > .column {
  padding: 0;
}

#profile .background {
  height: 465px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
}

#profile > #about .background:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(23, 23, 23, 0.27);
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
  width: 175px;
  height: 175px;
  border-radius: 999em;
  border: 4px solid #5247c3;
}

#profile > #about > .row.menu > .userdetail-area .avatar,
#profile > #about > .row.menu > .userdetail-area .details {
  display: inline-block;
  position: absolute;
}

#profile > #about > .row.menu > .userdetail-area .avatar img {
  width: 100%;
  height: 100%;
  border-radius: 999em;
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
  background: #182231;
  border-top: 2px solid #5247c3;
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

.profilePage-editingOverlay {
  background-color: #253446;
  bottom: 0;
  display: block;
  left: 0;
  opacity: 0.8;
  -ms-filter: "alpha(opacity=80)";
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}

.settings-overlay-cover {
  position: absolute;
  z-index: 2;
  background-color: rgba(40, 31, 181, 0.02);
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: 2px solid #0b1549;
  left: 0px;
}

.previewCoverUrl {
  position: absolute;
  top: 0px;
  width: 100% !important;
  z-index: 0;
  left: 0px;
}

.settings-overlay-cover:hover {
  background-color: rgba(222, 220, 220, 0.04);
}

.settings-overlay-button {
  position: absolute;
  top: 0;
  background-color: rgba(6, 0, 84, 0.41);
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  border: 2px solid #0b1549;
  z-index: 1;
}

.settings-overlay-button:hover {
  background-color: rgba(222, 220, 220, 0.04);
}

.overlay-text {
  position: relative;
  display: block;
  height: 30px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
}

.overlay-text h6 p {
  margin-bottom: 0;
}

span.edit {
  position: absolute;
  right: 48px;
  padding: 8px 40px !important;
  font-size: 12px;
  border-radius: 5px;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
}

span.edit:hover {
  background-color: transparent;
  background-image: none;
  border: 2px solid #536eec;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  text-decoration: none;
}

.actions .cancel {
  padding: 8px 40px !important;
  font-size: 12px;
  border-radius: 5px;
  letter-spacing: 0.05em;
  right: 174px !important;
  background: #7a7b80 !important;
  box-shadow: 0 0 0 0 rgb(82, 71, 195);
  border: none;
  color: #fff;
  transition: right 10s linear;
  border: 2px solid #9e9e9e;
  z-index: 1;
  position: absolute;
}

.actions .cancel:hover {
  background: transparent !important;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  -webkit-box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  text-decoration: none;
  border: 2px solid #a3a6b1;
}

.savecover {
  z-index: 2;
  position: absolute;
  top: 56%;
  right: 44%;
}

#profile > #about > .row.menu > .userdetail-area .avatar .pulse-button {
  color: #fff;
  font-size: 12px;
  position: absolute;
  right: -39px;
  top: 87px;
  letter-spacing: 0.05em;
  border: 2px solid #6253ff;
  box-shadow: 0 0 0 0 rgb(82, 71, 195);
  border-radius: 5px;
  background-color: #5247c3;
  cursor: pointer;
  -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
}

#profile .cover .pulse-button {
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.05em;
  border: 2px solid #6253ff;
  box-shadow: 0 0 0 0 rgb(82, 71, 195);
  border-radius: 5px;
  background-color: #5247c3;
  cursor: pointer;
  -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
}
</style>
