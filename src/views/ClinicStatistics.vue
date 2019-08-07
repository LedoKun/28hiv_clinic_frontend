<template>
  <section>
    <div class="columns">
      <div class="column">
        <p class="title is-4">Clinic Statistics</p>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <b-field label="Select a starting month">
            <b-datepicker
              type="month"
              placeholder="Click to select..."
              icon="calendar-today"
              inline

              v-model="startDate"
              :max-date="$moment(endDate).subtract(1, 'months').toDate()"
            >
            </b-datepicker>
        </b-field>
      </div>

      <div class="column">
        <b-field label="Select a ending month">
            <b-datepicker
              type="month"
              placeholder="Click to select..."
              icon="calendar-today"
              inline

              v-model="endDate"
              :max-date="$moment().toDate()"
            >
            </b-datepicker>
        </b-field>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.patientCount"
    >
      <div class="column">
        <p class="title is-6">Number Of Patients</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.patientCount">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.visitsCount"
    >
      <div class="column">
        <p class="title is-6">Number Of Visits</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.visitsCount">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.ixCount"
    >
      <div class="column">
        <p class="title is-6">Number Of Investigation</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.ixCount">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.newCasesHeatMap"
    >
      <div class="column">
        <p class="title is-6">New Cases Heatmap</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.newCasesHeatMap">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.visitHeatMap"
    >
      <div class="column">
        <p class="title is-6">Visits Heatmap</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.visitHeatMap">
          </table>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-4">Patient Dermographics</p>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.patientNationality"
    >
      <div class="column">
        <p class="title is-6">Nationalities (Nationalities/Healthcare Scheme)</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.patientNationality">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.patientAgeSexGender"
    >
      <div class="column">
        <p class="title is-6">Age Groups (Age/Sex/Gender)</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.patientAgeSexGender">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.patientAgeNatRefferIn"
    >
      <div class="column">
        <p class="title is-6">Referral Status (Age/Nationality/Referral In Status/Referred In From)</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.patientAgeNatRefferIn">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.patientAgeNatRefferOut"
    >
      <div class="column">
        <p class="title is-6">Patient Status (Age/Nationality/Patient Status/Referred Out To)</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.patientAgeNatRefferOut">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.patientAgeSexGenderRisk"
    >
      <div class="column">
        <p class="title is-6">HIV Transmission Risk Behaviors (Age/Sex/Gender/Risk Behaviors)</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.patientAgeSexGenderRisk">
          </table>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-4">Visit Statistics</p>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.patienOtherDx"
    >
      <div class="column">
        <p class="title is-6">Initial Diagnosis</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.patienOtherDx">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.patientCurrentARV"
    >
      <div class="column">
        <p class="title is-6">Current ARV Regimens</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.patientCurrentARV">
          </table>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Anti-TB Regimens</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Anti-OI Regimens</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-4">Investigation Statistics</p>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.initCD4SexGender"
    >
      <div class="column">
        <p class="title is-6">Initial CD4</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.initCD4SexGender">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.lastCD4SexGender"
    >
      <div class="column">
        <p class="title is-6">Last CD4</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.lastCD4SexGender">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.initCD4SexGenderThais"
    >
      <div class="column">
        <p class="title is-6">Initial CD4 (Thais)</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.initCD4SexGenderThais">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.lastCD4SexGenderThais"
    >
      <div class="column">
        <p class="title is-6">Last CD4 (Thais)</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.lastCD4SexGenderThais">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.initCD4SexGenderNonThais"
    >
      <div class="column">
        <p class="title is-6">Initial CD4 (Non-Thais)</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.initCD4SexGenderNonThais">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.lastCD4SexGenderNonThais"
    >
      <div class="column">
        <p class="title is-6">Last CD4 (Non-Thais)</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.lastCD4SexGenderNonThais">
          </table>
        </div>
      </div>
    </div>

    <div
      class="columns"
      v-if="tablesData.lastVL"
    >
      <div class="column">
        <p class="title is-6">Viral Load (Undetectable/Supressed/Virologic Failure)</p>
        <p class="subtitle is-7">{{ $moment(startDate).format('L') }} - {{ $moment(endDate).format('L') }}</p>
        <div class="table-wrapper">
          <table
            class="table is-striped is-narrow is-hoverable is-fullwidth"
            v-html="tablesData.lastVL">
          </table>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import fetchData from '@/utils/http/fetchData.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'

export default {
  name: 'ClinicStatistics',
  components: {},
  mounted: function () {
    this.getData()
  },
  created () {
    this.getData = this.$_.debounce(this.getData, this.$config['globalDebounceWait'])
  },
  watch: {
    startDate: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getData()
      }
    },
    endDate: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        let newValueMoment = this.$moment(newValue)

        if (!newValueMoment.isAfter(this.startDate)) {
          this.startDate = this.$moment(newValue).subtract(1, 'months').toDate()
        }

        this.getData()
      }
    }
  },
  methods: {
    async getData () {
      let self = this
      self.isFetching = true

      try {
        let url = self.$config['APIPath'] + '/statistics/overview'
        let params = {
          startDate: this.$moment(self.startDate).format('YYYY-MM-DD'),
          endDate: this.$moment(self.endDate).format('YYYY-MM-DD')
        }

        let response = await fetchData(url, 'get', params)
        let data = response.data

        self.tablesData = data
      } catch (error) {
        console.error(error)
        self.tablesData = null

        commonErrorToast()
      } finally {
        self.isFetching = false
      }
    }
  },
  data: () => {
    return {
      tablesData: null,

      startDate: new Date(2015, 1, 0),
      endDate: new Date(),

      isFetching: false,

      tableData: [
        { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
        { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
        { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
        { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
        { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
      ],
      tableColumns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'first_name',
          label: 'First Name'
        },
        {
          field: 'last_name',
          label: 'Last Name'
        },
        {
          field: 'date',
          label: 'Date',
          centered: true
        },
        {
          field: 'gender',
          label: 'Gender'
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

.hr {
  margin-top: 1.5rem !important;
  margin-bottom: 2.5rem !important;
}

.table {
  font-size: small !important;
}
</style>
