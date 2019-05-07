import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import NewPatient from './views/NewPatient.vue'
import AllPatients from './views/AllPatients.vue'
import Appointments from './views/Appointments.vue'

import PatientSummary from './views/PatientSummary.vue'
// import PatientDermographic from './views/PatientDermographic.vue'
// import PatientVisit from './views/PatientVisit.vue'
// import PatientInvestigation from './views/PatientInvestigation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'is-active', // active class for non-exact links.
  linkExactActiveClass: 'is-active', // active class for *exact* links.
  routes: [
    {
      path: '/',
      alias: '/dashboard',
      name: 'Home',
      component: Home
    },
    {
      path: '/new_patient',
      name: 'NewPatient',
      component: NewPatient
    },
    {
      path: '/all_patients',
      name: 'AllPatients',
      component: AllPatients
    },
    {
      path: '/appointments',
      name: 'Appointments',
      component: Appointments
    },
    {
      path: '/patient/:id',
      name: 'PatientSummary',
      component: PatientSummary
    }
    // {
    //   path: '/patient/:clinicID/dermographic',
    //   name: 'PatientDermographic',
    //   component: PatientDermographic
    // },
    // {
    //   path: '/patient/:clinicID/visit/:dateURI?',
    //   name: 'PatientVisit',
    //   component: PatientVisit
    // },
    // {
    //   path: '/patient/:clinicID/investigation/:dateURI?',
    //   name: 'PatientInvestigation',
    //   component: PatientInvestigation
    // }
  ]
})
