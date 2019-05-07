function backendErrorsFormatter (errors) {
  for (var key in errors) {
    // check if the property/key is defined in the object itself, not in parent
    if (errors.hasOwnProperty(key)) {
      let errorsString = ''

      if (Array.isArray(errors[key])) {
        errorsString = errors[key].join(', ')
      } else {
        errorsString = errors[key]
      }

      return `${key}: ${errorsString}`
    }
  }
}

export default backendErrorsFormatter
