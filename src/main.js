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
  },
  defaultDateParser: (date) => {
    let dateArray = date.split('/')

    if (dateArray.length === 3 && dateArray[2] >= 2200) {
      dateArray[2] = dateArray[2] - 543
    }

    let momentDate = Moment(`${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`, 'DD/MM/YYYY')
    return momentDate.isValid() ? momentDate.toDate() : null
  },
  defaultMonthNames: [
    "1 - มกราคม",
    "2 - กุมภาพันธ์",
    "3 - มีนาคม",
    "4 - เมษายน",
    "5 - พฤษภาคม",
    "6 - มิถุนายน",
    "7 - กรกฎาคม",
    "8 - สิงหาคม",
    "9 - กันยายน",
    "10 - ตุลาคม",
    "11 - พฤศจิกายน",
    "12 - ธันวาคม"
  ],
  defaultToastDuration: 8000
})

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
