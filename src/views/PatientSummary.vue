<template>
<section v-if="patientData.id">
    <p class="title is-4">HN {{ patientData['hn'] ? patientData['hn'] : '' }}</p>
    <p class="subtitle is-6">Medical summary</p>

    <!-- top notifications -->
    <div class="columns is-multiline top-notification">
      <!-- cd4 -->
      <div class="column">
        <div class="box noti-box notification is-primary">
          <div class="heading">
            Last CD4 {{
              lastCD4.date
              ? 'On ' + $moment(lastCD4.date).format('l')
              : ''
            }}
          </div>
          <div class="title">{{
            lastCD4.absoluteCD4
            ? lastCD4.absoluteCD4
            : '-'
          }}{{
            lastCD4.percentCD4
            ? ' / ' + lastCD4.percentCD4 + '%'
            : ''
          }}</div>
        </div>
      </div>
      <!-- /cd4 -->

      <!-- vl -->
      <div class="column">
        <div class="box noti-box notification is-warning">
          <div class="heading">
            Last VL {{
              lastVL.date
              ? 'On ' + $moment(lastVL.date).format('l')
              : ''
            }}
          </div>
          <div class="title">{{
            lastVL.viralLoad === 0
            ? 'Undetectable'
            : (
              lastVL.viralLoad
              ? lastVL.viralLoad 
              : '-'
            )
          }}</div>
        </div>
      </div>
      <!-- vl -->

      <!-- cr, egfr -->
      <div class="column">
        <div class="box noti-box notification is-info">
          <div class="heading">
            Last Cr / GFR {{
              lastCr.date
              ? 'On ' + $moment(lastCr.date).format('l')
              : ''
            }}
          </div>
          <div class="title">{{
            lastCr.creatinine
            ? lastCr.creatinine
            : '-'
          }}{{
            lastCr.eGFR
            ? ' / ' + lastCr.eGFR
            : ''
          }}</div>

        </div>
      </div>
      <!-- /cr, egfr -->

      <!-- hct, hb -->
      <div class="column">
        <div class="box noti-box notification is-danger">
          <div class="heading">
            Last Hb / Hct {{
              lastHb.date
              ? 'On ' + $moment(lastHb.date).format('l')
              : ''
            }}
          </div>
          <div class="title">{{
            lastHb.hemoglobin
            ? lastHb.hemoglobin
            : '-'
          }}{{
            lastHb.hematocrit
            ? ' / ' + lastHb.hematocrit + '%'
            : ''
          }}</div>

        </div>
      </div>
      <!-- /hct, hb -->

    </div>
    <!-- /top notifications -->

    <!-- dermographic -->
    <div class="columns">
      <div class="column">
        <p class="title is-5">Dermographic Information</p>

        <!-- incomplete data waring -->
        <b-notification type="is-warning" v-if="dermograpgicAlerts">
          <p><b>Please enter the misssing information:</b> {{ dermograpgicAlerts }}.</p>
        </b-notification>
        <!-- /incomplete data waring -->

        <b-field grouped group-multiline class="is-grouped-right">
          <div class="control">
            <a class="button is-link">Add Patient's Partner</a>
          </div>

          <div class="control">
            <router-link
              class="button is-link"
              :to="{ name: 'PatientDermographic', params: { id: patientData.id }}">
              Edit Patient Information
            </router-link>
          </div>
        </b-field>

        <div class="bd-content">
          <table class="table is-striped is-narrow is-hoverable is-fullwidth">
            <tbody>
              <tr>
                <th class="rowHeader" rowspan="4">IDs</th>
                <td class="secondaryRowHeader"><b>Clinic ID</b></td>
                <td>{{ patientData.clinicID ? patientData.clinicID : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>HN</b></td>
                <td>{{ patientData.hn ? patientData.hn : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Government ID</b></td>
                <td>{{ patientData.governmentID ? patientData.governmentID : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>NAP ID</b></td>
                <td>{{ patientData.napID ? patientData.napID : '-' }}</td>
              </tr>

              <tr>
                <th class="rowHeader" rowspan="11">Demographics</th>
                <td class="secondaryRowHeader"><b>Name</b></td>
                <td>{{ patientData.name ? patientData.name : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>DOB</b></td>
                <td>{{ $moment(patientData.dateOfBirth).isValid() ? $moment(patientData.dateOfBirth).format('LL') : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Age</b></td>
                <td>{{ $moment(patientData.dateOfBirth).isValid() ? $moment(patientData.dateOfBirth).fromNow(true) : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Sex</b></td>
                <td>{{ patientData.sex ? patientData.sex : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Gender</b></td>
                <td>{{ patientData.gender ? patientData.gender : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Marital Status</b></td>
                <td>{{ patientData.maritalStatus ? patientData.maritalStatus : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Nationality</b></td>
                <td>{{ patientData.nationality ? patientData.nationality : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Education</b></td>
                <td>{{ patientData.educationLevel ? patientData.educationLevel : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Healthcare Scheme</b></td>
                <td>{{ patientData.healthInsurance ? patientData.healthInsurance : '-' }}</td>
              </tr>
              <!-- reformat this line -->
              <!-- <tr>
                <td class="secondaryRowHeader"><b>Home Address</b></td>
                <td>{{ patientData.address ? patientData.address : '-' }}</td>
              </tr> -->
              <tr>
                <td class="secondaryRowHeader"><b>Phone Numbers</b></td>
                <td>
                  <span
                    v-html="arrayToTableString(patientData.phoneNumbers)"
                  />
                </td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Relative's Phone Numbers</b></td>
                <td>
                  <span
                    v-html="arrayToTableString(patientData.relativePhoneNumbers)"
                  />
                </td>
              </tr>
              <tr>
                <th class="rowHeader" rowspan="4">Referral &amp; F/U Infomation</th>
                <td class="secondaryRowHeader"><b>Referral Status</b></td>
                <td>{{ patientData.referralStatus ? patientData.referralStatus : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Referred From</b></td>
                <td>{{ patientData.referredFrom ? patientData.referredFrom : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Follow Up Status</b></td>
                <td>{{ patientData.patientStatus ? patientData.patientStatus : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Referred Out To</b></td>
                <td>{{ patientData.referralStatus ? patientData.referredOutTo : '-' }}</td>
              </tr>
              <tr>
                <th class="rowHeader" rowspan="1">HIV Transmission Assessments</th>
                <td class="secondaryRowHeader"><b>Risk Behaviors</b></td>
                <td>
                  <span
                    v-html="arrayToTableString(patientData.riskBehaviors)"
                  />
                </td>
              </tr>
            </tbody>

            <!-- partner table -->
            <tbody
              v-for="(partner, index) in patientData.partners"
              v-bind:key="index"
            >
              <tr>
                <th class="rowHeader" rowspan="7">Partner #{{index}}</th>
                <td class="secondaryRowHeader"><b>Deceased?</b></td>
                <td>{{ partner.deceased ? partner.deceased : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Gender</b></td>
                <td>{{ partner.gender ? partner.gender : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>HIV Status</b></td>
                <td>{{ partner.HIVStatus ? partner.HIVStatus : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Patient's HIV Status Disclosure</b></td>
                <td>{{ partner.PatientHIVStatusDisclosure ? partner.PatientHIVStatusDisclosure : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>HIV Treatment / Prevention</b></td>
                <td>{{ partner.HIVTreatmentOrPrevention ? partner.HIVTreatmentOrPrevention : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>Name of Clinic Attend</b></td>
                <td>{{ partner.clinicAttend ? partner.clinicAttend : '-' }}</td>
              </tr>
              <tr>
                <td class="secondaryRowHeader"><b>HN</b></td>
                <td>{{ partner.hn ? partner.hn : '-' }}</td>
              </tr>
            </tbody>

          </table>
        </div>

      </div>
    </div>
    <!-- /dermographic -->

    <!-- /visit -->
    <div class="columns">
      <div class="column">
        <p class="title is-5">Visits</p>

        <!-- incomplete data waring -->
        <b-notification type="is-warning" v-if="isLastFUMoreThanLimit">
          <p><b>Last visit was more than {{ $config.overdueFUMonths }} months ago!</b></p>
        </b-notification>
        <!-- /incomplete data waring -->

        <b-field grouped group-multiline class="is-grouped-right">
          <div class="control">
            <router-link
              class="button is-link"
              :to="{ name: 'PatientVisit', params: { id: patientData.id }}">
              Add New Visit
            </router-link>
          </div>

          <b-select v-model="visitPerPage">
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
          </b-select>
        </b-field>

        <!-- investigation table -->
        <b-table
            class="table"

            :hoverable="true"
            :mobile-cards="true"
            :striped="true"
            :narrowed="true"

            :data="patientData['visits'] ? patientData['visits'] : []"
            :loading="isFetching"

            paginated
            :total="patientData['visits'] ? patientData['visits'].length : 0"
            :per-page="visitPerPage"

            :size="'is-small'"
        >

            <!-- empty -->
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                              icon="emoticon-sad"
                              size="is-large"
                            >
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
            <!-- /empty -->

            <template slot-scope="props">
              <b-table-column field="date" label="Date" sortable>
              {{ $moment(props.row.date, $config["APIDateFormat"]).format('l') }}
              </b-table-column>

              <b-table-column field="bodyWeight" label="BW (kg)">
              {{ props.row.bodyWeight ? props.row.bodyWeight : '-' }}
              </b-table-column>

              <b-table-column field="historyOfContactWithTB" label="Contact TB?">
              {{ props.row.historyOfContactWithTB ? props.row.historyOfContactWithTB : '-' }}
              </b-table-column>

              <b-table-column field="ARTAdherenceScale" label="ART Adherence">
              {{ props.row.ARTAdherenceScale ? props.row.ARTAdherenceScale + '%' : '-' }}
              </b-table-column>

              <b-table-column field="ARTAvgDelayedDosing" label="ARV Delayed Dosing">
              {{ props.row.ARTAdherenceScale ? props.row.ARTAdherenceScale + ' min' : '-' }}
              </b-table-column>

              <b-table-column field="ARTAdherenceProblem" label="Adherence Problems">
              {{ props.row.ARTAdherenceProblem ? props.row.ARTAdherenceProblem : '-' }}
              </b-table-column>

              <b-table-column field="impression" label="Impressions">
                <span
                  v-html="arrayToTableString(props.row.impression)"
                />
              </b-table-column>

              <b-table-column field="arvMedications" label="ARV">
                <span
                  v-html="arrayToTableString(props.row.arvMedications)"
                />
              </b-table-column>

              <b-table-column field="whySwitchingARV" label="ARV Switch?">
              {{ props.row.whySwitchingARV ? props.row.whySwitchingARV : '-' }}
              </b-table-column>

              <b-table-column field="tbMedications" label="Anti-TB Drugs">
                <span
                  v-html="arrayToTableString(props.row.tbMedications)"
                />
              </b-table-column>

              <b-table-column field="oiMedications" label="OI Drugs">
                <span
                  v-html="arrayToTableString(props.row.oiMedications)"
                />
              </b-table-column>

              <b-table-column field="medications" label="All Prescription Medicaments">
                <span
                  v-html="arrayToTableString(props.row.medications)"
                />
              </b-table-column>

              <b-table-column field="id">
                <a
                  class="is-pulled-right"
                  @click="goToSubcollection(
                    'PatientVisit',
                    {
                      id: $route.params.id,
                      visitID: props.row.id
                    }
                  )">
                  <b-icon icon="open-in-new" size="is-small"/>
                </a>
              </b-table-column>
            </template>
        </b-table>
        <!-- /investigation table -->

      </div>
    </div>
    <!-- /visit -->

    <!-- investigation -->
    <div class="columns">
      <div class="column">
        <p class="title is-5">Investigation</p>

        <!-- incomplete data waring -->
        <b-notification type="is-warning" v-if="isLastVLMoreThanLimit">
          <p><b>Viral load result is more than {{ $config.overdueVLMonths }} months old!</b></p>
        </b-notification>
        <!-- /incomplete data waring -->

        <b-field grouped group-multiline position="is-right">
          <div class="control">
            <router-link
              class="button is-link"
              :to="{ name: 'PatientInvestigation', params: { id: patientData.id }}">
              Add New Investigation
            </router-link>
          </div>

          <b-select v-model="investigationsPerPage">
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
          </b-select>
        </b-field>

        <!-- investigation table -->
        <b-table
          class="table"

          :hoverable="true"
          :mobile-cards="true"
          :striped="true"
          :narrowed="true"

          :data="patientData['investigations'] ? patientData['investigations'] : []"
          :loading="isFetching"

          paginated
          :total="patientData['investigations'] ? patientData['investigations'].length : 0"
          :per-page="investigationsPerPage"

          :size="'is-small'"
        >
          <!-- empty -->
          <template slot="empty">
              <section class="section">
                  <div class="content has-text-grey has-text-centered">
                      <p>
                          <b-icon
                              icon="emoticon-sad"
                              size="is-large">
                          </b-icon>
                      </p>
                      <p>Nothing here.</p>
                  </div>
              </section>
          </template>
          <!-- /empty -->

          <template slot-scope="props">
              <b-table-column field="date" label="Date" sortable>
              {{ $moment(props.row.date, $config["APIDateFormat"]).format('l') }}
              </b-table-column>

              <b-table-column field="viralLoad" label="VL">
              {{ props.row.viralLoad === 0 ? 'Undetectable' : (props.row.viralLoad ? props.row.viralLoad : '-') }}
              </b-table-column>

              <b-table-column field="absoluteCD4" label="CD4">
              {{ props.row.absoluteCD4 ? props.row.absoluteCD4 : '-' }}
              </b-table-column>

              <b-table-column field="percentCD4" label="%CD4">
              {{ props.row.percentCD4 ? props.row.percentCD4 : '-' }}
              </b-table-column>

              <b-table-column field="cbc" label="CBC">
                <span
                  v-html="cbcFormat(props.row)"
                />
              </b-table-column>

              <b-table-column field="creatinine" label="Cr/eGFR">
                <span
                  v-html="labFormat(props.row, kidneyLabs)"
                />
              </b-table-column>

              <b-table-column field="fbs" label="FBS/HbA1c">
                <span
                  v-html="labFormat(props.row, DMLabs)"
                />
              </b-table-column>

              <b-table-column field="cholesterol" label="Lipid Profile">
                <span
                  v-html="labFormat(props.row, lipidLabs)"
                />
              </b-table-column>

              <b-table-column field="liver" label="Liver Enzymes">
                <span
                  v-html="labFormat(props.row, liverLabs)"
                />
              </b-table-column>

              <b-table-column field="phosphate" label="Electrolytes">
                <span
                  v-html="labFormat(props.row, elyteLabs)"
                />
              </b-table-column>

              <b-table-column field="serology" label="Serology">
                <span
                  v-html="serologyFormat(props.row)"
                />
              </b-table-column>

              <b-table-column field="tb" label="TB">
                <span
                  v-html="labFormat(props.row, TBLabs)"
                />
              </b-table-column>

              <b-table-column field="id">
                <a
                  class="is-pulled-right"
                  @click="goToSubcollection(
                    'PatientInvestigation',
                    {
                      id: $route.params.id,
                      IxID: props.row.id
                    }
                  )">
                  <b-icon icon="open-in-new" size="is-small"/>
                </a>
              </b-table-column>

          </template>
        </b-table>
        <!-- /investigation table -->

      </div>
    </div>
    <!-- /investigation -->

    <!-- appointment -->
    <div class="columns">
      <div class="column">
        <p class="title is-5">Appointments</p>

        <b-field grouped group-multiline position="is-right">
          <div class="control">
            <router-link
              class="button is-link"
              :to="{ name: 'PatientAppointment', params: { id: patientData.id }}">
              Add New Appointment
            </router-link>
          </div>

          <b-select v-model="appointmentsPerPage">
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
          </b-select>
        </b-field>

        <!-- Appointment table -->
        <b-table
            class="table"

            :hoverable="true"
            :mobile-cards="true"
            :striped="true"
            :narrowed="true"

            :data="patientData['appointments'] ? patientData['appointments'] : []"
            :loading="isFetching"

            paginated
            :total="patientData['appointments'] ? patientData['appointments'].length : 0"
            :per-page="appointmentsPerPage"

            :size="'is-small'"
        >

            <!-- empty -->
            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
            <!-- /empty -->

            <template slot-scope="props">
                <b-table-column field="date" label="Appointment Date" sortable>
                {{ $moment(props.row.date, $config["APIDateFormat"]).format('l') }}
                </b-table-column>

                <b-table-column field="appointmentFor" label="For" sortable>
                {{ props.row.appointmentFor }}
                </b-table-column>

                <b-table-column field="id">
                  <a
                    class="is-pulled-right"
                    @click="goToSubcollection(
                      'PatientAppointment',
                      {
                        id: $route.params.id,
                        appointmentID: props.row.id
                      }
                    )">
                    <b-icon icon="open-in-new" size="is-small"/>
                  </a>
                </b-table-column>
            </template>
        </b-table>
        <!-- /Appointment table -->
      </div>
    </div>
    <!-- /appointment -->

</section>
</template>

<script>
import fetchData from '@/utils/http/fetchData.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'
import displayDermographicAlerts from '@/utils/ui/displayDermographicAlerts.js'

export default {
  name: 'PatientSummary',
  mounted () {
    this.getData()
  },
  watch: {
    '$route.params.id': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getData()
      }
    }
  },
  methods: {
    goToSubcollection (routeName, params) {
      this.$router.push({
        name: routeName,
        params: params
      })
    },
    findLastestLabs () {
      let self = this

      // find last FU
      if (Array.isArray(this.patientData.visits)) {
        let lastVisit = this.patientData.visits.slice(1)[0]

        if (lastVisit) {
          self.lastFU = lastVisit.date
        } else {
          self.lastFU = null
        }
      }

      // find last labs
      this.$_.forEach(this.patientData.investigations, function (item) {
        if (item.absoluteCD4 !== null && !self.lastCD4.date) {
          self.lastCD4['date'] = item.date
          self.lastCD4['absoluteCD4'] = item.absoluteCD4
          self.lastCD4['percentCD4'] = item.percentCD4
        }

        if (item.viralLoad !== null && !self.lastVL['date']) {
          self.lastVL['date'] = item.date
          self.lastVL['viralLoad'] = item.viralLoad
        }

        if (item.creatinine !== null && !self.lastCr['date']) {
          self.lastCr['date'] = item.date
          self.lastCr['creatinine'] = item.creatinine
          self.lastCr['eGFR'] = item.eGFR
        }

        if (item.hemoglobin !== null && !self.lastHb['date']) {
          self.lastHb['date'] = item.date
          self.lastHb['hemoglobin'] = item.hemoglobin
          self.lastHb['hematocrit'] = item.hematocrit
        }

        if (
          self.lastCD4.date &&
          self.lastVL.date &&
          self.lastCr.date &&
          self.lastHb.date
        ) {
          return false
        }
      })
    },
    async getData () {
      let self = this
      self.isFetching = true

      try {
        let url = self.$config['APIPath'] + '/patient/' + self.$route.params.id
        let response = await fetchData(url)
        self.patientData = response.data

        self.findLastestLabs()
      } catch (error) {
        console.error(error)
        self.patientData = {}

        self.lastCD4 = {}
        self.lastVL = {}
        self.lastCr = {}
        self.lastHb = {}

        commonErrorToast()
      } finally {
        self.isFetching = false
      }
    },
    cbcFormat (row) {
      if (!row.hemoglobin) {
        return '-'
      }

      let cbc = (
        `Hb: ${row.hemoglobin}, Hct: ${row.hematocrit}%<br />` +
        `WBC: ${row.whiteBloodCellCount} (x1000)<br />` +
        `N: ${row.neutrophilsPct}%, L: ${row.lymphocytesPct}%<br />` +
        `Eo: ${row.eosinophilsPct}%, Ba: ${row.basophilsPct}%<br />` +
        `Mono: ${row.monocytesPct}%`
      )

      return cbc
    },
    serologyFormat (row) {
      let serology = ''

      serology += row.antiHIV ? `AntiHIV: ${row.antiHIV}:::` : ''
      serology += row.HBsAg ? `HBsAg: ${row.HBsAg}:::` : ''
      serology += row.antiHBs ? `Anti-HBs: ${row.antiHBs}:::` : ''
      serology += row.antiHCV ? `Anti-HCV: ${row.antiHCV}:::` : ''
      serology += row.tpha ? `TPHA: ${row.tpha}:::` : ''
      serology += row.rpr ? `RPR: 1:${row.rpr}:::` : ''
      serology += row.cryptoAg ? `CryptoAg: ${row.cryptoAg}:::` : ''

      if (serology !== '') {
        let splitedStr = serology.split(':::')
        splitedStr.pop()
        splitedStr = splitedStr.sort()
        serology = splitedStr.join('<br />')
      } else {
        serology = '-'
      }

      return serology
    },
    labFormat (rowData, fieldsArray) {
      let labString = ''

      this.$_.forEach(fieldsArray, function (fieldsArray) {
        labString += rowData[fieldsArray.fieldKey] ? `${fieldsArray.fieldName}: ${rowData[fieldsArray.fieldKey]}:::` : ''
      })

      if (labString !== '') {
        let splitedStr = labString.split(':::')
        splitedStr.pop()
        splitedStr = splitedStr.sort()
        labString = splitedStr.join('<br />')
      } else {
        labString = '-'
      }

      return labString
    },
    arrayToTableString (arrayInput) {
      let tableString = ''

      this.$_.forEach(arrayInput, function (value) {
        tableString += value ? `${value}:::` : ''
      })

      if (tableString !== '') {
        let splitedStr = tableString.split(':::')
        splitedStr.pop()
        splitedStr = splitedStr.sort()
        tableString = splitedStr.join('<br />')
      } else {
        tableString = '-'
      }

      return tableString
    }
  },
  computed: {
    dermograpgicAlerts: function () {
      return displayDermographicAlerts(this.patientData)
    },
    isLastVLMoreThanLimit: function () {
      let lastVLMoment = this.$moment(this.lastVL['date'])
      let todayMoment = this.$moment()

      if (lastVLMoment.isValid()) {
        return todayMoment.diff(lastVLMoment, 'month') > this.$config.overdueVLMonths
      } else {
        return null
      }
    },
    isLastFUMoreThanLimit: function () {
      let lastFUMoment = this.$moment(this.lastFU)
      let todayMoment = this.$moment()

      if (lastFUMoment.isValid()) {
        return todayMoment.diff(lastFUMoment, 'month') > this.$config.overdueFUMonths
      } else {
        return null
      }
    }
  },
  created () {
    this.getData = this.$_.debounce(this.getData, this.$config['globalDebounceWait'])
  },
  data: () => {
    return {
      isFetching: false,
      defaultSortDirection: 'asc',

      // patient data
      patientData: {},

      // tables options
      appointmentsPerPage: 5,
      investigationsPerPage: 5,
      visitPerPage: 5,

      // lastFU
      lastFU: null,

      // top boxes data
      lastCD4: {},
      lastVL: {},
      lastCr: {},
      lastHb: {},

      // labs fields
      kidneyLabs: [
        {
          fieldKey: 'creatinine',
          fieldName: 'Cr'
        },
        {
          fieldKey: 'eGFR',
          fieldName: 'eGFR'
        }
      ],
      DMLabs: [
        {
          fieldKey: 'fbs',
          fieldName: 'FBS'
        },
        {
          fieldKey: 'hemoglobinA1c',
          fieldName: 'HbA1c'
        }
      ],
      lipidLabs: [
        {
          fieldKey: 'cholesterol',
          fieldName: 'Chol'
        },
        {
          fieldKey: 'triglycerides',
          fieldName: 'TG'
        }
      ],
      liverLabs: [
        {
          fieldKey: 'ast',
          fieldName: 'AST'
        },
        {
          fieldKey: 'alt',
          fieldName: 'ALT'
        },
        {
          fieldKey: 'alp',
          fieldName: 'ALP'
        }
      ],
      elyteLabs: [
        {
          fieldKey: 'sodium',
          fieldName: 'Na'
        },
        {
          fieldKey: 'potassium',
          fieldName: 'K'
        },
        {
          fieldKey: 'chloride',
          fieldName: 'Cl'
        },
        {
          fieldKey: 'bicarbonate',
          fieldName: 'HCO3'
        },
        {
          fieldKey: 'phosphate',
          fieldName: 'PO4'
        }
      ],
      TBLabs: [
        {
          fieldKey: 'afb',
          fieldName: 'AFB'
        },
        {
          fieldKey: 'geneXpert',
          fieldName: 'GeneXpert'
        },
        {
          fieldKey: 'tbCulture',
          fieldName: 'C/S'
        },
        {
          fieldKey: 'dst',
          fieldName: 'DST'
        },
        {
          fieldKey: 'lpa',
          fieldName: 'LPA'
        },
        {
          fieldKey: 'tst',
          fieldName: 'TST (mm)'
        },
        {
          fieldKey: 'chestXRay',
          fieldName: 'CXR'
        }
      ]
    }
  }
}
</script>

<style scoped>
.columns {
  padding-bottom: 0.5rem !important;
}

.chart-wrapper {
  width: 100%;
  margin: 0.5rem auto;
}

.table {
  font-size: small !important;
  padding: 0.1rem !important;
}

td {
  vertical-align: top;
  text-align: left;
}

.rowHeader {
  max-width: 2rem !important;
}

.secondaryRowHeader{
  max-width: 3rem !important;
}

.noti-box .spark-chart {
  height: 5rem;
}

.spark-chart {
  width: 100%;
  margin: 0.25rem;
}
</style>
