import { Toast } from 'buefy/dist/components/toast'

function commonErrorToast (message = null) {
  if (!message) {
    message = `Lost connection to backend server.`
  }

  Toast.open({
    message: message,
    position: 'is-bottom',
    type: 'is-danger'
  })
}

export default commonErrorToast
