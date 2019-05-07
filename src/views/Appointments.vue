<template>
<section>
    <p class="title is-4">Appointments</p>
    <p class="subtitle is-6">View appointments and patients visited on a particular day.</p>

    <div class="columns">
        <div class="column is-narrow">
            <p class="subtitle is-6">Select a date</p>
            <b-datepicker
                inline
                v-model="date"
            />
        </div>

        <div class="column">
            <div class="columns table-section">
                <div class="column">
                  <div class="level">
                    <div class="level-left">
                      <p class="title is-6 is-grouped">Appointments</p>
                    </div>
                    <div class="level-right">
                      <b-field grouped group-multiline position="level-item">
                          <b-select v-model="appointmentsPerPage">
                              <option value="5">5 per page</option>
                              <option value="10">10 per page</option>
                              <option value="25">25 per page</option>
                              <option value="50">50 per page</option>
                          </b-select>
                      </b-field>
                    </div>
                  </div>

                  <!-- table -->
                  <b-table
                      class="table"

                      :hoverable="true"
                      :mobile-cards="true"
                      :striped="true"

                      :default-sort-direction="defaultSortDirection"
                      default-sort="data.clinicID"

                      :data="appointments"
                      :loading="isFetching"

                      paginated
                      :total="appointments ? appointments.length : 0"
                      :per-page="appointmentsPerPage"
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
                          <b-table-column field="clinicID" label="Clinic ID" sortable>
                          {{ props.row.patient.clinicID }}
                          </b-table-column>

                          <b-table-column field="hn" label="HN" sortable>
                          {{ props.row.patient.hn }}
                          </b-table-column>

                          <b-table-column field="name" label="Name" sortable>
                          {{ props.row.patient.name }}
                          </b-table-column>

                          <b-table-column field="name" label="Appointment" sortable>
                          {{ props.row.appointmentFor }}
                          </b-table-column>

                          <b-table-column field="id">
                          <a @click="goToPatient(props.row.patient.id)">
                              <b-icon icon="open-in-new" size="is-small"/>
                          </a>
                          </b-table-column>

                      </template>
                  </b-table>
                  <!-- /table -->
                </div>
            </div>

            <div class="columns table-section">
                <div class="column">
                  <div class="level">
                    <div class="level-left">
                      <p class="title is-6 is-grouped">Visits</p>
                    </div>
                    <div class="level-right">
                      <b-field grouped group-multiline position="level-item">
                          <b-select v-model="visitsPerPage">
                              <option value="5">5 per page</option>
                              <option value="10">10 per page</option>
                              <option value="25">25 per page</option>
                              <option value="50">50 per page</option>
                          </b-select>
                      </b-field>
                    </div>
                  </div>

                  <!-- table -->
                  <b-table
                      class="table"

                      :hoverable="true"
                      :mobile-cards="true"
                      :striped="true"

                      :default-sort-direction="defaultSortDirection"
                      default-sort="data.clinicID"

                      :data="visits"
                      :loading="isFetching"

                      paginated
                      :total="visits ? visits.length : 0"
                      :per-page="visitsPerPage"
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
                          <b-table-column field="clinicID" label="Clinic ID" sortable>
                          {{ props.row.clinicID }}
                          </b-table-column>

                          <b-table-column field="hn" label="HN" sortable>
                          {{ props.row.hn }}
                          </b-table-column>

                          <b-table-column field="name" label="Name" sortable>
                          {{ props.row.name }}
                          </b-table-column>

                          <b-table-column field="id">
                          <a @click="goToPatient(props.row.id)">
                              <b-icon icon="open-in-new" size="is-small"/>
                          </a>
                          </b-table-column>

                      </template>
                  </b-table>
                  <!-- /table -->
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import fetchData from '@/utils/http/fetchData.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'

export default {
  name: 'Appointments',
  watch: {
    'date': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getData()
      }
    }
  },
  mounted () {
    this.date = this.$moment().toDate()
    this.getData()
  },
  methods: {
    goToPatient (id) {
      this.$router.push({
        name: 'PatientSummary',
        params: {
          id: id
        }
      })
    },
    async getData () {
      let self = this
      let isodate = this.$moment(self.date).format('YYYY-MM-DD')
      let appointmentURL = this.$config['APIPath'] + '/patient/appointment/' + isodate
      let visitURL = this.$config['APIPath'] + '/patient/visit/' + isodate

      self.isFetching = true

      try {
        let appointmentResponse = await fetchData(appointmentURL)
        let visitResponse = await fetchData(visitURL)

        self.appointments = appointmentResponse.data
        self.visits = visitResponse.data
      } catch {
        self.appointments = []
        self.visits = []

        commonErrorToast()
      } finally {
        self.isFetching = false
      }
    }
  },
  created () {
    this.getData = this.$_.debounce(this.getData, this.$config['globalDebounceWait'])
  },
  data () {
    return {
      date: null,

      appointments: [],
      visits: [],

      isFetching: false,

      appointmentsPerPage: 10,
      visitsPerPage: 10,

      defaultSortDirection: 'asc'
    }
  }
}
</script>

<style scoped>
.table {
  padding: 0.1rem !important;
}

.table-section {
  padding-bottom: 1rem;
}
</style>
