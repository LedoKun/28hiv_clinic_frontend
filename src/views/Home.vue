<template>
<section>
    <p class="title is-4">Dashboard</p>

    <!-- top notifications -->
    <div class="columns is-multiline top-notification" v-if="dashboardData">
      <!-- number of patients -->
      <div class="column">
        <div class="box dashboard-box notification is-primary">
          <div class="heading">Patients</div>
          <div class="title">{{ dashboardData.patientCount }}</div>
          <div class="level">
            <div class="level-item">
              <div class="">
                <div class="heading">UC</div>
                <div class="title is-5">{{ dashboardData['healthcareSchemeCount']['uc'] }}</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">SSS</div>
                <div class="title is-5">{{ dashboardData['healthcareSchemeCount']['sss'] }}</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">GOV</div>
                <div class="title is-5">{{ dashboardData['healthcareSchemeCount']['gov'] }}</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Pay/None</div>
                <div class="title is-5">{{ dashboardData['healthcareSchemeCount']['pay'] }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /number of patients -->

      <!-- examined and appointments -->
      <div class="column">
        <div class="box dashboard-box notification is-warning">
          <div class="heading">Examined / Appointments</div>
          <div class="title">{{ dashboardData.examinedCount }} / {{ appointments.length }}</div>
          <div class="level">
            <div class="level-item">
              <div class="">
                <div class="heading">Old</div>
                <div class="title is-5">
                  {{
                  (dashboardData.examinedCount - dashboardData.newPatientCount) > 0
                  ? (dashboardData.examinedCount - dashboardData.newPatientCount)
                  : 0
                  }}
                  </div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">New</div>
                <div class="title is-5">{{ dashboardData.newPatientCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /examined and appointments -->

      <!-- labs for than 6 months -->
      <div class="column">
        <div class="box dashboard-box notification is-info">
          <div class="heading">Last VL Lab &gt; 1Y</div>
          <div class="title">{{ dashboardData.overdueVL.length }}</div>
        </div>
      </div>
      <!-- /labs for than 6 months -->

      <!-- last visit for more than 6 months -->
      <div class="column">
        <div class="box dashboard-box notification is-danger">
          <div class="heading">Last F/U &gt; 1Y</div>
          <div class="title">{{ dashboardData.overdueFU.length }}</div>
        </div>
      </div>
      <!-- last visit for more than 6 months -->
    </div>
    <!-- /top notifications -->

    <!-- Appointments -->
    <p class="title is-5">Today Appointments</p>
    <div class="columns is-multiline table-padding">
      <div class="column">
        <!-- table -->
        <b-table
            class="table"

            :hoverable="true"
            :mobile-cards="true"
            :striped="true"

            :default-sort-direction="defaultSortDirection"
            default-sort="data.clinicID"

            :data="appointments"
            :loading="isFetchingAppointments"

            paginated
            :total="appointments ? appointments.length : 0"
            :per-page="itemsPerPage"
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
    <!-- /Appointments -->

    <!-- Overdue Investigations -->
    <p class="title is-5">Last Viral Load Investigation &gt; 1 Year</p>
    <div class="columns is-multiline table-padding">
        <div class="column">
          <!-- table -->
          <b-table
              class="table"

              :hoverable="true"
              :mobile-cards="true"
              :striped="true"

              :default-sort-direction="defaultSortDirection"
              default-sort="data.clinicID"

              :data="dashboardData.overdueVL ? dashboardData.overdueVL : []"
              :loading="isFetchingDashboardData"

              paginated
              :total="dashboardData.overdueVL ? dashboardData.overdueVL.length : 0"
              :per-page="itemsPerPage"
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

                  <b-table-column field="last_lab_date" label="Last VL Lab On" sortable>
                  {{ $moment(props.row.last_lab_date, $config["APIDateFormat"]).format('LL') }}
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
    <!-- /Overdue Investigations -->

    <!-- Overdue Follow Up Visits -->
    <p class="title is-5">Last F/U &gt; 1 Year</p>
    <div class="columns is-multiline table-padding">
        <div class="column">
          <!-- table -->
          <b-table
              class="table"

              :hoverable="true"
              :mobile-cards="true"
              :striped="true"

              :default-sort-direction="defaultSortDirection"
              default-sort="data.clinicID"

              :data="dashboardData.overdueFU ? dashboardData.overdueFU : []"
              :loading="isFetchingDashboardData"

              paginated
              :total="dashboardData.overdueFU ? dashboardData.overdueFU.length : 0"
              :per-page="itemsPerPage"
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

                  <b-table-column field="last_fu_date" label="Last F/U On" sortable>
                  {{ $moment(props.row.last_fu_date, $config["APIDateFormat"]).format('LL') }}
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
    <!-- /Overdue Follow Up Visits -->

    <!-- Incomplete Data -->
    <p class="title is-5">Incomplete Data</p>
    <div class="columns is-multiline table-padding">
        <div class="column">
          <!-- table -->
          <b-table
              class="table"

              :hoverable="true"
              :mobile-cards="true"
              :striped="true"

              :default-sort-direction="defaultSortDirection"
              default-sort="data.clinicID"

              :data="appointments"
              :loading="isFetchingAppointments"

              paginated
              :total="appointments ? appointments.length : 0"
              :per-page="itemsPerPage"
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
    <!-- /Incomplete Data -->

</section>
</template>

<script>
import fetchData from '@/utils/http/fetchData.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'

export default {
  name: 'home',
  components: {
  },
  mounted () {
    this.date = this.$moment().toDate()
    this.fetchDashboardData()
    this.fetchAppointments()
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
    async fetchAppointments () {
      this.isFetchingAppointments = true

      try {
        let isodate = this.$moment(self.date).format('YYYY-MM-DD')
        let url = this.$config['APIPath'] + '/patient/appointment/' + isodate

        let response = await fetchData(url)

        this.appointments = response.data
      } catch {
        this.appointments = []
        commonErrorToast()
      } finally {
        this.isFetchingAppointments = false
      }
    },
    async fetchDashboardData () {
      this.isFetchingDashboardData = true

      try {
        let url = this.$config['APIPath'] + '/statistics/dashboard'

        let response = await fetchData(url)

        this.dashboardData = response.data
      } catch {
        this.dashboardData = []
        commonErrorToast()
      } finally {
        this.isFetchingDashboardData = false
      }
    }
  },
  data () {
    return {
      appointments: [],
      isFetchingAppointments: false,
      defaultSortDirection: 'asc',
      date: null,

      itemsPerPage: 10,

      isFetchingDashboardData: false,

      // default data
      dashboardData: {
        'patientCount': 0,
        'healthcareSchemeCount': {
          'pay': 0,
          'uc': 0,
          'sss': 0,
          'gov': 0
        },
        'examinedCount': 0,
        'newPatientCount': 0,
        'overdueVL': [],
        'overdueFU': []
      }
    }
  }
}
</script>

<style scoped>
.top-notification {
  padding-bottom: 2rem;
}

.table-padding {
  padding-bottom: 1rem;
}

.table {
    padding: 0.1rem !important;
}

.dashboard-box {
  height: 10.25rem;
}
</style>
