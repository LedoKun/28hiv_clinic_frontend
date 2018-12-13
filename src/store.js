import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import Patient from './store/patient'
import Visit from './store/visit'
import Investigation from './store/investigation'
import Appointment from './store/appointment'
import Auth from './store/auth'

export default new Vuex.Store({
  modules: {
    Patient,
    Visit,
    Investigation,
    Appointment,
    Auth
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
