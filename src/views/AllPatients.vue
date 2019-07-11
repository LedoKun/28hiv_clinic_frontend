<template>
<section>
    <p class="title is-4">All Patients</p>
    <p class="subtitle is-6">All patients are listed here.</p>

    <div class="columns">
        <div class="column">
            <b-field grouped group-multiline position="is-right">
                <b-select v-model="perPage">
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                    <option value="75">75 per page</option>
                    <option value="100">100 per page</option>
                </b-select>
            </b-field>

            <!-- table -->
            <b-table
                class="table"

                :hoverable="true"
                :mobile-cards="true"
                :striped="true"

                :default-sort-direction="defaultSortDirection"
                default-sort="clinicID"

                :data="items"
                :loading="isFetching"

                paginated
                :total="total"
                :per-page="perPage"
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

                    <b-table-column field="napID" label="NAP ID" sortable>
                      {{ props.row.napID }}
                    </b-table-column>

                    <b-table-column field="name" label="Name" sortable>
                      {{ props.row.name }}
                    </b-table-column>

                    <b-table-column field="dateOfBirth" label="Age" sortable>
                      {{ $moment(props.row.dateOfBirth).isValid() ? $moment(props.row.dateOfBirth).fromNow(true) : '-' }}
                    </b-table-column>

                    <b-table-column field="sex" label="Sex" sortable>
                      {{ props.row.sex }}
                    </b-table-column>

                    <b-table-column field="gender" label="Gender" sortable>
                      {{ props.row.gender }}
                    </b-table-column>

                    <b-table-column field="nationality" label="Nationality" sortable>
                      {{ props.row.nationality }}
                    </b-table-column>

                    <b-table-column field="payer" label="Healthcare Scheme" sortable>
                      {{ props.row.healthInsurance }}
                    </b-table-column>

                    <b-table-column field="phoneNumbers" label="Phone Numbers">
                      <span v-html="arrayToBr(props.row.phoneNumbers)"></span>
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
</section>
</template>

<script>
import fetchData from '@/utils/http/fetchData.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'

export default {
  name: 'AllPatneits',
  mounted () {
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
      self.isFetching = true

      let url = this.$config['APIPath'] + '/patient/'

      try {
        let response = await fetchData(url)

        self.items = response.data
        self.total = response.data.length
      } catch {
        self.items = []
        self.total = 0

        commonErrorToast()
      } finally {
        self.isFetching = false
      }
    },
    arrayToBr (arrayObj) {
      return arrayObj.join('<br />')
    }
  },
  created () {
    this.getData = this.$_.debounce(this.getData, this.$config['globalDebounceWait'])
  },
  data () {
    return {
      items: [],

      total: 0,
      isFetching: false,

      perPage: 25,

      defaultSortDirection: 'asc'
    }
  }
}
</script>

<style scoped>
.table {
    padding: 0.1rem !important;
}
</style>
