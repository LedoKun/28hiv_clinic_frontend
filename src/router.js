import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Patient from './views/Patient.vue'
import Data from './views/Data.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: "is-active",
  linkExactActiveClass: "is-active",
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/patient/:urlHN?',
      name: 'patient',
      component: Patient,
      props: true
    },
    {
      path: '/data',
      name: 'data',
      component: Data
    },
    // 404
    {
      path: '*',
      redirect: '/'
    }
  ]
})
