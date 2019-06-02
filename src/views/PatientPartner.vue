<template>
<section v-if="isReady">
    <p class="title is-4">Paitent's Partner</p>
    <p class="subtitle is-6">Enter patient's partner here.</p>

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
          <b-button type="is-danger">Delete This Partner</b-button>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <form v-on:submit.prevent="formValidate">

          <b-field label="Is the partner deceased?"
            :type="{'is-danger': errors.has('deceased')}"
            :message="errors.first('deceased')">
            <b-select v-model="formData.deceased" name="deceased" v-validate="'required'" placeholder="Select an option" data-vv-as="Is the partner deceased?" >
                <option value="">Select an option</option>
                <option value="Alive">Alive</option>
                <option value="Deceased">Deceased</option>
                <option value="Unknown/Lost Contact">Unknown/Lost Contact</option>
                <option value="Undisclosed">Undisclosed</option>
            </b-select>
          </b-field>

          <b-field label="Partner's Sex"
            :type="{'is-danger': errors.has('sex')}"
            :message="errors.first('sex')">
            <b-select v-model="formData.sex" name="sex" placeholder="Select an option" v-validate="'required'" data-vv-as="partner's sex" >
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
            </b-select>
          </b-field>

          <b-field label="Partner's Gender"
            :type="{'is-danger': errors.has('gender')}"
            :message="errors.first('gender')">
            <b-select v-model="formData.gender" name="gender" v-validate="'required'" placeholder="Select an option" data-vv-as="partner's gender" >
                <option value="Homosexual">Homosexual</option>
                <option value="Heterosexual">Heterosexual</option>
                <option value="Bisexual">Bisexual</option>
                <option value="Transgender">Transgender</option>
                <option value="Undisclosed">Undisclosed</option>
            </b-select>
          </b-field>

          <b-field label="Partner's Anti-HIV Status"
            :type="{'is-danger': errors.has('HIVStatus')}"
            :message="errors.first('HIVStatus')">
            <b-select v-model="formData.HIVStatus" name="HIVStatus" placeholder="Select an option" data-vv-as="partner's anti-HIV status" >
                <option value="">Select an option</option>
                <option value="Inconclusive">Inconclusive</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
                <option value="Undisclosed">Undisclosed</option>
                <option value="Unknown/Never Tested">Unknown/Never Tested</option>
            </b-select>
          </b-field>

          <b-field label="Patient's HIV Status Disclosure"
            :type="{'is-danger': errors.has('PatientHIVStatusDisclosure')}"
            :message="errors.first('PatientHIVStatusDisclosure')">
            <b-select v-model="formData.PatientHIVStatusDisclosure" name="PatientHIVStatusDisclosure" placeholder="Select an option" data-vv-as="patient's HIV status disclosure" >
                <option value="Disclosed">Disclosed</option>
                <option value="Undisclosed">Undisclosed</option>
                <option value="Unknown">Unknown</option>
            </b-select>
          </b-field>

          <div class="field">
            <b-field label="Partner's HIV Treatment/Prevention"
              :type="{'is-danger': errors.has('HIVTreatmentOrPrevention')}"
              :message="errors.first('HIVTreatmentOrPrevention')">
            </b-field>

            <div class="field">
              <b-checkbox v-model="formData.HIVTreatmentOrPrevention"
                  native-value="Taking ARV">
                  Taking ARV
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.HIVTreatmentOrPrevention"
                  native-value="Taking PrEP">
                  Taking PrEP
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.HIVTreatmentOrPrevention"
                  native-value="Taking PEP">
                  Taking PEP
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.HIVTreatmentOrPrevention"
                  native-value="Practicing Safe Sex">
                  Practicing Safe Sex
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.HIVTreatmentOrPrevention"
                  native-value="Absetince">
                  Absetince
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.HIVTreatmentOrPrevention"
                  native-value="Using Clean Needles">
                  Using Clean Needles
              </b-checkbox>
            </div>

            <div class="field">
              <b-checkbox v-model="formData.HIVTreatmentOrPrevention"
                  native-value="Not Breastfeeding">
                  Not Breastfeeding
              </b-checkbox>
            </div>
          </div>

          <b-field label="Clinic Attend"
            :type="{'is-danger': errors.has('clinicAttend')}"
            :message="errors.first('clinicAttend')">
            <b-input v-model="formData.clinicAttend" name="clinicAttend" data-vv-as="clinic attend" />
          </b-field>

          <b-field label="HN"
            :type="{'is-danger': errors.has('hn')}"
            :message="errors.first('hn')">
            <b-input v-model="formData.hn" name="hn" data-vv-as="HN" />
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
  name: 'PatientPartner',
  components: {},
  created () {
    this.setDefault()

    if (this.$route.params.partnerID) {
      this.getData()
    }
  },
  methods: {
    setDefault () {
      this.isReady = false

      this.formData = {
        deceased: null,
        sex: null,
        gender: null,
        HIVStatus: null,
        PatientHIVStatusDisclosure: null,
        HIVTreatmentOrPrevention: [],
        clinicAttend: null,
        hn: null
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
        let url = self.$config['APIPath'] + '/patient/' + self.$route.params.id + '/partners/' + self.$route.params.partnerID
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
      let url = this.$config['APIPath'] + '/patient/' + this.$route.params.id + '/partners'
      let httpMethod = 'post'

      if (this.$route.params.partnerID) {
        httpMethod = 'patch'
        url = url + '/' + this.$route.params.partnerID
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
