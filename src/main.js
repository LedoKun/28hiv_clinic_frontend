import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import Moment from 'moment'

// css
import 'buefy/dist/buefy.css'

// Add moment.js into the project
Moment.locale('th')
Vue.prototype.$moment = Moment

// Add Lodash to the project
Vue.prototype.$_ = require('lodash')

Vue.use(Buefy, {
  defaultDateFormatter: (date) => {
    let momentDate = Moment(date)
    return momentDate.isValid() ? momentDate.format('DD/MM/YYYY') : null
  }
})

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
