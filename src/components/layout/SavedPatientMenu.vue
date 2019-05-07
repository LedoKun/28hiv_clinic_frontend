<template>
<ul class="menu-list">
    <li>
        <router-link :to="{name: 'PatientSummary', params: {id: id}}" exact>
          {{ clinicID }}
        </router-link>
    </li>
</ul>
</template>

<script>
export default {
  name: 'savepatientmenu',
  methods: {
  },
  data: function () {
    return {
    }
  },
  props: {
    id: String,
    hn: String,
    clinicID: String
  }
}
</script>

<style scoped>
/* a:not(.is-active) + ul {
  display: none;
} */
</style>
