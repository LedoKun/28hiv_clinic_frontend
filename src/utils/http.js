import store from '../store'

let _ = require('lodash')
let axios = require('axios')

let apiURI = '/api'

function formatDate(date) {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    if (year.length < 4) day = '0' + year

    return [year, month, day].join('-')
}

// Request interceptor 
function requestSuccess(config) {
    // Convert date objects to iso string
    _.forEach(config.data, function (value, key) {
        if (value instanceof Date) {
            config.data[key] = formatDate(value)
        }
    })

    // set auth header
    let token = localStorage.getItem('jwt_token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}

function requestFailure(error) {
    return Promise.reject(error)
}

// Response interceptor
function responseSuccess(response) {
    return response
}

function responseFailure(error) {
    let originalRequest = error.config

    if ((error.response.status === 401 || error.response.status === 403) &&
        (localStorage.getItem('jwt_refresh_token'))) {
            let refresh_token = localStorage.getItem('jwt_refresh_token')

            axios({
                url: `${apiURI}/auth/token_refresh`,
                method: 'post',
                headers: {
                    'Authorization': `Bearer  ${refresh_token}`
                }
            })
                .then((response) => {
                    let payload = response.data

                    if (payload && payload.access_token) {
                        localStorage.setItem('jwt_token', payload.access_token)
                    }

                    return axios(originalRequest)
                })
                .catch(() => {
                    store.dispatch('Auth/setLoggedOut')
                })
    }

    return Promise.reject(error)
}

// create common instance for API
const instance = axios.create({
    baseURL: apiURI,
    timeout: 10000
})

instance.interceptors.request.use(
    (config) => requestSuccess(config),
    (error) => requestFailure(error)
)

instance.interceptors.response.use(
    (response) => responseSuccess(response),
    (error) => responseFailure(error)
)

export default instance