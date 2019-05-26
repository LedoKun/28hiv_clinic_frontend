<template>
<section v-if="isReady">
    <p class="title is-4">Investigation</p>
    <p class="subtitle is-6">Enter patient's Investigation information here.</p>

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
          <b-button type="is-danger">Delete This Investigation</b-button>
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

          <b-field label="VL (Enter 0 If Undetectable)"
            :type="{'is-danger': errors.has('viralLoad')}"
            :message="errors.first('viralLoad')">
            <b-input
              v-model="formData.viralLoad"
              name="viralLoad"
              v-validate="'numeric|min_value:0'"
              data-vv-as="VL" />
          </b-field>

          <b-field label="Absolute CD4 Count"
            :type="{'is-danger': errors.has('absoluteCD4')}"
            :message="errors.first('absoluteCD4')">
            <b-input
              v-model="formData.absoluteCD4"
              name="absoluteCD4"
              v-validate="'numeric|min_value:0'"
              data-vv-as="absolute CD4 count" />
          </b-field>

          <b-field label="%CD4"
            :type="{'is-danger': errors.has('percentCD4')}"
            :message="errors.first('percentCD4')">
            <b-input
              v-model="formData.percentCD4"
              name="percentCD4"
              v-validate="'numeric|min_value:0|max_value:100'"
              data-vv-as="%CD4" />
          </b-field>

          <b-field label="Hemoglobin"
            :type="{'is-danger': errors.has('hemoglobin')}"
            :message="errors.first('hemoglobin')">
            <b-input
              v-model="formData.hemoglobin"
              name="hemoglobin"
              v-validate="'numeric|min_value:0'"
              data-vv-as="hemoglobin" />
          </b-field>

          <b-field label="Hematocrit"
            :type="{'is-danger': errors.has('hematocrit')}"
            :message="errors.first('hematocrit')">
            <b-input
              v-model="formData.hematocrit"
              name="hematocrit"
              v-validate="'numeric|min_value:0|max_value:100'"
              data-vv-as="hematocrit" />
          </b-field>

          <b-field label="White Blood Cell Count"
            :type="{'is-danger': errors.has('whiteBloodCellCount')}"
            :message="errors.first('whiteBloodCellCount')">
            <b-input
              v-model="formData.whiteBloodCellCount"
              name="whiteBloodCellCount"
              v-validate="'numeric|min_value:0'"
              data-vv-as="white blood cell count" />
          </b-field>

          <b-field label="Neutrophils (%)"
            :type="{'is-danger': errors.has('neutrophilsPct')}"
            :message="errors.first('neutrophilsPct')">
            <b-input
              v-model="formData.neutrophilsPct"
              name="neutrophilsPct"
              v-validate="'numeric|min_value:0|max_value:100'"
              data-vv-as="neutrophils (%)" />
          </b-field>

          <b-field label="Eosinophils (%)"
            :type="{'is-danger': errors.has('eosinophilsPct')}"
            :message="errors.first('eosinophilsPct')">
            <b-input
              v-model="formData.eosinophilsPct"
              name="eosinophilsPct"
              v-validate="'numeric|min_value:0|max_value:100'"
              data-vv-as="eosinophils (%)" />
          </b-field>

          <b-field label="Basophils (%)"
            :type="{'is-danger': errors.has('basophilsPct')}"
            :message="errors.first('basophilsPct')">
            <b-input
              v-model="formData.basophilsPct"
              name="basophilsPct"
              v-validate="'numeric|min_value:0|max_value:100'"
              data-vv-as="basophils (%)" />
          </b-field>

          <b-field label="Lymphocytes (%)"
            :type="{'is-danger': errors.has('lymphocytesPct')}"
            :message="errors.first('lymphocytesPct')">
            <b-input
              v-model="formData.lymphocytesPct"
              name="lymphocytesPct"
              v-validate="'numeric|min_value:0|max_value:100'"
              data-vv-as="lymphocytes (%)" />
          </b-field>

          <b-field label="Monocytes (%)"
            :type="{'is-danger': errors.has('monocytesPct')}"
            :message="errors.first('monocytesPct')">
            <b-input
              v-model="formData.monocytesPct"
              name="monocytesPct"
              v-validate="'numeric|min_value:0|max_value:100'"
              data-vv-as="Monocytes (%)" />
          </b-field>

          <b-field label="FBS/DTX"
            :type="{'is-danger': errors.has('fbs')}"
            :message="errors.first('fbs')">
            <b-input
              v-model="formData.fbs"
              name="fbs"
              v-validate="'numeric|min_value:0'"
              data-vv-as="FBS/DTX" />
          </b-field>

          <b-field label="Hemoglobin A1c"
            :type="{'is-danger': errors.has('hemoglobinA1c')}"
            :message="errors.first('hemoglobinA1c')">
            <b-input
              v-model="formData.hemoglobinA1c"
              name="hemoglobinA1c"
              v-validate="'numeric|min_value:0|max_value:100'"
              data-vv-as="hemoglobin A1c" />
          </b-field>

          <b-field label="Cholesterol"
            :type="{'is-danger': errors.has('cholesterol')}"
            :message="errors.first('cholesterol')">
            <b-input
              v-model="formData.cholesterol"
              name="cholesterol"
              v-validate="'numeric|min_value:0'"
              data-vv-as="cholesterol" />
          </b-field>

          <b-field label="Triglycerides"
            :type="{'is-danger': errors.has('triglycerides')}"
            :message="errors.first('triglycerides')">
            <b-input
              v-model="formData.triglycerides"
              name="triglycerides"
              v-validate="'numeric|min_value:0'"
              data-vv-as="triglycerides" />
          </b-field>

          <b-field label="Creatinine"
            :type="{'is-danger': errors.has('creatinine')}"
            :message="errors.first('creatinine')">
            <b-input
              v-model="formData.creatinine"
              name="creatinine"
              v-validate="'numeric|min_value:0'"
              data-vv-as="creatinine" />
          </b-field>

          <b-field label="eGFR"
            :type="{'is-danger': errors.has('eGFR')}"
            :message="errors.first('eGFR')">
            <b-input
              v-model="formData.eGFR"
              name="eGFR"
              v-validate="'numeric|min_value:0'"
              data-vv-as="eGFR" />
          </b-field>

          <b-field label="AST"
            :type="{'is-danger': errors.has('ast')}"
            :message="errors.first('ast')">
            <b-input
              v-model="formData.ast"
              name="ast"
              v-validate="'numeric|min_value:0'"
              data-vv-as="AST" />
          </b-field>

          <b-field label="ALT"
            :type="{'is-danger': errors.has('alt')}"
            :message="errors.first('alt')">
            <b-input
              v-model="formData.alt"
              name="alt"
              v-validate="'numeric|min_value:0'"
              data-vv-as="ALT" />
          </b-field>

          <b-field label="ALP"
            :type="{'is-danger': errors.has('alp')}"
            :message="errors.first('alp')">
            <b-input
              v-model="formData.alp"
              name="alp"
              v-validate="'numeric|min_value:0'"
              data-vv-as="ALP" />
          </b-field>

          <b-field label="Sodium"
            :type="{'is-danger': errors.has('sodium')}"
            :message="errors.first('sodium')">
            <b-input
              v-model="formData.sodium"
              name="sodium"
              v-validate="'numeric|min_value:0'"
              data-vv-as="sodium" />
          </b-field>

          <b-field label="Potassium"
            :type="{'is-danger': errors.has('potassium')}"
            :message="errors.first('potassium')">
            <b-input
              v-model="formData.potassium"
              name="potassium"
              v-validate="'numeric|min_value:0'"
              data-vv-as="potassium" />
          </b-field>

          <b-field label="Chloride"
            :type="{'is-danger': errors.has('chloride')}"
            :message="errors.first('chloride')">
            <b-input
              v-model="formData.chloride"
              name="chloride"
              v-validate="'numeric|min_value:0'"
              data-vv-as="chloride" />
          </b-field>

          <b-field label="Bicarbonate"
            :type="{'is-danger': errors.has('bicarbonate')}"
            :message="errors.first('bicarbonate')">
            <b-input
              v-model="formData.bicarbonate"
              name="bicarbonate"
              v-validate="'numeric|min_value:0'"
              data-vv-as="bicarbonate" />
          </b-field>

          <b-field label="Phosphate"
            :type="{'is-danger': errors.has('phosphate')}"
            :message="errors.first('phosphate')">
            <b-input
              v-model="formData.phosphate"
              name="phosphate"
              v-validate="'numeric|min_value:0'"
              data-vv-as="phosphate" />
          </b-field>

          <b-field label="Anti-HIV"
            :type="{'is-danger': errors.has('antiHIV')}"
            :message="errors.first('antiHIV')">
            <b-select v-model="formData.antiHIV" name="antiHIV" placeholder="Select an option" data-vv-as="anti-HIV" >
                <option value="">Select an option</option>
                <option value="Inconclusive">Inconclusive</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
            </b-select>
          </b-field>

          <b-field label="HBsAg"
            :type="{'is-danger': errors.has('HBsAg')}"
            :message="errors.first('HBsAg')">
            <b-select v-model="formData.HBsAg" name="HBsAg" placeholder="Select an option" data-vv-as="HBsAg" >
                <option value="">Select an option</option>
                <option value="Inconclusive">Inconclusive</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
            </b-select>
          </b-field>

          <b-field label="Anti-HBs"
            :type="{'is-danger': errors.has('antiHBs')}"
            :message="errors.first('antiHBs')">
            <b-select v-model="formData.antiHBs" name="antiHBs" placeholder="Select an option" data-vv-as="anti-HBs" >
                <option value="">Select an option</option>
                <option value="Inconclusive">Inconclusive</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
            </b-select>
          </b-field>

          <b-field label="Anti-HCV"
            :type="{'is-danger': errors.has('antiHCV')}"
            :message="errors.first('antiHCV')">
            <b-select v-model="formData.antiHCV" name="antiHCV" placeholder="Select an option" data-vv-as="anti-HCV" >
                <option value="">Select an option</option>
                <option value="Inconclusive">Inconclusive</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
            </b-select>
          </b-field>

          <b-field label="TPHA"
            :type="{'is-danger': errors.has('tpha')}"
            :message="errors.first('tpha')">
            <b-select v-model="formData.tpha" name="tpha" placeholder="Select an option" data-vv-as="TPHA" >
                <option value="">Select an option</option>
                <option value="Inconclusive">Inconclusive</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
            </b-select>
          </b-field>

          <b-field label="RPR"
            :type="{'is-danger': errors.has('rpr')}"
            :message="errors.first('rpr')">
            <b-field>
              <p class="control">
                  <span class="button is-static">1:</span>
              </p>
              <b-input
                v-model="formData.rpr"
                name="rpr"
                v-validate="'numeric|min_value:0'"
                expanded
                data-vv-as="rpr" />
            </b-field>
          </b-field>

          <b-field label="Cryptococcal Ag"
            :type="{'is-danger': errors.has('cryptoAg')}"
            :message="errors.first('cryptoAg')">
            <b-select v-model="formData.cryptoAg" name="cryptoAg" placeholder="Select an option" data-vv-as="cryptococcal Ag" >
                <option value="">Select an option</option>
                <option value="Inconclusive">Inconclusive</option>
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
            </b-select>
          </b-field>

          <b-field label="Sputum AFB"
            :type="{'is-danger': errors.has('afb')}"
            :message="errors.first('afb')">
            <b-select v-model="formData.afb" name="afb" placeholder="Select an option" data-vv-as="sputum AFB" >
                <option value="">Select an option</option>
                <option value="Negative">Negative</option>
                <option value="1+">1+</option>
                <option value="2+">2+</option>
                <option value="3+">3+</option>
                <option value="Scanty">Scanty</option>
            </b-select>
          </b-field>

          <b-field label="Sputum GeneXpert"
            :type="{'is-danger': errors.has('geneXpert')}"
            :message="errors.first('geneXpert')">
            <b-select v-model="formData.geneXpert" name="geneXpert" placeholder="Select an option" data-vv-as="sputum GeneXpert" >
                <option value="">Select an option</option>
                <option value="MTB NOT detected">MTB NOT detected</option>
                <option value="MTB detected">MTB detected</option>
            </b-select>
          </b-field>

          <b-field label="Sputum TB Culture"
            :type="{'is-danger': errors.has('tbCulture')}"
            :message="errors.first('tbCulture')">
            <b-input
              v-model="formData.tbCulture"
              name="tbCulture"
              data-vv-as="sputum TB culture" />
          </b-field>

          <b-field label="TB DST"
            :type="{'is-danger': errors.has('dst')}"
            :message="errors.first('dst')">
            <b-input
              v-model="formData.dst"
              name="dst"
              data-vv-as="TB DST" />
          </b-field>

          <b-field label="TB LPA"
            :type="{'is-danger': errors.has('lpa')}"
            :message="errors.first('lpa')">
            <b-input
              v-model="formData.lpa"
              name="lpa"
              data-vv-as="TB LPA" />
          </b-field>

          <b-field label="Tuberculin Skin Test (TST)"
            :type="{'is-danger': errors.has('tst')}"
            :message="errors.first('tst')">
            <b-input
              v-model="formData.tst"
              name="tst"
              v-validate="'numeric|min_value:0'"
              data-vv-as="tuberculin skin test (TST)" />
          </b-field>

          <b-field label="Chest X-Ray"
            :type="{'is-danger': errors.has('chestXRay')}"
            :message="errors.first('chestXRay')">
            <b-input
              v-model="formData.chestXRay"
              name="chestXRay"
              data-vv-as="chest x-ray" />
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
  name: 'PatientInvestigation',
  components: {},
  created () {
    this.setDefault()

    if (this.$route.params.IxID) {
      this.getData()
    }
  },
  methods: {
    setDefault () {
      this.isReady = false

      this.formData = {
        date: null,
        viralLoad: null,
        percentCD4: null,
        absoluteCD4: null,
        hemoglobin: null,
        hematocrit: null,
        whiteBloodCellCount: null,
        neutrophilsPct: null,
        eosinophilsPct: null,
        basophilsPct: null,
        lymphocytesPct: null,
        monocytesPct: null,
        fbs: null,
        hemoglobinA1c: null,
        cholesterol: null,
        triglycerides: null,
        creatinine: null,
        eGFR: null,
        ast: null,
        alt: null,
        alp: null,
        sodium: null,
        potassium: null,
        chloride: null,
        bicarbonate: null,
        phosphate: null,
        antiHIV: null,
        HBsAg: null,
        antiHBs: null,
        antiHCV: null,
        tpha: null,
        rpr: null,
        cryptoAg: null,
        afb: null,
        geneXpert: null,
        tbCulture: null,
        dst: null,
        lpa: null,
        tst: null,
        chestXRay: null
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
        let url = self.$config['APIPath'] + '/patient/' + self.$route.params.id + '/investigations/' + self.$route.params.IxID
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
      let url = this.$config['APIPath'] + '/patient/' + this.$route.params.id + '/investigations'
      let httpMethod = 'post'

      if (this.$route.params.IxID) {
        httpMethod = 'patch'
        url = url + '/' + this.$route.params.IxID
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
              if (key === '_schema') {
                let fieldKeys = Object.keys(self.formData)

                self.$_.forEach(fieldKeys, function (fieldKey) {
                  self.$validator.errors.add({
                    field: fieldKey,
                    msg: value,
                    rule: 'backend'
                  })
                })

                return false
              }

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
