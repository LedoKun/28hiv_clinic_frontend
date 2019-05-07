<template>
<section>
    <p class="title is-4">New Patient</p>
    <p class="subtitle is-6">Add a new patient or select an exisiting one.</p>

    <div class="columns">
        <div class="column">

          <b-notification
            v-if="!$_.isEmpty(backendFormErrors)"
            type="is-danger"
            has-icon
            aria-close-label="Close notification"
            role="alert">
            {{ backendFormErrors }}
          </b-notification>

          <form v-on:submit.prevent="handleSubmit()">
            <formly-form
              :form="form"
              :model="formData"
              :fields="fieldsSchema"
              ref="formObject"/>

            <div class="buttons is-pulled-right">
              <button
                type="submit"
                class="button is-primary"
                :disabled="!this.form.$valid"
              >
                Add New Patient
              </button>
            </div>
          </form>
        </div>
    </div>
</section>
</template>

<script>
import fieldsSchema from '@/formSchemas/newPatientForm'
import http from '@/utils/http/http.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'
import backendErrorsFormatter from '@/utils/ui/backendErrorsFormatter.js'

export default {
  name: 'NewPatient',
  components: {
  },
  methods: {
    handleSubmit () {
      if (!this.form.$valid) {
        return
      }

      let self = this
      let url = this.$config['APIPath'] + '/patient/'

      self.backendFormErrors = []

      http({
        url: url,
        data: self.formData,
        method: 'post'
      })
        .then(function (response) {
          self.$router.push({
            name: 'PatientSummary',
            params: {
              id: response.data.id
            }
          })
        })
        .catch(function (error) {
          if (error.response.status === 422) {
            self.backendFormErrors = backendErrorsFormatter(error.response.data.message)
            commonErrorToast('Please check the form for error.')
          } else {
            self.backendFormErrors = null
            commonErrorToast()
          }
        })
    }
  },
  data: () => {
    return {
      fieldsSchema: fieldsSchema,
      form: {},
      formData: {},

      backendFormErrors: null
    }
  }
}
</script>

<style scoped>
.buttons {
  margin-top: 1.25rem;
}
</style>
