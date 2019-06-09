<template>
  <section>

    <div class="columns">
      <div class="column">
        <p class="title is-4">Overall Statistics</p>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Number Of Patients</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Number Of Visits</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">New Cases Heatmap</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Visits Heatmap</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <hr class="hr is-medium">

    <div class="columns">
      <div class="column">
        <p class="title is-4">Patient Dermographics</p>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Nationalities</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Age Groups (Age/Sex/Gender)</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Nationality (Nationality/Healthcare Scheme)</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Referral Status (Referral Status/Nationality/Referred From)</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Patient Status (Patient Status/Nationality/Referred Out To)</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">HIV Transmission Risk Behaviors (Risk Behaviors/Sex/Gender)</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">HIV Transmission Risk Behaviors (Risk Behaviors/Age/Gender)</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">HIV Transmission Risk Behaviors (Risk Behaviors/Age/Nationality)</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <hr class="hr is-medium">

    <div class="columns">
      <div class="column">
        <p class="title is-4">Visit Statistics</p>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Diagnosis</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">ARV Regimens</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
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

    <hr class="hr is-medium">

    <div class="columns">
      <div class="column">
        <p class="title is-4">Investigation Statistics</p>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Initial CD4</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Initial STD/OI</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <p class="title is-6">Viral Load (Undetectable/Supressed/Virologic Failure)</p>
        <b-table :data="tableData" :columns="tableColumns"></b-table>
      </div>
    </div>

    <hr class="hr is-medium">

  </section>
</template>

<script>
import http from '@/utils/http/http.js'
import commonErrorToast from '@/utils/ui/commonErrorToast.js'

export default {
  name: 'ClinicStatistics',
  components: {},
  mounted: function () {
  },
  methods: {
  },
  data: () => {
    return {
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
</style>
