<template>
  <div id="app">
    <app-navbar/>
    <main role="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navbar from "./components/inc/Navbar";
import Footer from "./components/inc/Footer";
export default {
  name: "App",
  components: {
    "app-navbar": Navbar,
    "app-footer": Footer
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Node Forum",
    // all titles will be injected into this template
    titleTemplate: "%s | Welcom To My Awesome Forum"
  }
};
</script>

<style>
@import "main.css";
</style>
<style lang="scss">
@import "../src/assets/variables.scss";
@import "../src/assets/nprogress.scss";
</style>

