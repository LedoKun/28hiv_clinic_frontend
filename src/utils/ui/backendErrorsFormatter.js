function backendErrorsFormatter (errors, formSchema) {
  for (var key in errors) {
    // check if the property/key is defined in the object itself, not in parent
    if (errors.hasOwnProperty(key)) {
      let errorsString = ''
      let field = formSchema.find(schema => schema.key === key)
      let fieldName = ''

      if (Array.isArray(errors[key])) {
        errorsString = errors[key].join(', ')
      } else {
        errorsString = errors[key]
      }

      if (field && field.templateOptions.wrapper.properties.label) {
        fieldName = field.templateOptions.wrapper.properties.label
      } else {
        fieldName = key
      }

      return `${fieldName} - ${errorsString}`
    }
  }
}

export default backendErrorsFormatter
