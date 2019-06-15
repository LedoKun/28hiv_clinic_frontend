<template>
<aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><router-link :to="{ name: 'Home' }" exact>Dashboard</router-link></li>
      <li><router-link :to="{ name: 'Appointments' }" exact>Appointments</router-link></li>
      <li><router-link :to="{ name: 'NewPatient' }" exact>New patient</router-link></li>
      <li><router-link :to="{ name: 'AllPatients' }" exact>All patients</router-link></li>
    </ul>

    <p class="menu-label">
      Administration
    </p>
    <ul class="menu-list">

      <li><router-link :to="{ name: 'ClinicStatistics' }" exact>Statistics</router-link></li>
      <li><router-link :to="{ name: 'ExportData' }" exact>Export data</router-link></li>
      <li><a>Users</a></li>
    </ul>

    <!-- TODO: previously edited patients -->
    <!-- <p class="menu-label">
      Patients
    </p>
    <div v-for="(item, key) in savedPatients" :key="key">
      <SavedPatientMenu
        :hn="item.hn"
        :clinicID="item.clinicID"
        :id="item.id"
      />
    </div> -->

</aside>
</template>

<script>
// import SavedPatientMenu from '@/components/layout/SavedPatientMenu'

export default {
  name: 'sidebar',
  components: {
    // SavedPatientMenu
  },
  data: function () {
    return {
      savedPatients: [
        {
          id: 'sssss',
          hn: '123/456-28',
          clinicID: '1/62'
        },
        {
          id: 'aaaa',
          hn: '456/789-28',
          clinicID: '2/62'
        },
        {
          id: 'aaaadd',
          hn: '9999/789-28',
          clinicID: '3/62'
        }
      ]
    }
  }
}
</script>

<style>
.menu {
  padding: 1.5rem;
}
.menu li a {
  color: white;
}
.columns.is-fullheight {
  min-height: calc(100vh - ( 3.25rem - .75rem ) );
  max-height: calc(100vh - ( 3.25rem - .75rem ) );
  height: calc(100vh - ( 3.25rem - .75rem ) );
  display: flex;
  flex-direction: row;
  justify-content: stretch;
}
</style>
