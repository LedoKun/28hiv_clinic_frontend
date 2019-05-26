import http from './http.js'

async function fetchData (url, method = 'get', params = null) {
  try {
    let response = await http({
      url: url,
      method: method,
      params: params
    })

    return response
  } catch (error) {
    console.error('Unable to contact the backend server.')
    console.error(error)
    throw Error(error)
  }
}

export default fetchData
