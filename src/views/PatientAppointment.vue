<template>
<section v-if="isReady">
    <p class="title is-4">Appointment</p>
    <p class="subtitle is-6">Enter patient's appointment here.</p>

    <div class="level">
      <div class="level-left">
        <div class="buttons">
          <b-button
            type="is-link"
            @click="goBack()">
            Go Back
          </b-button>
        </div>
      </div>

      <div class="level-right">
        <div class="buttons level-item">
          <b-button type="is-danger">Delete This Appointment</b-button>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <form v-on:submit.prevent="formValidate">

          <b-field label="Date"
            :type="{'is-danger': errors.has('date')}"
            :message="errors.first('date')">
            <b-datepicker
              v-model="formData.date"
              name="date"
              v-validate="'required|date_format:dd/MM/yyyy'"
              data-vv-as="date"
              editable />
          </b-field>

          <b-field label="Appointment For"
            :type="{'is-danger': errors.has('appointmentFor')}"
            :message="errors.first('appointmentFor')">
            <b-input
              type="textarea"
              v-model="formData.appointmentFor"
              name="appointmentFor"
              maxlength="250"
              rows="10"
              v-validate="'required'"
              data-vv-as="appointment for" />
          </b-field>

          <div class="buttons is-pulled-right">
            <button
              type="submit"
              class="button is-primary"
            >Save</button>
          </div>
        </form>
      </div>
    </div>
</section>
</template>

<script>
import fetchData from '@/utils/http/fetchData.js'
import http from '@/utils/http/http.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'

export default {
  name: 'PatientAppointment',
  components: {},
  created () {
    this.setDefault()

    if (this.$route.params.appointmentID) {
      this.getData()
    }
  },
  methods: {
    setDefault () {
      this.isReady = false

      this.formData = {
        date: null,
        appointmentFor: null
      }

      this.$validator.errors.clear()

      this.isReady = true
    },
    goBack () {
      this.$router.push({
        name: 'PatientSummary',
        params: {
          id: this.$route.params.id
        }
      })
    },
    async getData () {
      let self = this
      self.formData = {}

      self.isReady = false

      try {
        let url = self.$config['APIPath'] + '/patient/' + self.$route.params.id + '/appointments/' + self.$route.params.appointmentID
        let response = await fetchData(url, 'get')
        let data = response.data

        if (self.$moment(data.date).isValid()) {
          data.date = self.$moment(data.date).toDate()
        } else {
          data.date = null
        }

        self.formData = data
      } catch (error) {
        console.error(error)
        self.setDefault()

        commonErrorToast()
      } finally {
        self.isReady = true
      }
    },
    formValidate () {
      let self = this

      this.$validator.validateAll().then((result) => {
        if (result) {
          self.handleSubmit()
        } else {
          commonErrorToast('Form is not valid! Please check the fields.')
        }
      })
    },
    handleSubmit () {
      let self = this
      let url = this.$config['APIPath'] + '/patient/' + this.$route.params.id + '/appointments'
      let httpMethod = 'post'

      if (this.$route.params.appointmentID) {
        httpMethod = 'patch'
        url = url + '/' + this.$route.params.appointmentID
      }

      http({
        url: url,
        data: self.formData,
        method: httpMethod
      })
        .then(function (response) {
          self.goBack()
        })
        .catch(function (error) {
          if (error.response.status === 422) {
            let backendErrors = error.response.data.message

            self.$_.forEach(backendErrors, function (value, key) {
              self.$validator.errors.add({
                field: key,
                msg: value,
                rule: 'backend'
              })
            })

            commonErrorToast('Form is not valid! Please check the fields.')
          } else {
            commonErrorToast()
          }
        })
    }
  },
  data: () => {
    return {
      isReady: false,
      formData: {}
    }
  }
}
</script>

<style scoped>
.buttons {
  margin-top: 1.25rem;
}
</style>
