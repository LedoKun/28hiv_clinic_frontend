import http from './http.js'

async function saveData (url, payload, method = 'post', params = null) {
  try {
    let response = await http({
      url: url,
      data: payload,
      method: method,
      params: params
    })

    return response
  } catch (error) {
    console.error('Unable to contact the backend server.')
    console.error(error)
    Promise.reject(new Error(error))
  }
}

export default saveData
