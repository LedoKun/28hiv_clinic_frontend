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
    // Convert date object to isoString
    _.forEach(config.data, function(value, key) {
        if (value instanceof Date) {
            config.data[key] = formatDate(value)
        }
    })

    let token = localStorage.getItem('jwt_token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        config.headers.Authorization = `Bearer ${localStorage.getItem('jwt_refresh_token')}`
    }
    
    return config

}, function (error) {
    // https://github.com/axios/axios/issues/1674
    const originalRequest = error.config
    let token = localStorage.getItem('jwt_refresh_token')

    if (error.code != "ECONNABORTED" && error.response.status === 401 && token) {
        if (!originalRequest._retry) {
            originalRequest._retry = true
            return axios ({
                url: 'auth/token_refresh',
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
              .then(response => {
                let payload = response.data

                if (payload && payload.access_token) {
                    localStorage.setItem('jwt_token', payload.access_token)
                }
                return instance(originalRequest)
              })
            } else {
                localStorage.removeItem("jwt_token")
                localStorage.removeItem("jwt_refresh_token")
            }
    }

    // Do something with request error
    return Promise.reject(error)
})

export default instance