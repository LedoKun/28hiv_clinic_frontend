import store from '../store'
import { Toast } from 'buefy/dist/components/toast'

let _ = require('lodash')
let axios = require('axios')

let apiBaseURL = '/api'

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
    // Do not modify the original object
    config.data = _.cloneDeep(config.data)

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

async function responseFailure(error) {
    let originalRequest = error.config

    if ((error.response.status === 401 || error.response.status === 403) &&
        (localStorage.getItem('jwt_refresh_token'))) {
        let refresh_token = localStorage.getItem('jwt_refresh_token')

        try {
            let response = await axios({
                url: `${apiBaseURL}/auth/token_refresh`,
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${refresh_token}`
                }
            })

            if (response.data.access_token) {
                localStorage.setItem('jwt_token', response.data.access_token)

                // Use the new access token
                originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`
            }

            return axios(originalRequest)
        } catch (error) {
            store.dispatch('Auth/setLoggedOut')

            // Disply error toast
            Toast.open({
                message: 'กรุณาเข้าสูระบบอีกครั้ง',
                type: 'is-danger',
                position: 'is-bottom',
                duration: 8000
            })
        
            return Promise.reject(error)
        }
    } else {
        let msg = null

        if (
            error.response.data.name &&
            error.response.data.description
        ) {
            msg = `${error.response.data.name}: ${error.response.data.description}`
        } else if (error.response.data.message) {
            msg = `Error: ${error.response.data.message}`
        } else {
            msg = 'Unexpected Error.'
        }

        // Disply error toast
        Toast.open({
            message: msg,
            type: 'is-danger',
            position: 'is-bottom',
            duration: 8000
        })

        return Promise.reject(error)
    }
}

// create common instance for API
const instance = axios.create({
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