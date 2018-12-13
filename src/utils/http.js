import axios from 'axios'
let _ = require('lodash')

function formatDate(date) {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    if (year.length < 4) day = '0' + year

    return [year, month, day].join('-')
}

const instance = axios.create({
    baseURL: '/api',
    timeout: 10000,
    params: {}, // do not remove this, its added to add params later in the config
    data: {}
})

instance.interceptors.request.use(function (config) {
    // Convert date object to isoStrong
    _.forEach(config.data, function(value, key) {
        if (value instanceof Date) {
            config.data[key] = formatDate(value)
        }
    })

    let token = sessionStorage.getItem('jwt_token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config

}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

export default instance