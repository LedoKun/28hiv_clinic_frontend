<template>
<section v-if="isReady">
    <p class="title is-4">Visit</p>
    <p class="subtitle is-6">Enter patient's visit information here.</p>

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
          <b-button type="is-danger">Delete This Visit</b-button>
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

          <b-field label="Body Weight (kg)"
            :type="{'is-danger': errors.has('bodyWeight')}"
            :message="errors.first('bodyWeight')">
            <b-input
              v-model="formData.bodyWeight"
              name="bodyWeight"
              v-validate="'numeric|min_value:0'"
              data-vv-as="body weight" />
          </b-field>

          <b-field label="History Of Contact With TB"
            :type="{'is-danger': errors.has('historyOfContactWithTB')}"
            :message="errors.first('historyOfContactWithTB')">
            <b-select v-model="formData.historyOfContactWithTB" name="historyOfContactWithTB" placeholder="Select an option" data-vv-as="history of contact with TB" >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </b-select>
          </b-field>

          <b-field label="ART Adherence Scale (%)"
            :type="{'is-danger': errors.has('ARTAdherenceScale')}"
            :message="errors.first('ARTAdherenceScale')">
            <b-input
              v-model="formData.ARTAdherenceScale"
              name="ARTAdherenceScale"
              v-validate="'numeric|min_value:0|max_value:100'"
              data-vv-as="ART adherence scale" />
          </b-field>

          <b-field label="ART Average Delayed Dosing In Minutes"
            :type="{'is-danger': errors.has('ARTAvgDelayedDosing')}"
            :message="errors.first('ARTAvgDelayedDosing')">
            <b-input
              v-model="formData.ARTAvgDelayedDosing"
              name="ARTAvgDelayedDosing"
              v-validate="'numeric|min_value:0|max_value:1440'"
              data-vv-as="ART average delayed dosing" />
          </b-field>

          <b-field label="ART Adherence Problems"
            :type="{'is-danger': errors.has('ARTAdherenceProblem')}"
            :message="errors.first('ARTAdherenceProblem')">
            <b-input
              type="textarea"
              v-model="formData.ARTAdherenceProblem"
              name="ARTAdherenceProblem"
              data-vv-as="ART adherence problems" />
          </b-field>

          <b-field label="Impressions"
            :type="{'is-danger': errors.has('impression')}"
            :message="errors.first('impression')">
              <b-taginput
                v-model="formData.impression"
                icon="label"
                placeholder="Add an impression"
                name="impression"
                v-validate="'required|min:1'"
                data-vv-as="impressions" />
          </b-field>

          <b-field label="ARV Medications"
            :type="{'is-danger': errors.has('arvMedications')}"
            :message="errors.first('arvMedications')">
              <b-taginput
                v-model="formData.arvMedications"
                icon="label"
                placeholder="Add an ARV medication"
                name="arvMedications"
                v-validate="'min:1'"
                data-vv-as="ARV medications" />
          </b-field>

          <b-field label="Why Switching ARV Regimen"
            :type="{'is-danger': errors.has('whySwitchingARV')}"
            :message="errors.first('whySwitchingARV')">
            <b-input
              type="textarea"
              v-model="formData.whySwitchingARV"
              name="whySwitchingARV"
              data-vv-as="why switching ARV regimen" />
          </b-field>

          <b-field label="Anti-TB Medications"
            :type="{'is-danger': errors.has('tbMedications')}"
            :message="errors.first('tbMedications')">
              <b-taginput
                v-model="formData.tbMedications"
                icon="label"
                placeholder="Add an Anti-TB medication"
                name="tbMedications"
                data-vv-as="anti-TB medications" />
          </b-field>

          <b-field label="Anti-OI Medications"
            :type="{'is-danger': errors.has('oiMedications')}"
            :message="errors.first('oiMedications')">
              <b-taginput
                v-model="formData.oiMedications"
                icon="label"
                placeholder="Add an Anti-OI medication"
                name="oiMedications"
                data-vv-as="anti-OI medications" />
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
  name: 'PatientVisit',
  components: {},
  created () {
    this.setDefault()

    if (this.$route.params.visitID) {
      this.getData()
    }
  },
  methods: {
    setDefault () {
      this.isReady = false

      this.formData = {
        date: null,
        bodyWeight: null,
        historyOfContactWithTB: null,
        ARTAdherenceScale: null,
        ARTAvgDelayedDosing: null,
        ARTAdherenceProblem: null,
        impression: [],
        arvMedications: [],
        whySwitchingARV: null,
        tbMedications: [],
        oiMedications: [],
        medications: []
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
        let url = self.$config['APIPath'] + '/patient/' + self.$route.params.id + '/visits/' + self.$route.params.visitID
        let response = await fetchData(url, 'get')
        let data = response.data

        if (self.$moment(data.date).isValid()) {
          data.date = self.$moment(data.date).toDate()
        } else {
          data.date = null
        }

        if (!Array.isArray(data.impression)) {
          data.impression = []
        }

        if (!Array.isArray(data.arvMedications)) {
          data.arvMedications = []
        }

        if (!Array.isArray(data.tbMedications)) {
          data.tbMedications = []
        }

        if (!Array.isArray(data.oiMedications)) {
          data.oiMedications = []
        }

        if (!Array.isArray(data.medications)) {
          data.medications = []
        }

        // discard all medications data
        delete data.medications

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
      let url = this.$config['APIPath'] + '/patient/' + this.$route.params.id + '/visits'
      let httpMethod = 'post'

      if (this.$route.params.visitID) {
        httpMethod = 'patch'
        url = url + '/' + this.$route.params.visitID
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
