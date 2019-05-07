import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Config from '@/config.js'
import _ from 'lodash'
import moment from 'moment'
import Buefy from 'buefy'
import VueFormly from 'vue-formly'
import VueFormlyBuefy from 'vue-formly-buefy'

import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.prototype.$config = Config
Vue.prototype.$_ = _

// MomentJS
moment.locale(Config.locale)
Vue.prototype.$moment = moment

// Buefy
Vue.use(Buefy, {
  defaultIconPack: Config.defaultIconPack,
  defaultDateFormatter: (date) => {
    return Config.defaultDateFormatter(date)
  },
  defaultDateParser: (date) => {
    return Config.defaultDateParser(date)
  },
  defaultMonthNames: Config.defaultMonthNames,
  defaultToastDuration: Config.defaultToastDuration
})

// vue-formly-buefy
Vue.use(VueFormly)
Vue.use(VueFormlyBuefy)

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
