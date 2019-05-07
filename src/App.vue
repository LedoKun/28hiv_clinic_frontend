<template>
  <div id="app">
    <Navbar/>

    <div class="columns is-fullheight">
      <!-- sidebar -->
      <div class="column is-2 is-sidebar-menu is-hidden-mobile">
        <Sidebar/>
      </div>

      <!-- main content -->
      <div class="column is-main-column">
        <router-view class="is-main-content"/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'

export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style>
html {
  overflow-y: auto !important;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.is-sidebar-menu {
  background: #4a4a4a;
}
.is-main-column {
  background: #E8E8E8;
}
.is-main-content {
  padding: 1.5rem;
}
.columns.is-fullheight .column {
  overflow-y: auto;
}
</style>
