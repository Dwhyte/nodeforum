<template>
  <div id="app">
    <app-navbar/>
      <main role="main">
        <router-view/>
      </main>
  </div>
</template>

<script>
import Navbar from './components/inc/Navbar'
import Footer from './components/inc/Footer'
export default {
  name: 'App',
  components:{
    'app-navbar': Navbar,
    'app-footer': Footer
  }
}
</script>

<style>
@import 'main.css';
</style>
