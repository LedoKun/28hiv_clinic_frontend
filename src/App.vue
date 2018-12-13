<template>
  <div id="app">

    <Navbar class="navbar" />

    <section class="section">
      <router-view/>
    </section>

    <Footer /> 
  </div>

</template>

<script>
import Navbar from './components/AppLayout/Navbar.vue'
import Footer from './components/AppLayout/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>


<style scoped>
#app {
  height: 100%;
  font-family: 'Open Sans', serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.section {
  min-height:100%;
  background: #ECF0F3;
}
.columns {
  width: 100%;
  margin-left: 0;
}
</style>
