// import store from '../store'
// import axiosRetry from 'axios-retry'

let _ = require('lodash')
let axios = require('axios')
let Config = require('@/config.js')

function isValidDate (date) {
  return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)
}

function formatDate (date) {
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  let year = date.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  if (year.length < 4) day = '0' + year

  return [year, month, day].join('-')
}

// Request on success interceptor
function requestSuccess (config) {
  // Do not modify the original object
  config.data = _.cloneDeep(config.data)

  _.forEach(config.data, function (value, key) {
    // Convert date objects to iso string
    if (isValidDate(value)) {
      config.data[key] = formatDate(value)
    }

    // Also convert all 'False' but not zero values to null
    if (!value) {
      config.data[key] = null
    }
  })

  return config
}

// Request on failure interceptor
function requestFailure (error) {
  return Promise.reject(error)
}

// Response on failure interceptor
// async function responseFailure (error) {
//   return Promise.reject(error)
// }

// create common instance for API
const http = axios.create({
  baseURL: Config['apiBaseURL'],
  timeout: Config['httpTimeOut']
})

http.interceptors.request.use(
  (config) => requestSuccess(config),
  (error) => requestFailure(error)
)

// http.interceptors.response.use(
//   (response) => responseSuccess(response),
//   (error) => responseFailure(error)
// )

export default http
